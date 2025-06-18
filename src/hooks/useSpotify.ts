import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSpotifyAuth } from './useSpotifyAuth';

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  spotifyUrl: string;
}

interface SpotifyState {
  currentTrack: Track | null;
  recentTracks: Track[];
  topTracks: Track[];
  isLoading: {
    current: boolean;
    recent: boolean;
    top: boolean;
  };
  error: {
    current: string | null;
    recent: string | null;
    top: string | null;
  };
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Polling interval for current track (10 seconds)
const POLLING_INTERVAL = 10 * 1000;

declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export function useSpotify() {
  const [state, setState] = useState<SpotifyState>({
    currentTrack: null,
    recentTracks: [],
    topTracks: [],
    isLoading: {
      current: false,
      recent: false,
      top: false,
    },
    error: {
      current: null,
      recent: null,
      top: null,
    },
  });

  const { token } = useSpotifyAuth();

  // Cache management
  const [cache, setCache] = useState<{
    recent: { data: Track[]; timestamp: number } | null;
    top: { data: Track[]; timestamp: number } | null;
  }>({
    recent: null,
    top: null,
  });

  const fetchCurrentTrack = useCallback(async () => {
    if (!token) return;

    setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, current: true }, error: { ...prev.error, current: null } }));

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        setState(prev => ({ ...prev, currentTrack: null, isLoading: { ...prev.isLoading, current: false } }));
        return;
      }

      const track = response.data.item;
      if (track) {
        setState(prev => ({
          ...prev,
          currentTrack: {
            id: track.id,
            name: track.name,
            artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
            album: track.album.name,
            albumImageUrl: track.album.images[0].url,
            spotifyUrl: track.external_urls.spotify,
          },
          isLoading: { ...prev.isLoading, current: false }
        }));
      }
    } catch (error: any) {
      const errorMessage = error.response?.status === 429
        ? 'Rate limited by Spotify API. Please wait before retrying.'
        : 'Error fetching current track';
      
      setState(prev => ({
        ...prev,
        currentTrack: null,
        isLoading: { ...prev.isLoading, current: false },
        error: { ...prev.error, current: errorMessage }
      }));
    }
  }, [token]);

  const fetchRecentTracks = useCallback(async (force = false) => {
    if (!token) return;

    // Check cache first
    if (!force && cache.recent && Date.now() - cache.recent.timestamp < CACHE_DURATION) {
      setState(prev => ({ ...prev, recentTracks: cache.recent!.data }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, recent: true }, error: { ...prev.error, recent: null } }));

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && response.data.items) {
        const tracks = response.data.items.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists.map((artist: { name: string }) => artist.name).join(', '),
          album: item.track.album.name,
          albumImageUrl: item.track.album.images[0].url,
          spotifyUrl: item.track.external_urls.spotify,
        }));

        setCache(prev => ({ ...prev, recent: { data: tracks, timestamp: Date.now() } }));
        setState(prev => ({
          ...prev,
          recentTracks: tracks,
          isLoading: { ...prev.isLoading, recent: false }
        }));
      }
    } catch (error: any) {
      const errorMessage = error.response?.status === 429
        ? 'Rate limited by Spotify API. Please wait before retrying.'
        : 'Error fetching recent tracks';
      
      setState(prev => ({
        ...prev,
        isLoading: { ...prev.isLoading, recent: false },
        error: { ...prev.error, recent: errorMessage }
      }));
    }
  }, [token, cache]);

  const fetchTopTracks = useCallback(async (force = false) => {
    if (!token) return;

    // Check cache first
    if (!force && cache.top && Date.now() - cache.top.timestamp < CACHE_DURATION) {
      setState(prev => ({ ...prev, topTracks: cache.top!.data }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, top: true }, error: { ...prev.error, top: null } }));

    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.items) {
        const tracks = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artist: item.artists.map((artist: { name: string }) => artist.name).join(', '),
          album: item.album.name,
          albumImageUrl: item.album.images[0].url,
          spotifyUrl: item.external_urls.spotify,
        }));

        setCache(prev => ({ ...prev, top: { data: tracks, timestamp: Date.now() } }));
        setState(prev => ({
          ...prev,
          topTracks: tracks,
          isLoading: { ...prev.isLoading, top: false }
        }));
      }
    } catch (error: any) {
      const errorMessage = error.response?.status === 429
        ? 'Rate limited by Spotify API. Please wait before retrying.'
        : 'Error fetching top tracks';
      
      setState(prev => ({
        ...prev,
        isLoading: { ...prev.isLoading, top: false },
        error: { ...prev.error, top: errorMessage }
      }));
    }
  }, [token, cache]);

  // Initial fetch
  useEffect(() => {
    if (token) {
      fetchCurrentTrack();
      fetchRecentTracks();
      fetchTopTracks();
    }
  }, [token, fetchCurrentTrack, fetchRecentTracks, fetchTopTracks]);

  // Polling for current track
  useEffect(() => {
    if (!token) return;

    const pollInterval = setInterval(fetchCurrentTrack, POLLING_INTERVAL);
    return () => clearInterval(pollInterval);
  }, [token, fetchCurrentTrack]);

  // Cache invalidation
  useEffect(() => {
    const cacheCheckInterval = setInterval(() => {
      const now = Date.now();
      if (cache.recent && now - cache.recent.timestamp >= CACHE_DURATION) {
        fetchRecentTracks(true);
      }
      if (cache.top && now - cache.top.timestamp >= CACHE_DURATION) {
        fetchTopTracks(true);
      }
    }, CACHE_DURATION);

    return () => clearInterval(cacheCheckInterval);
  }, [cache, fetchRecentTracks, fetchTopTracks]);

  return {
    ...state,
    refetch: {
      current: fetchCurrentTrack,
      recent: () => fetchRecentTracks(true),
      top: () => fetchTopTracks(true),
    }
  };
} 