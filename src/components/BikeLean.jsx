import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MAX_LEAN = 58;

// Head-on race bike: fairing, winglets, rider tucked behind the screen.
function Bike() {
  return (
    <svg viewBox="0 0 300 420" className="lean-bike-svg" role="img" aria-label="Race bike seen head-on">
      <ellipse cx="72" cy="262" rx="17" ry="30" className="bike-leather" />
      <ellipse cx="228" cy="262" rx="17" ry="30" className="bike-leather" />
      <rect x="64" y="262" width="16" height="20" rx="5" className="bike-slider" />
      <rect x="220" y="262" width="16" height="20" rx="5" className="bike-slider" />
      <rect x="131" y="246" width="38" height="154" rx="19" className="bike-tyre" />
      <path d="M150 262V392" className="bike-tread" />
      <path d="M126 250 116 150M174 250 184 150" className="bike-fork" />
      <ellipse cx="150" cy="126" rx="74" ry="52" className="bike-leather" />
      <path d="M98 150 58 138M202 150 242 138" className="bike-bar" />
      <circle cx="150" cy="62" r="35" className="bike-helmet" />
      <path d="M121 56Q150 40 179 56L175 74Q150 64 125 74Z" className="bike-visor" />
      <path d="M150 28V44" className="bike-stripe" />
      <path d="M150 74Q186 82 197 142L150 124 103 142Q114 82 150 74Z" className="bike-screen" />
      <path d="M150 120 206 150 216 216 186 270 150 282 114 270 84 216 94 150Z" className="bike-fairing" />
      <path d="M86 204 50 196 48 207 89 222ZM214 204 250 196 252 207 211 222Z" className="bike-winglet" />
      <path d="M106 170 142 186 140 199 110 190ZM194 170 158 186 160 199 190 190Z" className="bike-light" />
      <path d="M139 206H161L150 224Z" className="bike-intake" />
      <text x="150" y="262" className="bike-number">
        04
      </text>
    </svg>
  );
}

// A race bike that tips from one knee to the other as the reader scrolls.
export default function BikeLean({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 0.28, 0.5, 0.78, 1], [0, -MAX_LEAN, 0, MAX_LEAN, 0]);
  const angle = useTransform(rotate, (r) => `${Math.round(Math.abs(r))}°`);

  return (
    <section ref={ref} className="lean">
      <div className="lean-pin">
        <div className="lean-readout" aria-hidden="true">
          <motion.strong>{angle}</motion.strong>
          <span>Lean angle</span>
        </div>
        <div className="lean-stage">
          <motion.div className="lean-bike" style={reduced ? undefined : { rotate }}>
            <Bike />
          </motion.div>
          <div className="kerb" aria-hidden="true" />
        </div>
        <h2 className="lean-copy">{children}</h2>
      </div>
    </section>
  );
}
