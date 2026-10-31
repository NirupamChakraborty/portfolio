import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

// Leans toward the pointer while it's nearby, then springs back to rest.
export default function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const box = ref.current.getBoundingClientRect();
    x.set((e.clientX - box.left - box.width / 2) * strength);
    y.set((e.clientY - box.top - box.height / 2) * strength);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
