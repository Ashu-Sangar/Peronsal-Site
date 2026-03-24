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

const timelineData = [
  {
    company: 'Neuraville',
    role: 'Software Engineer',
    details: 'Developed real-time AI-human interface integrating FEAGI with Blender, achieving 99% performance optimization and 80% reduction in manual setup through automated Python scripts.',
    date: 'Jan 2025 - May 2025',
    color: 'bg-red-400'
  },
  {
    company: 'Outlier AI',
    role: 'Prompt Engineer',
    details: 'Developed 50+ AI prompts across multiple domains, improving response accuracy by 25% and model robustness by 30% through comprehensive stress-testing frameworks.',
    date: 'Apr 2024 - Dec 2024',
    color: 'bg-yellow-300'
  },
  {
    company: 'University Of Pittsburgh ',
    role: 'B.S in Computer Science',
    details: 'Where I learned that the shortest path isn\'t always the most efficient',
    date: '2021-2025',
    color: 'bg-green-400'
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
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
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
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* --- Timeline & Hobbies --- */}
        <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-8 justify-center">
          <ScrollReveal className="w-full md:w-1/2">
            <Timeline items={timelineData} dragging={isDraggingPhoto} />
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="w-full md:w-1/2">
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
