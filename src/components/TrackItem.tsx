
import { Play, Plus, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

interface TrackItemProps {
  albumArtUrl: string;
  title: string;
  artist: string;
  color: string;
  preview?: boolean;
}

const TrackItem = ({ albumArtUrl, title, artist, color, preview = false }: TrackItemProps) => {
  return (
    <div
      className="rounded-xl flex items-center p-2 pr-3 shadow-md gap-3"
      style={{ backgroundColor: color }}
    >
      <img src={albumArtUrl} alt={title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-white text-base">{title}</p>
        <div className="flex items-center gap-2">
            {preview && <span className="text-xs font-semibold bg-black/20 text-white/80 px-2 py-0.5 rounded">Preview</span>}
            <p className="text-sm text-gray-200 truncate">{artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-white/90 ml-auto">
        <button className="hover:text-white hidden sm:block"><Plus size={22} /></button>
        <button className="hover:text-white hidden sm:block"><MoreHorizontal size={22} /></button>
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
          <Play size={18} fill="black" className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default TrackItem;
