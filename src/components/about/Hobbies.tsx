import React from "react";

const hobbies = [
  {
    title: "Music",
    description: "Exploring new genres, making playlists, and occasionally producing beats. Always searching for the next song on repeat.",
    stat: "3000+ liked songs",
    statColor: "text-green-400"
  },
  {
    title: "Gym & Fitness",
    description: "Enjoy lifting weights, tracking progress, and pushing my limits. The gym is my daily reset button.",
    stat: "1 rep away from greatness",
    statColor: "text-red-400"
  },
  {
    title: "Real Estate",
    description: "Learning about property investing through books, podcasts, and YouTube. Saving up for my first deal!",
    stat: "0 properties (for now!)",
    statColor: "text-blue-400"
  },
  {
    title: "Urban Design & Spaces",
    description: "I love exploring neighborhoods, learning how cities grow, and dreaming about the perfect live-work space.",
    stat: "San Diego's on my vision board",
    statColor: "text-orange-400",
  },
];

type HobbiesProps = { dragging?: boolean };
const Hobbies: React.FC<HobbiesProps> = ({ dragging }) => (
  <div className={`w-full md:w-1/3 flex flex-col gap-5${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-6 text-center text-foreground">Hobbies</h3>
    <div className="flex flex-col gap-4">
      {hobbies.map((hobby, idx) => (
        <div
          key={hobby.title}
          className="transition-transform duration-200 hover:scale-105 bg-card border border-border rounded-xl p-4"
        >
          <span className="font-bold text-foreground">{hobby.title}</span>
          <div className="text-md text-foreground/80">{hobby.description}</div>
          <div className={`${hobby.statColor} text-sm`}>{hobby.stat}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Hobbies;
