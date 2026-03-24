import React, { useEffect, useState } from "react";

const fullText = "hello, ashu here";

const Intro = () => {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typed.length < fullText.length) {
      timeout = setTimeout(() => {
        setTyped(fullText.slice(0, typed.length + 1));
      }, 80);
    }
    return () => clearTimeout(timeout);
  }, [typed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="text-center md:text-left max-w-3xl mx-auto mt-16 md:mt-24 mb-8 px-2">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-5 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent"
        style={{ minHeight: "1.2em" }}
      >
        {typed}
        <span
          className={`inline-block w-0.5 ml-1 align-baseline transition-opacity duration-200 text-foreground/60 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          |
        </span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
        Documenting my path from Pitt CS grad to SWE — powered by late-night playlists and Python scripts
      </p>
    </div>
  );
};

export default Intro;
