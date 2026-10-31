import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useState } from "react";

const GEARS = 6;
const TOP_SPEED = 340;

// Fixed readout that treats the page as a gearbox: scroll position picks the gear,
// and scroll speed drives the speedometer.
export default function Telemetry() {
  const { scrollY, scrollYProgress } = useScroll();
  const [gear, setGear] = useState("N");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setGear(p < 0.01 ? "N" : String(Math.min(GEARS, Math.floor(p * GEARS) + 1)));
  });

  const velocity = useVelocity(scrollY);
  const speed = useSpring(
    useTransform(velocity, (v) => Math.min(TOP_SPEED, Math.abs(v) * 0.12)),
    { stiffness: 90, damping: 22 },
  );
  const speedText = useTransform(speed, (v) => String(Math.round(v)).padStart(3, "0"));
  const band = useTransform(speed, [0, TOP_SPEED], [0, 1]);

  return (
    <aside className="telemetry" aria-hidden="true">
      <span className="telemetry-gear">{gear}</span>
      <div>
        <div className="telemetry-rpm">
          <motion.strong>{speedText}</motion.strong> KM/H
        </div>
        <div className="telemetry-band">
          <motion.div style={{ scaleX: band }} />
        </div>
      </div>
    </aside>
  );
}
