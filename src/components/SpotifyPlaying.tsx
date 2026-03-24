import { useState, useEffect, useRef } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { Spotify } from 'react-spotify-embed';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

type TrackListType = 'recent' | 'top';

/** Shows a skeleton until the Spotify iframe loads, then fades in. */
const SpotifyEmbed = ({ link, wide, className }: { link: string; wide?: boolean; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(false);
    const el = ref.current;
    if (!el) return;

    const attach = () => {
      const iframe = el.querySelector('iframe');
      if (!iframe) return false;
      iframe.addEventListener('load', () => setLoaded(true), { once: true });
      return true;
    };

    if (!attach()) {
      const obs = new MutationObserver(() => {
        if (attach()) obs.disconnect();
      });
      obs.observe(el, { childList: true, subtree: true });
      return () => obs.disconnect();
    }
  }, [link]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`absolute inset-0 bg-muted rounded-xl animate-pulse transition-opacity duration-300 ${
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ minHeight: wide ? 80 : 352 }}
      />
      <div className={`transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Spotify wide={wide} link={link} className={className} />
      </div>
    </div>
  );
};

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
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainDisplayTrack = currentTrack || (recentTracks.length > 0 ? recentTracks[0] : null);
    setDisplayTrack(mainDisplayTrack);

    const getUniqueFilteredTracks = (tracks: any[], mainTrack: any) => {
      if (!tracks || tracks.length === 0) return [];
      const uniqueTracksMap = new Map();
      tracks.forEach(track => {
        if (track?.id && track.id !== mainTrack?.id) {
          if (!uniqueTracksMap.has(track.id)) {
            uniqueTracksMap.set(track.id, track);
          }
        }
      });
      return Array.from(uniqueTracksMap.values()).slice(0, 4);
    };

    if (activeList === 'top') {
      setTracksList(getUniqueFilteredTracks(topTracks, mainDisplayTrack));
    } else {
      setTracksList(getUniqueFilteredTracks(recentTracks, mainDisplayTrack));
    }
  }, [activeList, currentTrack, recentTracks, topTracks]);

  const handleTabClick = (type: TrackListType) => {
    setActiveList(type);
    if (tracksRef.current) {
      const rect = tracksRef.current.getBoundingClientRect();
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isFullyVisible) {
        tracksRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
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

  if (isLoading.current && isLoading.recent && isLoading.top) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-[352px] bg-muted rounded-lg" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[80px] bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with title and buttons */}
      <div className="mb-6 mt-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Currently Playing</h2>
          {/* Tab buttons — desktop */}
          <div className="relative flex bg-muted rounded-full p-1 gap-1 shadow-inner min-w-[260px]">
            <button
              onClick={() => handleTabClick('recent')}
              className="relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden"
              style={{ zIndex: activeList === 'recent' ? 2 : 1 }}
            >
              {activeList === 'recent' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-background shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'recent' ? 'text-foreground' : 'text-muted-foreground'}`}>Recently Played</span>
            </button>
            <button
              onClick={() => handleTabClick('top')}
              className="relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center overflow-hidden"
              style={{ zIndex: activeList === 'top' ? 2 : 1 }}
            >
              {activeList === 'top' && (
                <motion.div
                  layoutId="spotify-toggle-pill"
                  className="absolute inset-0 bg-background shadow rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeList === 'top' ? 'text-foreground' : 'text-muted-foreground'}`}>Top Tracks</span>
            </button>
          </div>
        </div>
        {renderError(activeList === 'top' ? error.top : error.recent)}
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        {/* Main Track Display */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="mb-4 sm:hidden">
            <h2 className="text-lg font-semibold">
              {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
            </h2>
            {renderError(error.current || (activeList === 'top' ? error.top : error.recent))}
          </div>
          {displayTrack && (
            <>
              <SpotifyEmbed wide link={displayTrack.spotifyUrl} className="w-full sm:hidden" />
              <SpotifyEmbed link={displayTrack.spotifyUrl} className="hidden sm:block w-full" />
              {/* Mobile tab buttons */}
              <div className="mt-4 sm:hidden">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTabClick('recent')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                      activeList === 'recent'
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Recently Played
                  </button>
                  <button
                    onClick={() => handleTabClick('top')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
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
        </div>

        {/* Tracks List */}
        <div ref={tracksRef} className="w-full md:w-1/2">
          {(isLoading.recent || isLoading.top) ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[80px] bg-muted rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid gap-3">
              {tracksList.map((track, index) => (
                <SpotifyEmbed key={track.id || index} wide link={track.spotifyUrl} className="w-full" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaying;
