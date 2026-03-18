import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { StaggerReveal, StaggerItem } from "@/components/StaggerReveal";

type Tag = {
  name: string;
  color: string;
};

type ProjectDetail = {
  name: string;
  description: string;
  tags: Tag[];
  github?: string;
  liveUrl?: string;
  longDescription: string;
  image?: string;
  video?: string;
  mediaHint?: string;
  highlights: string[];
};

const projectsData: ProjectDetail[] = [
  {
    name: "Keepsake",
    description:
      "Real-time collaborative digital scrapbook with drag-and-drop canvas, live cursor tracking, AI background removal, and operation-based undo/redo.",
    longDescription:
      "Built as a full-stack collaborative platform where multiple users can design scrapbook pages together in real time. Tackled challenges around conflict resolution with optimistic updates, performant canvas rendering with dozens of draggable elements, and integrating AI-powered background removal via a serverless pipeline. Implemented multi-spread pagination, smart snapping guides, and granular role-based access control.",
    highlights: [
      "Real-time collaboration with live cursor tracking via Supabase Realtime",
      "Operation-based undo/redo system supporting complex nested actions",
      "AI background removal integrated through serverless function pipeline",
      "Smart snapping and alignment guides for precise layout editing",
    ],
    tags: [
      { name: "Next.js 16", color: "bg-black text-white" },
      { name: "React 19", color: "bg-cyan-500 text-white" },
      { name: "TypeScript", color: "bg-blue-600 text-white" },
      { name: "Supabase", color: "bg-green-600 text-white" },
      { name: "Framer Motion", color: "bg-pink-600 text-white" },
      { name: "Tailwind CSS 4", color: "bg-teal-600 text-white" },
      { name: "Upstash Redis", color: "bg-red-500 text-white" },
    ],
    video: "/project_showcase/Keepsake.mp4",
    liveUrl: "https://keepsake.ashusangar.com",
  },
  // {
  //   name: "Altus",
  //   description:
  //     "Full-stack productivity platform that quantifies focus quality. Features real-time session tracking, secure authentication, and rigid server-side data validation.",
  //   longDescription:
  //     "Designed and built a productivity tool that goes beyond simple time tracking by measuring focus quality through session analytics. The backend uses FastAPI with Pydantic for strict schema validation, ensuring data integrity across all endpoints. Firebase Auth handles secure user sessions, while Firestore provides real-time data sync for seamless cross-device usage.",
  //   highlights: [
  //     "Focus quality scoring algorithm based on session patterns",
  //     "Strict server-side validation with Pydantic models",
  //     "Real-time data sync across devices via Firestore",
  //     "Secure authentication flow with Firebase Auth",
  //   ],
  //   tags: [
  //     { name: "Next.js 14", color: "bg-black text-white" },
  //     { name: "FastAPI (Python)", color: "bg-teal-600 text-white" },
  //     { name: "Firebase Auth", color: "bg-amber-500 text-black" },
  //     { name: "Firestore", color: "bg-orange-600 text-white" },
  //     { name: "Pydantic", color: "bg-rose-500 text-white" },
  //     { name: "TypeScript", color: "bg-blue-600 text-white" },
  //   ],
  //   // image: "/img/altus.png",
  //   mediaHint: "Screenshot the dashboard — session tracking, focus score, or main UI",
  //   github: "https://github.com/Ashu-Sangar/atlus-ai",
  // },
  {
    name: "FEAGI-Blender Integration",
    description:
      "Real-time AI-human interface translating body movements into 3D simulations with 99% performance optimization and automated character binding system.",
    longDescription:
      "Built the bridge between FEAGI's brain-inspired AI framework and Blender's 3D engine, enabling real-time motion capture to drive animated characters. Optimized the data pipeline from raw sensor input to rendered 3D output, achieving 99% performance gains through efficient serialization (LZ4 compression, ZMQ messaging) and batched updates. Created an automated character binding system that eliminated 80% of manual rigging setup.",
    highlights: [
      "99% performance optimization through LZ4 compression and ZMQ messaging",
      "Automated character binding system reducing 80% of manual setup",
      "Real-time body tracking to 3D animation pipeline",
      "Docker-based deployment for consistent cross-platform operation",
    ],
    tags: [
      { name: "Python", color: "bg-gray-600 text-white" },
      { name: "Docker", color: "bg-cyan-500 text-white" },
      { name: "Blender API", color: "bg-gray-200 text-black" },
      { name: "FEAGI", color: "bg-green-600 text-white" },
      { name: "WebSocket", color: "bg-pink-600 text-white" },
      { name: "RESTful APIs", color: "bg-indigo-600 text-white" },
      { name: "Computer Vision", color: "bg-teal-600 text-white" },
      { name: "Motion Capture", color: "bg-amber-600 text-white" },
    ],
    video: "/project_showcase/blender_connector.mp4",
    github: "https://github.com/feagi/blender-connector",
  },
  {
    name: "Legal Precedent Retrieval System Using NLP",
    description:
      "System for legal precedent retrieval, utilizing ML models to classify, search, and rank case law documents.",
    longDescription:
      "Developed a multi-stage retrieval pipeline for legal case law that combines traditional information retrieval with modern neural approaches. The system uses BM25 for initial candidate retrieval, then re-ranks results using ColBERT for semantic relevance. Built classification models with Scikit-learn to categorize cases by legal domain, improving search precision for domain-specific queries.",
    highlights: [
      "Hybrid retrieval pipeline combining BM25 and ColBERT re-ranking",
      "Legal domain classification using Scikit-learn models",
      "Efficient document indexing for large case law corpora",
      "Evaluation framework comparing retrieval approaches on legal benchmarks",
    ],
    tags: [
      { name: "Python", color: "bg-cyan-500 text-white" },
      { name: "NLP", color: "bg-yellow-400 text-black" },
      { name: "BM25", color: "bg-green-600 text-white" },
      { name: "ColBERT", color: "bg-gray-200 text-black" },
      { name: "Pandas", color: "bg-orange-500 text-white" },
      { name: "Scikit-learn", color: "bg-red-500 text-white" },
    ],
    image: "/project_showcase/NLP.png",
    github: "https://github.com/Ashu-Sangar/NLP-Legal-Precedent",
  },
];

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Preload all project media so expanding feels instant
  React.useEffect(() => {
    projectsData.forEach((project) => {
      if (project.video) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = project.video;
      } else if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    });
  }, []);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4">
        <section className="w-full max-w-3xl mx-auto mt-16 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center animate-fade-in">
            Projects
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Things I've built.
          </p>

          <StaggerReveal className="flex flex-col gap-4">
            {projectsData.map((project, index) => (
              <StaggerItem key={index}>
              <div
                className="bg-card border border-border rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-lg"
              >
                {/* Collapsed card header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-3">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`${tag.color} px-2 py-0.5 rounded-full text-xs font-semibold`}
                        >
                          {tag.name}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Expanded details */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border pt-4">
                        {/* Media: video > image > placeholder */}
                        {project.video ? (
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full rounded-lg mb-4"
                          />
                        ) : project.image ? (
                          <img
                            src={project.image}
                            alt={`${project.name} screenshot`}
                            className="w-full max-h-80 object-contain rounded-lg mb-4"
                          />
                        ) : (
                          <div className="w-full h-48 bg-muted rounded-lg mb-4 flex flex-col items-center justify-center gap-1 text-muted-foreground text-sm">
                            <span>{project.mediaHint ?? "Media coming soon"}</span>
                            <span className="text-xs opacity-60">Add an image or video to <code className="font-mono">public/img/</code></span>
                          </div>
                        )}

                        {/* Full description */}
                        <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                          {project.longDescription}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-2 mb-4">
                          {project.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-foreground/60 mt-1">•</span>
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* All tags */}
                        <div className="flex gap-2 flex-wrap mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`${tag.color} px-2 py-0.5 rounded-full text-xs font-semibold`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/80 text-primary-foreground font-semibold text-sm hover:bg-primary transition"
                            >
                              <ExternalLink size={16} />
                              View Live
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-semibold text-sm hover:bg-muted/80 transition"
                            >
                              <Github size={16} />
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
