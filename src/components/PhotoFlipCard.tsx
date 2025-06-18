import React, { useState } from "react";
import { motion } from "framer-motion";

type PhotoFlipCardProps = {
  frontSrc: string;
  alt: string;
  backText: string;
  setIsDragging?: (dragging: boolean) => void;
};

const PhotoFlipCard: React.FC<PhotoFlipCardProps> = ({ frontSrc, alt, backText, setIsDragging }) => {
  const [flipped, setFlipped] = useState(false);
  const [isDragging, setDraggingState] = useState(false);

  return (
    <motion.div
      className={`relative w-40 h-56 cursor-pointer group perspective${isDragging ? " z-50" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: "1000px", cursor: "grab" }}
      tabIndex={0}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      drag
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 80, bounceDamping: 8 }}
      whileDrag={{ cursor: "grabbing", scale: 0.98 }}
      dragSnapToOrigin
      onDragStart={() => {
        setDraggingState(true);
        if (typeof setIsDragging === 'function') setIsDragging(true);
      }}
      onDragEnd={() => {
        setDraggingState(false);
        if (typeof setIsDragging === 'function') setIsDragging(false);
      }}
    >
      <div
        className={`transition-transform duration-500 ease-in-out transform-style-preserve-3d w-full h-full rounded-lg shadow-lg ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden overflow-hidden rounded-lg shadow-lg">
          <img
            src={frontSrc}
            alt={alt}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
        {/* Back */}
        <div className="absolute w-full h-full bg-gray-900 text-white flex items-center justify-center rounded-lg shadow-lg p-4 text-center rotate-y-180 backface-hidden">
          <span className="text-md">{backText}</span>
        </div>
      </div>
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </motion.div>
  );
};

export default PhotoFlipCard;
