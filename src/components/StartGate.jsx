import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { rememberGate } from "../lib/startGate";

const LIGHTS = 5;

// Five start lights come on one by one, then go out together to open the site.
export default function StartGate({ onDone }) {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const finish = () => {
      rememberGate();
      onDone();
    };
    const step = setInterval(() => setLit((n) => Math.min(n + 1, LIGHTS)), 240);
    const end = setTimeout(finish, 240 * LIGHTS + 420);
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => {
      clearInterval(step);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone]);

  return (
    <motion.button
      type="button"
      className="gate"
      aria-label="Skip intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      onClick={() => {
        rememberGate();
        onDone();
      }}
    >
      <span className="gate-lights">
        {Array.from({ length: LIGHTS }, (_, i) => (
          <span key={i} className={`gate-pod${lit > i ? " is-lit" : ""}`}>
            <i />
            <i />
          </span>
        ))}
      </span>
      <span className="gate-label">Engine start</span>
    </motion.button>
  );
}
