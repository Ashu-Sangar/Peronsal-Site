const skills = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI",
  "AI/ML", "Real-time Systems", "Computer Vision", "NLP",
  "Supabase", "Docker", "WebSocket", "Firebase",
];

const MainHighlight = () => (
  <section className="w-full max-w-3xl mx-auto mt-6 animate-fade-in flex flex-col gap-4">
    {/* Photo + Current Focus card */}
    <div className="relative rounded-2xl overflow-hidden bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row items-stretch">
      <img
        src="/img/img4.jpeg"
        alt="Current Focus"
        className="h-48 w-full md:w-64 object-cover"
      />
      <div className="p-5 flex-1 flex flex-col justify-center">
        <h2 className="text-lg font-bold text-foreground mb-1.5">Current Focus</h2>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Diving into automation as well as AI to construct intelligent and efficient workflows that power real world results.
        </p>
        <a
          href="/resume/Ashu_Sangar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-150 text-sm"
        >
          View CV
        </a>
      </div>
    </div>

    {/* Scrolling skills marquee */}
    <div className="relative overflow-hidden py-2 mask-marquee">
      <div className="flex gap-3 animate-marquee w-max">
        {[...skills, ...skills].map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted text-muted-foreground whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default MainHighlight;
