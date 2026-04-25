import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function WordsPullUp({
  text,
  showAsterisk = false,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <div
            key={i}
            className="overflow-hidden inline-flex relative mr-[0.2em] last:mr-0"
          >
            <motion.span
              initial={{ y: "150%" }}
              animate={isInView ? { y: 0 } : { y: "150%" }}
              transition={{
                delay: i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative"
            >
              {word}
              {showAsterisk && isLastWord && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                  *
                </span>
              )}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export function WordsPullUpMultiStyle({
  segments,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  let wordIndex = 0;
  const wordElements = segments.flatMap((segment) => {
    const words = segment.text.split(" ");
    return words.map((word) => {
      const current = wordIndex++;
      return { word, className: segment.className, index: current };
    });
  });

  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center">
      {wordElements.map((item, i) => (
        <div key={i} className="overflow-hidden inline-flex mr-[0.25em] last:mr-0">
          <motion.span
            initial={{ y: "150%" }}
            animate={isInView ? { y: 0 } : { y: "150%" }}
            transition={{
              delay: item.index * 0.08,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className || ""}`}
          >
            {item.word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export function ScrollRevealText({
  text,
  className = "",
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const chars = text.split("");

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {chars.map((char, i) => {
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0.2, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 8 }}
            transition={{
              delay: Math.min(i * 0.012, 0.9),
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </p>
  );
}
