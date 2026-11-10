import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BODY =
  "M30 132 L26 98 L46 86 L230 54 Q290 38 346 40 Q392 44 438 78 L604 116 Q632 122 634 132 L632 140 L564 140 A46 46 0 0 0 472 140 L204 140 A46 46 0 0 0 112 140 Z";
const GLASS = "M266 60 Q304 46 344 47 Q380 50 414 78 L270 80 Z";
const INTAKE = "M292 104 L392 100 L352 128 L306 128 Z";
const WING = "M14 76 L104 66 L108 72 L18 84 Z";
const WING_POST = "M50 82 L62 94";

function Wheel({ x, spin }) {
  return (
    <g transform={`translate(${x} 140)`}>
      <circle r="38" className="wheel-tyre" />
      <motion.g style={{ rotate: spin }}>
        <circle r="23" className="wheel-rim" />
        {[0, 60, 120].map((a) => (
          <path key={a} d="M0 -22 L0 22" className="wheel-spoke" transform={`rotate(${a})`} />
        ))}
      </motion.g>
      <circle r="6" className="wheel-hub" />
    </g>
  );
}

function Bike({ spin }) {
  return (
    <>
      <path d="M72 98 28 86" className="moto-pipe" />
      <path d="M235 125 213 72M60 125 140 110" className="moto-fork" />
      <path d="M38 58 112 72Q140 44 182 56L236 70Q252 78 246 90L222 116 128 120 100 88 44 70Z" className="car-body" />
      <path d="M196 58Q214 44 232 66L214 66Z" className="car-glass" />
      <path d="M104 66Q130 28 178 38L188 58Q150 52 124 74Z" className="moto-rider" />
      <path d="M112 70 152 96 140 114 128 110 134 98 104 80Z" className="moto-rider" />
      <circle cx="193" cy="40" r="15" className="moto-helmet" />
      <path d="M196 34 208 40 204 47 194 44Z" className="car-glass" />
      {[60, 235].map((x) => (
        <g key={x} transform={`translate(${x} 125)`}>
          <circle r="33" className="wheel-tyre" />
          <motion.g style={{ rotate: spin }}>
            <circle r="20" className="wheel-rim" />
            <path d="M0 -19V19M-19 0H19" className="wheel-spoke" />
          </motion.g>
          <circle r="5" className="wheel-hub" />
        </g>
      ))}
    </>
  );
}

// A supercar crosses the page with a race bike chasing it, wheels turning with the scroll.
export default function CarDrive() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-60vw", "95vw"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 2160]);
  const bikeX = useTransform(scrollYProgress, [0, 1], ["-84vw", "76vw"]);

  return (
    <div ref={ref} className="drive" aria-hidden="true">
      <motion.svg viewBox="0 0 640 182" className="drive-car" style={reduced ? undefined : { x }}>
        <path d="M-120 76H-20M-170 106H-30M-110 134H-10" className="speed-lines" />
        <path d={WING_POST} className="car-post" />
        <path d={WING} className="car-wing" />
        <path d={BODY} className="car-body" />
        <path d={GLASS} className="car-glass" />
        <path d={INTAKE} className="car-glass" />
        <path d="M204 116 L472 112" className="car-crease" />
        <path d="M586 110 L618 118" className="car-head" />
        <path d="M28 104 L52 100" className="car-tail" />
        <path d="M570 140 L640 140" className="car-splitter" />
        <Wheel x={158} spin={spin} />
        <Wheel x={518} spin={spin} />
      </motion.svg>
      <motion.svg viewBox="0 0 300 164" className="drive-bike" style={reduced ? undefined : { x: bikeX }}>
        <Bike spin={spin} />
      </motion.svg>
      <div className="drive-road" />
    </div>
  );
}
