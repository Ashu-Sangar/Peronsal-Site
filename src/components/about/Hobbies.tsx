import React from "react";
import { StaggerReveal, StaggerItem } from "@/components/StaggerReveal";

const interests = [
  {
    title: "AI/ML Research",
    description: "Staying current with latest papers and experimenting with new models.",
    stat: "Following 20+ AI researchers",
    statColor: "text-green-400",
    accentColor: "bg-green-400",
    tint: "bg-green-400/[0.04] dark:bg-green-400/[0.06]",
    glow: "hover:shadow-green-400/10",
  },
  {
    title: "3D Graphics",
    description: "Exploring Blender workflows, procedural generation, and real-time rendering.",
    stat: "500+ hours in Blender",
    statColor: "text-red-400",
    accentColor: "bg-red-400",
    tint: "bg-red-400/[0.04] dark:bg-red-400/[0.06]",
    glow: "hover:shadow-red-400/10",
  },
  {
    title: "Product Dev",
    description: "Learning product management, user research, and strategic thinking.",
    stat: "Reading PM books & courses",
    statColor: "text-blue-400",
    accentColor: "bg-blue-400",
    tint: "bg-blue-400/[0.04] dark:bg-blue-400/[0.06]",
    glow: "hover:shadow-blue-400/10",
  },
  {
    title: "AI Agents",
    description: "Building AI agents for task automation with LLM integration.",
    stat: "Building 2 agent projects",
    statColor: "text-orange-400",
    accentColor: "bg-orange-400",
    tint: "bg-orange-400/[0.04] dark:bg-orange-400/[0.06]",
    glow: "hover:shadow-orange-400/10",
  },
];

type HobbiesProps = { dragging?: boolean };
const Hobbies: React.FC<HobbiesProps> = ({ dragging }) => (
  <div className={`w-full${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-4 text-foreground">Interests & Learning</h3>
    <StaggerReveal className="flex flex-col gap-3">
      {interests.map((interest) => (
        <StaggerItem key={interest.title}>
          <div className={`group relative rounded-xl border border-border p-3 pt-4 overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:shadow-md h-full ${interest.tint} ${interest.glow}`}>
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${interest.accentColor} transition-all duration-200 group-hover:h-1`} />
            <span className="font-semibold text-sm text-foreground">{interest.title}</span>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{interest.description}</p>
            <p className={`${interest.statColor} text-xs mt-2 font-medium`}>{interest.stat}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerReveal>
  </div>
);

export default Hobbies;
