import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
