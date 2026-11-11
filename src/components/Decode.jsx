import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/";
const STEPS = 18;

// Text that resolves out of random telemetry glyphs, left to right, the
// first time it scrolls into view.
export default function Decode({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      const revealed = Math.floor((step / STEPS) * text.length);
      setShown(
        [...text]
          .map((c, i) => (i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (revealed >= text.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [inView, reduced, text]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
