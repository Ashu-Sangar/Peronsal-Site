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
      }, 80); // Speed of typing (ms)
    }
    return () => clearTimeout(timeout);
  }, [typed]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="text-center md:text-left max-w-3xl mx-auto mt-6 mb-2 px-2">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-foreground animate-fade-in" style={{ minHeight: 40 }}>
        {typed}
        <span
          className={`inline-block w-2 ml-1 align-baseline transition-opacity duration-200 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          |
        </span>
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-in">
      Documenting my path from Pitt CS grad to SWE — powered by late-night playlists and Python scripts
      </p>
    </div>
  );
};

export default Intro;
