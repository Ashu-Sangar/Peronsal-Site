import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'spotify-token-dev',
        configureServer(server) {
          // Serve /api/spotify/token locally so `npm run dev` works without Vercel
          server.middlewares.use('/api/spotify/token', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            try {
              const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
              const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
              const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

              if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Missing Spotify credentials in .env' }));
                return;
              }

              const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
              const params = new URLSearchParams();
              params.append('grant_type', 'refresh_token');
              params.append('refresh_token', REFRESH_TOKEN);

              const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                  'Authorization': `Basic ${basic}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
              });

              if (!response.ok) {
                const errorText = await response.text();
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to refresh token', details: errorText }));
                return;
              }

              const data = await response.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                access_token: data.access_token,
                expires_in: data.expires_in,
                token_type: data.token_type,
              }));
            } catch (error: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to refresh token', details: error.message }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
}); 