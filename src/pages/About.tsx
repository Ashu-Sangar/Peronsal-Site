import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoFlipCard from "@/components/PhotoFlipCard";
import Timeline from "@/components/about/Timeline";
import Hobbies from "@/components/about/Hobbies";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// You can update these with your actual images and captions!
const photos = [
  {
    src: "/img/img1.jpeg",
    alt: "Photo 1",
    backText: "Brick by Brick.",
  },
  {
    src: "/img/img2.jpeg",
    alt: "Photo 2",
    backText: "Checkpoint saved. Proceed with wonder.",
  },
  {
    src: "/img/img3.jpeg",
    alt: "Photo 3",
    backText: "Mildly radioactive, highly reflective.",
  }
];

const experienceData = [
  {
    company: 'Neuraville',
    role: 'Software Engineer',
    details: 'Developed real-time AI-human interface integrating FEAGI with Blender, achieving 99% performance optimization and 80% reduction in manual setup through automated Python scripts.',
    date: 'Jan 2025 - May 2025',
    color: 'bg-red-400',
    tint: 'bg-red-400/[0.04] dark:bg-red-400/[0.06]',
    glow: 'hover:shadow-red-400/10',
  },
  {
    company: 'Outlier AI',
    role: 'Prompt Engineer',
    details: 'Developed 50+ AI prompts across multiple domains, improving response accuracy by 25% and model robustness by 30% through comprehensive stress-testing frameworks.',
    date: 'Apr 2024 - Dec 2024',
    color: 'bg-yellow-300',
    tint: 'bg-yellow-300/[0.05] dark:bg-yellow-300/[0.06]',
    glow: 'hover:shadow-yellow-300/10',
  },
];

const educationData = [
  {
    company: 'Georgia Institute of Technology',
    role: 'M.S in Computer Science',
    details: 'They say knowledge is power — so I\'m grinding for more XP',
    date: 'Fall 2026',
    color: 'bg-blue-400',
    tint: 'bg-blue-400/[0.04] dark:bg-blue-400/[0.06]',
    glow: 'hover:shadow-blue-400/10',
  },
  {
    company: 'University Of Pittsburgh',
    role: 'B.S in Computer Science',
    details: 'Where I learned that the shortest path isn\'t always the most efficient',
    date: '2021 - 2025',
    color: 'bg-green-400',
    tint: 'bg-green-400/[0.04] dark:bg-green-400/[0.06]',
    glow: 'hover:shadow-green-400/10',
  },
];


export default function About() {
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-[-8%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-500/[0.07] dark:bg-indigo-500/[0.11] blur-[130px]" />
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-2">
        <section className="w-full max-w-5xl mx-auto text-center mt-16 mb-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3 animate-fade-in">About</h2>
          <div className="text-muted-foreground mb-10">Who I am.</div>
          {/* Photos Row */}
          <div className="flex gap-5 justify-center mb-12 flex-wrap">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`hover-scale`}
                style={{
                  transform: `rotateZ(${i === 0 ? -9 : i === 1 ? -3 : i === 2 ? 3 : 7}deg)`,
                }}
              >
                <PhotoFlipCard
                  frontSrc={p.src}
                  alt={p.alt}
                  backText={p.backText}
                  setIsDragging={setIsDraggingPhoto}
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- Experience, Education & Interests --- */}
        <section className="w-full max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal>
            <Timeline title="Experience" items={experienceData} dragging={isDraggingPhoto} />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Timeline title="Education" items={educationData} dragging={isDraggingPhoto} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Hobbies dragging={isDraggingPhoto} />
          </ScrollReveal>
        </section>

        {/* Projects link */}
        <ScrollReveal delay={0.1}>
          <section className="w-full max-w-4xl mx-auto mt-8 mb-4 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition font-medium text-sm"
            >
              See my projects
              <ArrowRight size={16} />
            </Link>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
