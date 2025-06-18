import React from "react";

type TimelineItem = {
  company: string;
  role: string;
  details: string;
  date: string;
  color: string;
};

type TimelineProps = {
  items: TimelineItem[];
  dragging?: boolean;
};

const Timeline: React.FC<TimelineProps> = ({ items, dragging }) => (
  <div className={`w-full md:w-1/3${dragging ? ' pointer-events-none' : ''}`}>
    <h3 className="font-semibold text-lg mb-6 text-center text-foreground">Timeline</h3>
    <ol className="border-l border-border">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative pl-8 pb-8 last:pb-0 transition-transform duration-200 hover:scale-105"
        >
          <span
            className={`absolute -left-[0.4rem] top-1 w-3 h-3 rounded-full ${item.color}`}
          ></span>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-foreground">{item.company}</h4>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
          <p className="text-sm text-foreground/80">{item.role}</p>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
            <li>{item.details}</li>
          </ul>
        </li>
      ))}
    </ol>
  </div>
);

export default Timeline;
