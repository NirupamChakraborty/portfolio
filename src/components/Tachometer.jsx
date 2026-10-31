import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_REV = 8;
const REDLINE = 6.5;
const IDLE = 0.9;

const angleFor = (rev) => (rev / MAX_REV) * 240 - 120;

function point(rev, radius) {
  const rad = ((angleFor(rev) - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
}

function arc(from, to, radius) {
  const [x1, y1] = point(from, radius);
  const [x2, y2] = point(to, radius);
  const large = angleFor(to) - angleFor(from) > 180 ? 1 : 0;
  return `M${x1} ${y1}A${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
}

const TICKS = Array.from({ length: MAX_REV * 4 + 1 }, (_, i) => i / 4);

// A rev counter. The needle sweeps on ignition, then follows the page scroll.
export default function Tachometer({ progress }) {
  const reduced = useReducedMotion();
  const sweep = useMotionValue(reduced ? IDLE : 0);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(sweep, [0, MAX_REV, IDLE], { duration: 2, delay: 0.5, times: [0, 0.45, 1], ease: "easeInOut" });
    return () => controls.stop();
  }, [reduced, sweep]);

  const rev = useTransform([sweep, progress], ([s, p]) => Math.max(s, IDLE + p * 7));
  const rotate = useTransform(rev, [0, MAX_REV], [-120, 120]);
  const rpm = useTransform(rev, (v) => String(Math.round(v * 100) * 10).padStart(4, "0"));

  return (
    <div className="tach" role="img" aria-label="Rev counter that responds to scrolling">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <path d={arc(0, MAX_REV, 150)} className="tach-track" />
        <path d={arc(REDLINE, MAX_REV, 150)} className="tach-redline" />
        {TICKS.map((t) => {
          const major = Number.isInteger(t);
          const [x1, y1] = point(t, 146);
          const [x2, y2] = point(t, major ? 128 : 137);
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} className={t >= REDLINE ? "tick is-red" : "tick"} />;
        })}
        {Array.from({ length: MAX_REV + 1 }, (_, i) => {
          const [x, y] = point(i, 110);
          return (
            <text key={i} x={x} y={y} className={i >= REDLINE ? "tach-num is-red" : "tach-num"}>
              {i}
            </text>
          );
        })}
      </svg>
      <motion.div className="tach-needle" style={{ rotate }} />
      <div className="tach-hub" />
      <div className="tach-readout">
        <motion.strong>{rpm}</motion.strong>
        <span>RPM</span>
      </div>
    </div>
  );
}
