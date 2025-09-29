import React from "react";

const interests = [
  {
    title: "AI/ML Research",
    description: "Staying current with latest papers and experimenting with new models. Exploring transformer architectures and multimodal AI systems.",
    stat: "Following 20+ AI researchers",
    statColor: "text-green-400"
  },
  {
    title: "3D Graphics & Animation",
    description: "Exploring Blender workflows, procedural generation, and real-time rendering techniques. Building tools for creative workflows.",
    stat: "500+ hours in Blender",
    statColor: "text-red-400"
  },
  {
    title: "Product Development",
    description: "Learning product management methodologies, user research, and strategic thinking. Transitioning from engineering to product leadership.",
    stat: "Reading PM books & courses",
    statColor: "text-blue-400"
  },
  {
    title: "AI Agent Automation",
    description: "Learning to build and deploy AI agents for task automation. Exploring LLM integration, workflow orchestration, and intelligent process automation.",
    stat: "Building 2 agent projects",
    statColor: "text-orange-400",
  },
];

type HobbiesProps = { dragging?: boolean };
const Hobbies: React.FC<HobbiesProps> = ({ dragging }) => (
  <div className={`w-full md:w-1/3 flex flex-col gap-5${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-6 text-center text-foreground">Interests & Learning</h3>
    <div className="flex flex-col gap-4">
      {interests.map((interest, idx) => (
        <div
          key={interest.title}
          className="transition-transform duration-200 hover:scale-105 bg-card border border-border rounded-xl p-4"
        >
          <span className="font-bold text-foreground">{interest.title}</span>
          <div className="text-md text-foreground/80">{interest.description}</div>
          <div className={`${interest.statColor} text-sm`}>{interest.stat}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Hobbies;
