import { useState, useEffect, useRef } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { Spotify } from 'react-spotify-embed';
import FadeIn from '../utils/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { RefreshCw, AlertCircle } from 'lucide-react';

type TrackListType = 'recent' | 'top';

const SpotifyPlaying = () => {
  const { 
    currentTrack, 
    recentTracks, 
    topTracks, 
    isLoading, 
    error,
    refetch 
  } = useSpotify();
  
  const [activeList, setActiveList] = useState<TrackListType>('recent');
  const [displayTrack, setDisplayTrack] = useState<any>(null);
  const [tracksList, setTracksList] = useState<any[]>([]);
  const { currentTheme } = useTheme();
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always show current track if it exists
    if (currentTrack) {
      setDisplayTrack(currentTrack);
      if (activeList === 'top') {
        // Show top 4 tracks when viewing top tracks
        setTracksList(topTracks.slice(0, 4));
      } else {
        // Show recent tracks (excluding current track if it's in the list)
        setTracksList(recentTracks.slice(0, 4));
      }
    } else {
      // No current track playing
      if (activeList === 'top') {
        // Show #1 top track as main and rest in list
        setDisplayTrack(topTracks[0]);
        setTracksList(topTracks.slice(1));
      } else {
        // Show most recent track as main and rest in list
        setDisplayTrack(recentTracks[0]);
        setTracksList(recentTracks.slice(1, 5));
      }
    }
  }, [activeList, currentTrack, recentTracks, topTracks]);

  const handleTabClick = (type: TrackListType) => {
    setActiveList(type);
    
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
      <div className="h-[352px] bg-gray-800 rounded-lg"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[80px] bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

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
          <div className="relative flex bg-gray-800 rounded-full p-1 gap-1 shadow-inner min-w-[260px]">
            <button
              onClick={() => handleTabClick('recent')}
              className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden`}
              style={{ zIndex: activeList === 'recent' ? 2 : 1 }}
            >
              {activeList === 'recent' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-gray-900 shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'recent' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>Recently Played</span>
            </button>
            <button
              onClick={() => handleTabClick('top')}
              className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden`}
              style={{ zIndex: activeList === 'top' ? 2 : 1 }}
            >
              {activeList === 'top' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-gray-900 shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'top' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>Top Tracks</span>
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
              {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
            </h2>
            {renderError(error.current || (activeList === 'top' ? error.top : error.recent))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTrack?.spotifyUrl || displayTrack?.id || activeList}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {displayTrack && (
                <>
                  <Spotify 
                    wide
                    link={displayTrack.spotifyUrl}
                    className="w-full sm:hidden"
                  />
                  <Spotify 
                    link={displayTrack.spotifyUrl}
                    className="hidden sm:block w-full"
                  />
                  {/* Mobile Buttons - Only shown when track is playing */}
                  <div className="mt-4 sm:hidden">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTabClick('recent')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          activeList === 'recent'
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        style={{ 
                          backgroundColor: activeList === 'recent' ? currentTheme.nav.bubble : 'transparent',
                          transition: 'background-color 0.2s ease-in-out'
                        }}
                      >
                        Recently Played
                      </button>
                      <button
                        onClick={() => handleTabClick('top')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          activeList === 'top'
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        style={{ 
                          backgroundColor: activeList === 'top' ? currentTheme.nav.bubble : 'transparent',
                          transition: 'background-color 0.2s ease-in-out'
                        }}
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
                <div key={i} className="h-[80px] bg-gray-800 rounded-lg"></div>
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
                      link={track.spotifyUrl}
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