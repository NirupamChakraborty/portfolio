import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

// Each letter tips forward into place, one after another.
export default function LetterReveal({ text, delay = 0 }) {
  let index = 0;
  return (
    <h1 aria-label={text}>
      {text.split(" ").map((word) => (
        <span key={word} className="reveal-word" aria-hidden="true">
          {[...word].map((char) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.45em", rotateX: -70, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.035 }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
