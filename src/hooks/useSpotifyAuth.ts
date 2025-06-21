import { useState, useEffect, useCallback } from 'react';

// Only the client ID is needed on the client side now
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

interface TokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);

  const getAccessToken = useCallback(async () => {
    try {
      // Use our secure API endpoint instead of making the request directly
      const response = await fetch('/api/spotify/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: TokenData = await response.json();
      const expiryTime = Date.now() + (data.expires_in * 1000);
      
      setToken(data.access_token);
      setTokenExpiry(expiryTime);
      
      return data;
    } catch (error) {
      console.error('Error refreshing Spotify token:', error);
      throw error;
    }
  }, []);

  // Initial token fetch
  useEffect(() => {
    if (!token) {
      getAccessToken().catch(console.error);
    }
  }, [token, getAccessToken]);

  // Token refresh before expiration
  useEffect(() => {
    if (!tokenExpiry) return;

    const timeUntilExpiry = tokenExpiry - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (timeUntilExpiry <= refreshThreshold) {
      getAccessToken().catch(console.error);
    } else {
      const refreshTimeout = setTimeout(() => {
        getAccessToken().catch(console.error);
      }, timeUntilExpiry - refreshThreshold);

      return () => clearTimeout(refreshTimeout);
    }
  }, [tokenExpiry, getAccessToken]);

  return { token };
}; 