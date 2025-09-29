const MainHighlight = () => (
  <section className="w-full max-w-3xl mx-auto mt-6 animate-fade-in flex flex-col">
    <div className="relative rounded-lg overflow-hidden bg-card border border-border flex flex-col md:flex-row items-center">
      <img
        src="/img/img4.jpeg"
        alt="Current Focus"
        className="h-44 w-full md:w-60 object-cover md:rounded-r-none"
      />
      <div className="p-4 flex-1 flex flex-col justify-center">
        <h2 className="text-lg font-bold text-foreground mb-1">Current Focus</h2>
        <p className="text-sm text-muted-foreground mb-2">
        Diving into automation as well as AI to construct intelligent and efficient workflows that power real world results.        </p>
        <a href="/resume/Ashu_Sangar_Resume.pdf" download className="inline-block mt-auto px-4 py-2 rounded bg-primary/80 text-primary-foreground font-semibold transition hover:bg-primary text-sm">Download CV</a>
      </div>
    </div>
  </section>
);

export default MainHighlight;
