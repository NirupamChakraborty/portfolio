import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// The "zoom" curtain: two panels scale in from each edge toward the center
// (transform-origin at the outer edge) until they meet and cover the screen,
// hold briefly with the brand mark glowing, then scale back down to reveal
// the page underneath. Plays on first load and on every route change.
export default function Curtain() {
  const location = useLocation();
  const firstRender = useRef(true);
  const [phase, setPhase] = useState("closing"); // closing | held | opening | idle

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const openTimer = setTimeout(() => setPhase("opening"), 700);
      const idleTimer = setTimeout(() => setPhase("idle"), 700 + 520);
      return () => {
        clearTimeout(openTimer);
        clearTimeout(idleTimer);
      };
    }
    setPhase("closing");
    const openTimer = setTimeout(() => setPhase("opening"), 420);
    const idleTimer = setTimeout(() => setPhase("idle"), 420 + 480);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(idleTimer);
    };
  }, [location.pathname]);

  if (phase === "idle") return null;
  const covering = phase === "closing" || phase === "held";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none", display: "flex" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: covering ? 1 : 0 }}
        transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
        style={{
          width: "50%",
          height: "100%",
          background: "var(--grad)",
          transformOrigin: "right center",
          boxShadow: "20px 0 60px rgba(var(--accent-rgb),0.35)",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: covering ? 1 : 0 }}
        transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
        style={{
          width: "50%",
          height: "100%",
          background: "var(--grad)",
          transformOrigin: "left center",
          boxShadow: "-20px 0 60px rgba(var(--accent-rgb),0.35)",
        }}
      />

      {/* Centered brand mark, glowing in while the curtain is closed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: covering ? 1 : 0, scale: covering ? 1 : 0.85 }}
        transition={{ duration: 0.3, delay: covering ? 0.22 : 0 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "2.1rem",
          letterSpacing: "-0.02em",
          color: "#fff",
          textShadow: "0 2px 20px rgba(0,0,0,0.4)",
        }}
      >
        NIRUPAM<span style={{ opacity: 0.6 }}>.</span>
      </motion.div>
    </div>
  );
}
