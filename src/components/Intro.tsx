import { motion } from "framer-motion";

const words = ["hello,", "ashu", "here"];
const STAGGER = 0.14;
const DURATION = 0.7;
const EASE = [0.22, 1, 0.36, 1] as const;
const cursorDelay = (words.length - 1) * STAGGER + DURATION;
const subtitleDelay = cursorDelay + 0.15;

const Intro = () => (
  <div className="text-center md:text-left max-w-3xl mx-auto mt-12 md:mt-16 mb-8 px-2">
    <h1
      className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-5 text-foreground"
      style={{ minHeight: "1.2em" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: i * STAGGER,
            duration: DURATION,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[0.85em] ml-0.5 align-middle rounded-full bg-foreground/60 animate-cursor-blink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: cursorDelay, duration: 0.4 }}
        aria-hidden
      />
    </h1>
    <motion.p
      className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: subtitleDelay,
        duration: 0.6,
        ease: EASE,
      }}
    >
      Pitt CS grad → Georgia Tech MS — powered by late-night playlists and Python scripts
    </motion.p>
  </div>
);

export default Intro;
