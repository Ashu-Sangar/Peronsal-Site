import { useEffect, useState } from "react";

const fullText = "hello, ashu here";

const Intro = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (typed.length >= fullText.length) return;

    const prevChar = typed.length > 0 ? fullText[typed.length - 1] : "";
    // Natural rhythm: pause after comma, slight randomness elsewhere
    let delay = 65 + Math.random() * 45; // 65-110ms
    if (prevChar === ",") delay = 280; // breathe after comma

    const timeout = setTimeout(() => {
      setTyped(fullText.slice(0, typed.length + 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [typed]);

  return (
    <div className="text-center md:text-left max-w-3xl mx-auto mt-16 md:mt-24 mb-8 px-2">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-5 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent"
        style={{ minHeight: "1.2em" }}
      >
        {typed}
        <span
          className="inline-block w-[2px] h-[0.85em] ml-1 align-middle rounded-full bg-foreground/60 animate-cursor-blink"
          aria-hidden
        />
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
        Documenting my path from Pitt CS grad to SWE — powered by late-night playlists and Python scripts
      </p>
    </div>
  );
};

export default Intro;
