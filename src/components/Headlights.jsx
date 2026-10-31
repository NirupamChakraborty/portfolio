import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EYE = "M58 112 L392 196 L446 262 L318 250 L128 196 Z";
const BROW = "M46 92 L408 182";
const DRL = "M104 148 L352 208 L392 244";
const HOOD = ["M500 18 L500 96", "M404 18 L452 132", "M596 18 L548 132", "M120 40 L330 108", "M880 40 L670 108"];
const GRILLE = "M360 276 H640 L586 330 H414 Z";

function Eye({ light, flip }) {
  return (
    <g transform={flip ? "matrix(-1 0 0 1 1000 0)" : undefined}>
      <path d={EYE} className="eye-socket" />
      <motion.path d={EYE} className="eye-glow" style={{ opacity: light }} />
      <path d={BROW} className="eye-brow" />
      <motion.path d={DRL} className="eye-drl" style={{ pathLength: light }} />
    </g>
  );
}

// A low, angry front end. The lights come on as the reader scrolls into it.
export function CarFace({ light, title }) {
  return (
    <svg className="car-face" viewBox="0 0 1000 350" role="img" aria-label={title}>
      {HOOD.map((d) => (
        <path key={d} d={d} className="face-line" />
      ))}
      <Eye light={light} />
      <Eye light={light} flip />
      <path d={GRILLE} className="face-grille" />
      <path d="M392 296 H608 M408 314 H592" className="face-line" />
    </svg>
  );
}

export default function Headlights({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const light = useTransform(scrollYProgress, [0.05, 0.4], [reduced ? 1 : 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1.5]);
  const beam = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const copy = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <section ref={ref} className="lights">
      <div className="lights-pin">
        <motion.div className="lights-beam" aria-hidden="true" style={reduced ? undefined : { opacity: beam }} />
        <motion.div style={reduced ? undefined : { scale }}>
          <CarFace light={light} title="Front of a car with angular headlights" />
        </motion.div>
        <motion.h2 className="lights-copy" style={reduced ? undefined : { opacity: copy }}>
          {children}
        </motion.h2>
      </div>
    </section>
  );
}
