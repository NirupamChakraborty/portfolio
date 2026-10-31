import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// A statement whose words brighten one by one as the reader scrolls through it.
export default function ScrollText({ text }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  if (reduced) return <p ref={ref} className="statement">{text}</p>;

  const words = text.split(" ");
  return (
    <p ref={ref} className="statement">
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}
