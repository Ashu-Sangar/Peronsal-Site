export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

    console.log('Environment check:', {
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
      hasRefreshToken: !!REFRESH_TOKEN
    });

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error('Missing environment variables:', {
        CLIENT_ID: !!CLIENT_ID,
        CLIENT_SECRET: !!CLIENT_SECRET,
        REFRESH_TOKEN: !!REFRESH_TOKEN
      });
      return res.status(500).json({ error: 'Missing Spotify credentials' });
    }

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", REFRESH_TOKEN);

    console.log('Making request to Spotify API...');
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    console.log('Spotify API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API error:', errorText);
      throw new Error(`Failed to refresh token: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Token refresh successful');
    
    res.status(200).json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type
    });

  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    res.status(500).json({ error: 'Failed to refresh token', details: error.message });
  }
} 