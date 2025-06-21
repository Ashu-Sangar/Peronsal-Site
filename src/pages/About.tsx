import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoFlipCard from "@/components/PhotoFlipCard";
import Timeline from "@/components/about/Timeline";
import Projects from "@/components/about/Projects";
import Hobbies from "@/components/about/Hobbies";

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
    backText: "Pondering too hard, don't know what to think anymore.",
  }
];

const timelineData = [
    {
        company: 'Neruaville',
        role: 'Software Engineer',
        details: 'Led the development of real-time AI integration enabling dynamic manipulation of Blender models.',
        date: '2024 - Now',
        color: 'bg-red-400'
    },
    {
        company: 'Outlier Ai',
        role: 'Prompt Engineer',
        details: 'Focused on refining and optimizing AI model prompts to improve accuracy, responsiveness, and overall performance in applications.',
        date: '2024 - 2025',
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

const projectsData = [
  {
    name: "FEAGI-Blender Integration",
    description: "AI-driven control and manipulation of 3D models, enhancing dynamic interactions and automation.",
    tags: [
      { name: "Python", color: "bg-gray-600 text-white" },
      { name: "Docker", color: "bg-cyan-500 text-white" },
      { name: "Blender API", color: "bg-gray-200 text-black" },
      { name: "FEAGI", color: "bg-green-600 text-white" },
      { name: "websocket", color: "bg-pink-600 text-white" }, 
      { name: "JSON", color: "bg-orange-600 text-white" },
      { name: "UDP", color: "bg-blue-500 text-white" },
      { name: "ZMQ", color: "bg-red-500 text-white" },
      { name: "LZ4", color: "bg-purple-500 text-white" },
    ],
    github: "https://github.com/feagi/blender-connector"
  },
  {
    name: "Legal Precedent Retrieval System Using NLP",
    description: "System for legal precedent retrieval, utilizing ML models to classify, search, and rank case law documents.",
    tags: [
      { name: "Python", color: "bg-cyan-500 text-white" },
      { name: "Natural Language Processing (NLP)", color: "bg-yellow-400 text-black" },
      { name: "BM25", color: "bg-green-600 text-white" },
      { name: "ColBERT", color: "bg-gray-200 text-black" },
      { name: "Pandas", color: "bg-orange-500 text-white" },
      { name: "Scikit-learn ", color: "bg-red-500 text-white" },
    ],
    github: "https://github.com/Ashu-Sangar/NLP-Legal-Precedent"
  },
  {
    name: "Spotify Data Dashboard",
    description: "display users' top albums and artists through interactive grids and rotating collages. Included export-to-image and social sharing features for platforms like Instagram.",
    tags: [
      { name: "Next.js", color: "bg-cyan-500 text-white" },
      { name: "React", color: "bg-green-400 text-white" },
      { name: "Spotify Web API", color: "bg-yellow-400 text-black" },
      { name: "Vercel", color: "bg-red-600 text-white" },
    ],
    github: "https://github.com/Ashu-Sangar/Spotify-web-app"
  },
];

export default function About() {
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-2">
        <section className="w-full max-w-5xl mx-auto text-center mt-16 mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 animate-fade-in">About</h2>
          <div className="text-muted-foreground mb-10">Who I am.</div>
          {/* Photos Row */}
          <div className="flex gap-5 justify-center mb-12 flex-wrap">
            {photos.map((p, i) => (
              <div
                className={`hover-scale`}
                key={i}
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

        {/* --- Timeline, Projects & Hobbies --- */}
        <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-4">
          <Timeline items={timelineData} dragging={isDraggingPhoto} />
          <Projects projects={projectsData} dragging={isDraggingPhoto} />
          <Hobbies dragging={isDraggingPhoto} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
