import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const GEARS = 6;
const TOP_SPEED = 340;
const BOOST_SECONDS = 0.9;
const REFILL_SECONDS = 5;

function formatLap(ms, precise) {
  const minutes = Math.floor(ms / 60000);
  const seconds = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
  if (!precise) return `${minutes}:${seconds}`;
  return `${minutes}:${seconds}.${String(Math.floor(ms % 1000)).padStart(3, "0")}`;
}

// Arcade-racer HUD: scroll position picks the gear, scroll speed drives the
// speedometer, a lap timer runs, and nitrous fires the page forward.
export default function Telemetry() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [gear, setGear] = useState("N");
  const lapRef = useRef(null);
  const tank = useMotionValue(1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setGear(p < 0.01 ? "N" : String(Math.min(GEARS, Math.floor(p * GEARS) + 1)));
  });

  useAnimationFrame((time) => {
    if (lapRef.current) lapRef.current.textContent = formatLap(time, !reduced);
  });

  const velocity = useVelocity(scrollY);
  const speed = useSpring(
    useTransform(velocity, (v) => Math.min(TOP_SPEED, Math.abs(v) * 0.12)),
    { stiffness: 90, damping: 22 },
  );
  const speedText = useTransform(speed, (v) => String(Math.round(v)).padStart(3, "0"));
  const band = useTransform(speed, [0, TOP_SPEED], [0, 1]);

  const fire = useCallback(() => {
    if (tank.get() < 1) return;
    const root = document.documentElement;
    root.classList.add("is-boost");
    window.scrollBy({ top: window.innerHeight * 1.6, behavior: reduced ? "auto" : "smooth" });
    animate(tank, 0, { duration: BOOST_SECONDS, ease: "easeOut" }).then(() => {
      root.classList.remove("is-boost");
      animate(tank, 1, { duration: REFILL_SECONDS, ease: "linear" });
    });
  }, [tank, reduced]);

  useEffect(() => {
    const onKey = (e) => {
      const typing = e.target.closest?.("input, textarea, [contenteditable]");
      if (e.key.toLowerCase() === "n" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) fire();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("nitrous", fire);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("nitrous", fire);
    };
  }, [fire]);

  return (
    <>
      <div className="boost-fx" aria-hidden="true" />
      <aside className="telemetry">
        <span className="telemetry-gear" aria-hidden="true">
          {gear}
        </span>
        <div aria-hidden="true">
          <div className="telemetry-rpm">
            <motion.strong>{speedText}</motion.strong> KM/H
          </div>
          <div className="telemetry-band">
            <motion.div style={{ scaleX: band }} />
          </div>
          <div className="telemetry-lap">
            LAP <span ref={lapRef}>0:00</span>
          </div>
        </div>
        <button type="button" className="nos" onClick={fire} aria-label="Nitrous boost: jump down the page">
          NOS
          <motion.i style={{ scaleX: tank }} />
        </button>
      </aside>
    </>
  );
}
