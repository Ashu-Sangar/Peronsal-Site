import React from "react";
import { StaggerReveal, StaggerItem } from "@/components/StaggerReveal";

type TimelineItem = {
  company: string;
  role: string;
  details: string;
  date: string;
  color: string;
  tint?: string;
  glow?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  dragging?: boolean;
  title?: string;
};

const Timeline: React.FC<TimelineProps> = ({ items, dragging, title = "Timeline" }) => (
  <div className={`w-full${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-4 text-foreground">{title}</h3>
    <StaggerReveal>
      <ol className="relative border-l border-border ml-2">
        {items.map((item, index) => (
          <StaggerItem key={index}>
            <li className="relative pl-6 pb-6 last:pb-0">
              <span className={`absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full ${item.color} ring-2 ring-background`} />
              <div className={`group relative rounded-xl border border-border p-4 pl-5 overflow-hidden transition-all duration-200 hover:border-foreground/20 ${item.tint || 'bg-card'} ${item.glow || ''} hover:shadow-md`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.color} transition-all duration-200 group-hover:w-1.5`} />
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-foreground text-sm">{item.company}</h4>
                  <span className="text-xs text-muted-foreground ml-2 shrink-0">{item.date}</span>
                </div>
                <p className="text-sm text-foreground/70">{item.role}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.details}</p>
              </div>
            </li>
          </StaggerItem>
        ))}
      </ol>
    </StaggerReveal>
  </div>
);

export default Timeline;
