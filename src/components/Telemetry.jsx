import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const GEARS = 6;

// Fixed readout that treats the page as a gearbox: revs climb, then drop on each shift.
export default function Telemetry() {
  const { scrollYProgress } = useScroll();
  const [gear, setGear] = useState("N");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setGear(p < 0.01 ? "N" : String(Math.min(GEARS, Math.floor(p * GEARS) + 1)));
  });

  const band = useTransform(scrollYProgress, (p) => (p >= 1 ? 1 : (p * GEARS) % 1));
  const rpm = useTransform(scrollYProgress, (p) => {
    if (p < 0.01) return "900";
    const b = p >= 1 ? 1 : (p * GEARS) % 1;
    return String(Math.round((2 + b * 5.5) * 10) * 100);
  });

  return (
    <aside className="telemetry" aria-hidden="true">
      <span className="telemetry-gear">{gear}</span>
      <div>
        <div className="telemetry-rpm">
          <motion.span>{rpm}</motion.span> RPM
        </div>
        <div className="telemetry-band">
          <motion.div style={{ scaleX: band }} />
        </div>
      </div>
    </aside>
  );
}
