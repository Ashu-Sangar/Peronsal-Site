import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Github } from "lucide-react";

type Tag = {
  name: string;
  color: string;
};

type Project = {
  name: string;
  description: string;
  tags: Tag[];
  github?: string;
};

type ProjectsProps = {
  projects: Project[];
  dragging?: boolean;
};

const Projects: React.FC<ProjectsProps> = ({ projects, dragging }) => (
  <div className={`w-full md:w-1/3 flex flex-col gap-5${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-6 text-center">Projects</h3>
    <ul className="space-y-4">
      {projects.map((project, index) => (
        <li
          key={index}
          className="transition-transform duration-200 hover:scale-105 bg-white/10 rounded-xl p-4 text-left relative"
        >
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer">
                <h4 className="font-bold">{project.name}</h4>
                <p className="text-sm text-white/80 my-1">{project.description}</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`${tag.color} px-2 py-0.5 rounded-full text-xs font-semibold`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </HoverCardTrigger>
            {project.github && (
              <HoverCardContent
                side="top"
                align="center"
                className="flex flex-col items-center text-center bg-black/60 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-4 min-w-[180px] cursor-pointer"
                onClick={() => window.open(project.github, '_blank')}
                onMouseEnter={e => e.stopPropagation()}
              >
                <span 
                  className="mb-2 font-semibold text-white"
                  style={{ textShadow: '0 0 4px rgba(255, 255, 255, 0.5), 0 0 8px rgba(98, 248, 56, 0.4)' }}
                >
                  View on GitHub
                </span>
                <div className="flex items-center gap-2 px-3 py-2 rounded bg-black/80 text-white hover:bg-black transition font-medium">
                  <Github size={20} />
                  <span>Repository</span>
                </div>
              </HoverCardContent>
            )}
          </HoverCard>
        </li>
      ))}
    </ul>
  </div>
);

export default Projects;
