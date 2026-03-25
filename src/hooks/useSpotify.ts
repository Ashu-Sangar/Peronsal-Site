import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Use ref for cache so callbacks stay stable (no dependency cycle)
  const cacheRef = useRef<{
    recent: { data: Track[]; timestamp: number } | null;
    top: { data: Track[]; timestamp: number } | null;
  }>({ recent: null, top: null });

  // Guard to prevent duplicate initial fetches
  const hasFetchedRef = useRef(false);

  const fetchCurrentTrack = useCallback(async (showLoading = true) => {
    if (!token) return;

    if (showLoading) {
      setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, current: true }, error: { ...prev.error, current: null } }));
    }

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

  const fetchRecentTracks = useCallback(async (force = false, showLoading = true) => {
    if (!token) return;

    // Check cache first (read from ref, no dependency)
    const cached = cacheRef.current.recent;
    if (!force && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setState(prev => ({ ...prev, recentTracks: cached.data }));
      return;
    }

    if (showLoading) {
      setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, recent: true }, error: { ...prev.error, recent: null } }));
    }

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

        cacheRef.current = { ...cacheRef.current, recent: { data: tracks, timestamp: Date.now() } };
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
  }, [token]);

  const fetchTopTracks = useCallback(async (force = false, showLoading = true) => {
    if (!token) return;

    // Check cache first (read from ref, no dependency)
    const cached = cacheRef.current.top;
    if (!force && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setState(prev => ({ ...prev, topTracks: cached.data }));
      return;
    }

    if (showLoading) {
      setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, top: true }, error: { ...prev.error, top: null } }));
    }

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

        cacheRef.current = { ...cacheRef.current, top: { data: tracks, timestamp: Date.now() } };
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
  }, [token]);

  // Initial fetch — runs once per token
  useEffect(() => {
    if (token && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCurrentTrack();
      fetchRecentTracks();
      fetchTopTracks();
    }
  }, [token, fetchCurrentTrack, fetchRecentTracks, fetchTopTracks]);

  // Reset fetch guard when token changes (e.g. refresh)
  useEffect(() => {
    hasFetchedRef.current = false;
  }, [token]);

  // Polling for current track — no loading indicator on polls
  useEffect(() => {
    if (!token) return;

    const pollInterval = setInterval(() => fetchCurrentTrack(false), POLLING_INTERVAL);
    return () => clearInterval(pollInterval);
  }, [token, fetchCurrentTrack]);

  // Cache invalidation — stable interval, no loading indicator on background refetches
  useEffect(() => {
    if (!token) return;

    const cacheCheckInterval = setInterval(() => {
      const now = Date.now();
      const cache = cacheRef.current;
      if (cache.recent && now - cache.recent.timestamp >= CACHE_DURATION) {
        fetchRecentTracks(true, false);
      }
      if (cache.top && now - cache.top.timestamp >= CACHE_DURATION) {
        fetchTopTracks(true, false);
      }
    }, CACHE_DURATION);

    return () => clearInterval(cacheCheckInterval);
  }, [token, fetchRecentTracks, fetchTopTracks]);

  return {
    ...state,
    refetch: {
      current: fetchCurrentTrack,
      recent: () => fetchRecentTracks(true),
      top: () => fetchTopTracks(true),
    }
  };
}