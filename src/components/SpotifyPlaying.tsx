import { useState, useEffect, useRef } from 'react';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Spotify } from 'react-spotify-embed';
import TrackItem from './TrackItem';
import FadeInSection from './FadeInSection';

type TrackListType = 'recent' | 'top';

const SpotifyPlaying = () => {
  const { theme } = useTheme();
  const { token } = useSpotifyAuth();
  const [activeList, setActiveList] = useState<TrackListType>('recent');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({ current: true, recent: true, top: true });
  const [error, setError] = useState<{ current: string | null, recent: string | null, top: string | null }>({ 
    current: null, 
    recent: null, 
    top: null 
  });
  const tracksRef = useRef<HTMLDivElement>(null);

  const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );

  const fetchCurrentTrack = async () => {
    if (!token) return;
    
    try {
      setIsLoading(prev => ({ ...prev, current: true }));
      setError(prev => ({ ...prev, current: null }));
      
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 204) {
        setCurrentTrack(null);
        return;
      }
      
      if (!response.ok) throw new Error('Failed to fetch current track');
      
      const data = await response.json();
      setCurrentTrack(data);
    } catch (err) {
      console.error('Error fetching current track:', err);
      setError(prev => ({ ...prev, current: 'Failed to fetch current track' }));
    } finally {
      setIsLoading(prev => ({ ...prev, current: false }));
    }
  };

  const handleTabClick = (type: TrackListType) => {
    setActiveList(type);
    
    // Scroll to tracks section on mobile after tab change
    setTimeout(() => {
      scrollToTracks();
    }, 100);
  };

  const scrollToTracks = () => {
    // Check if tracks section is not fully visible
    if (tracksRef.current) {
      const rect = tracksRef.current.getBoundingClientRect();
      const isFullyVisible = (
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
      );
      
      // Only scroll if not fully visible
      if (!isFullyVisible) {
        tracksRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  const handleRefresh = () => {
    if (activeList === 'top') {
      refetch.top();
    } else {
      refetch.recent();
    }
    refetch.current();
  };

  const renderError = (errorMessage: string | null) => {
    if (!errorMessage) return null;
    
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
        <AlertCircle size={16} />
        <span>{errorMessage}</span>
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-[352px] bg-muted rounded-lg"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[80px] bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  const fetchRecentTracks = async () => {
    if (!token) return;
    
    try {
      setIsLoading(prev => ({ ...prev, recent: true }));
      setError(prev => ({ ...prev, recent: null }));
      
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch recent tracks');
      
      const data = await response.json();
      setRecentTracks(data.items || []);
    } catch (err) {
      console.error('Error fetching recent tracks:', err);
      setError(prev => ({ ...prev, recent: 'Failed to fetch recent tracks' }));
    } finally {
      setIsLoading(prev => ({ ...prev, recent: false }));
    }
  };

  const fetchTopTracks = async () => {
    if (!token) return;
    
    try {
      setIsLoading(prev => ({ ...prev, top: true }));
      setError(prev => ({ ...prev, top: null }));
      
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=4&time_range=short_term', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch top tracks');
      
      const data = await response.json();
      setTopTracks(data.items || []);
    } catch (err) {
      console.error('Error fetching top tracks:', err);
      setError(prev => ({ ...prev, top: 'Failed to fetch top tracks' }));
    } finally {
      setIsLoading(prev => ({ ...prev, top: false }));
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentTrack();
      fetchRecentTracks();
      fetchTopTracks();
    }
  }, [token]);

  const refetch = {
    current: fetchCurrentTrack,
    recent: fetchRecentTracks,
    top: fetchTopTracks
  };

  // Always show currently playing track if available, otherwise show first recent track as fallback
  const displayTrack = currentTrack?.item || (recentTracks.length > 0 ? recentTracks[0]?.track : null);
  
  // Filter out the currently displayed track from the lists to avoid duplicates
  const filteredRecentTracks = recentTracks.filter(track => {
    const trackToCompare = track.track || track;
    return trackToCompare?.id !== displayTrack?.id;
  });
  
  const filteredTopTracks = topTracks.filter(track => {
    return track?.id !== displayTrack?.id;
  });
  
  const tracksList = activeList === 'top' ? filteredTopTracks : filteredRecentTracks;

  if (isLoading.current && isLoading.recent && isLoading.top) {
    return renderLoadingState();
  }

  return (
    <div className="w-full">
      {/* Header with title and buttons */}
      <div className="mb-6 mt-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">
            {'Currently Playing'}
          </h2>
          {/* Tab buttons */}
          <div className="relative flex bg-muted rounded-full p-1 gap-1 shadow-inner min-w-[260px]">
            <button
              onClick={() => handleTabClick('recent')}
              className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden`}
              style={{ zIndex: activeList === 'recent' ? 2 : 1 }}
            >
              {activeList === 'recent' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-background shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'recent' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Recently Played</span>
            </button>
            <button
              onClick={() => handleTabClick('top')}
              className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden`}
              style={{ zIndex: activeList === 'top' ? 2 : 1 }}
            >
              {activeList === 'top' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-background shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'top' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Top Tracks</span>
            </button>
          </div>
        </div>
        {renderError(activeList === 'top' ? error.top : error.recent)}
      </div>
      
      <div className="flex flex-col md:flex-row md:gap-4">
        {/* Main Track Display */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          {/* Mobile Title */}
          <div className="mb-4 sm:hidden">
            <h2 className="text-lg font-semibold">
              {currentTrack?.item ? 'Now Playing' : 'Recently Played'}
            </h2>
            {renderError(error.current || (activeList === 'top' ? error.top : error.recent))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTrack?.external_urls?.spotify || displayTrack?.id || activeList}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {displayTrack && (
                <>
                  <Spotify 
                    wide
                    link={displayTrack.external_urls?.spotify || displayTrack.spotifyUrl}
                    className="w-full sm:hidden"
                  />
                  <Spotify 
                    link={displayTrack.external_urls?.spotify || displayTrack.spotifyUrl}
                    className="hidden sm:block w-full"
                  />
                  {/* Mobile Buttons - Only shown when track is playing */}
                  <div className="mt-4 sm:hidden">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTabClick('recent')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          activeList === 'recent'
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Recently Played
                      </button>
                      <button
                        onClick={() => handleTabClick('top')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          activeList === 'top'
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Top Tracks
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Recent/Top Tracks List */}
        <div ref={tracksRef} className="w-full md:w-1/2">
          {(isLoading.recent || isLoading.top) ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[80px] bg-muted rounded-lg"></div>
              ))}
            </div>
          ) : (
            <motion.div
              key={activeList + tracksList.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="grid gap-3">
                {tracksList.map((track, index) => (
                  <FadeIn key={index} delay={1 + index * 0.3}>
                    <Spotify 
                      wide 
                      link={(activeList === 'recent' ? track.track?.external_urls?.spotify : track.external_urls?.spotify) || track.spotifyUrl}
                      className="w-full"
                    />
                  </FadeIn>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaying; 