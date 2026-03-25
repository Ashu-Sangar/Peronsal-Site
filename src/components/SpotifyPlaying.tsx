import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { Spotify } from 'react-spotify-embed';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

type TrackListType = 'recent' | 'top';

// Embed wrapper that shows a skeleton until the iframe loads, then fades in
const LoadableEmbed = memo(
  ({ link, wide, className }: { link: string; wide?: boolean; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    const prevLinkRef = useRef(link);

    // Reset loaded state when the link changes (new track)
    useEffect(() => {
      if (prevLinkRef.current !== link) {
        setLoaded(false);
        prevLinkRef.current = link;
      }
    }, [link]);

    const height = wide ? 80 : 352;

    return (
      <div className="relative rounded-xl overflow-hidden" style={{ height }}>
        {/* Skeleton placeholder — fades out when iframe loads */}
        <div
          className={`absolute inset-0 bg-muted rounded-xl${loaded ? '' : ' animate-pulse'}`}
          style={{
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.4s ease-out',
            pointerEvents: 'none',
          }}
        />
        {/* Actual Spotify iframe — fades in when loaded */}
        <Spotify
          wide={wide}
          link={link}
          className={className}
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        />
      </div>
    );
  },
  (prev, next) => prev.link === next.link && prev.wide === next.wide
);

const SpotifyPlaying = () => {
  const {
    currentTrack,
    recentTracks,
    topTracks,
    isLoading,
    error,
  } = useSpotify();

  const [activeList, setActiveList] = useState<TrackListType>('recent');
  const [displayTrack, setDisplayTrack] = useState<any>(null);
  const [tracksList, setTracksList] = useState<any[]>([]);
  const tracksRef = useRef<HTMLDivElement>(null);

  const getUniqueFilteredTracks = useCallback((tracks: any[], mainTrack: any) => {
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
  }, []);

  useEffect(() => {
    const mainDisplayTrack = currentTrack || (recentTracks.length > 0 ? recentTracks[0] : null);

    // Only update displayTrack if the track ID actually changed
    setDisplayTrack((prev: any) => {
      if (prev?.id === mainDisplayTrack?.id) return prev;
      return mainDisplayTrack;
    });

    const newTracks = activeList === 'top'
      ? getUniqueFilteredTracks(topTracks, mainDisplayTrack)
      : getUniqueFilteredTracks(recentTracks, mainDisplayTrack);

    // Only update tracksList if the IDs actually changed
    setTracksList((prev) => {
      const prevIds = prev.map((t: any) => t.id).join(',');
      const newIds = newTracks.map((t: any) => t.id).join(',');
      if (prevIds === newIds) return prev;
      return newTracks;
    });
  }, [activeList, currentTrack, recentTracks, topTracks, getUniqueFilteredTracks]);

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
        <AlertCircle size={14} />
        <span>{errorMessage}</span>
      </div>
    );
  };

  // Full skeleton while all data loads
  if (isLoading.current && isLoading.recent && isLoading.top) {
    return (
      <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-sm p-5 mt-8">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-6 bg-muted rounded-full" />
            <div className="h-5 w-36 bg-muted rounded-md" />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="h-[352px] bg-muted rounded-xl" />
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[80px] bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full mt-8">
      {/* Card container — matches MainHighlight's glassmorphism */}
      <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-sm p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            {/* Spotify icon */}
            <svg className="w-5 h-5 text-[#1DB954] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <h2 className="text-lg font-bold text-foreground">
              {currentTrack ? 'Now Playing' : 'Recently Played'}
            </h2>
            {/* Live indicator when actively playing */}
            {currentTrack && (
              <span className="flex items-center gap-1.5 text-xs text-[#1DB954] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
                </span>
                Live
              </span>
            )}
          </div>

          {/* Tab toggle — desktop */}
          <div className="relative hidden sm:flex bg-muted/80 rounded-full p-1 gap-0.5 shadow-inner">
            {(['recent', 'top'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
                style={{ zIndex: activeList === tab ? 2 : 1 }}
              >
                {activeList === tab && (
                  <motion.div
                    layoutId="spotify-toggle-pill"
                    className="absolute inset-0 bg-background shadow-sm rounded-full z-0 border border-black/[0.04] dark:border-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeList === tab ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {tab === 'recent' ? 'Recent' : 'Top Tracks'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {renderError(activeList === 'top' ? error.top : error.recent)}

        {/* Content grid */}
        <div className="flex flex-col md:flex-row md:gap-4">
          {/* Main track */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            {/* Mobile-only heading */}
            <div className="mb-3 sm:hidden">
              <p className="text-sm text-muted-foreground font-medium">
                {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Last Played')}
              </p>
              {renderError(error.current || (activeList === 'top' ? error.top : error.recent))}
            </div>

            {displayTrack && (
              <>
                <div className="sm:hidden">
                  <LoadableEmbed wide link={displayTrack.spotifyUrl} className="w-full" />
                </div>
                <div className="hidden sm:block">
                  <LoadableEmbed link={displayTrack.spotifyUrl} className="w-full" />
                </div>

                {/* Mobile tab buttons */}
                <div className="mt-3 sm:hidden">
                  <div className="flex gap-2">
                    {(['recent', 'top'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 cursor-pointer ${
                          activeList === tab
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab === 'recent' ? 'Recent' : 'Top Tracks'}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Tracks list */}
          <div ref={tracksRef} className="w-full md:w-1/2">
            {(isLoading.recent || isLoading.top) ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[80px] bg-muted rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid gap-3">
                {tracksList.map((track, index) => (
                  <LoadableEmbed
                    key={track.id || index}
                    wide
                    link={track.spotifyUrl}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyPlaying;
