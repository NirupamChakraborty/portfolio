import { motion } from "framer-motion";

const SEGMENTS = 28;

// A sequential light strip, lit from the centre outward like a tail-light signature.
export default function LightBar() {
  return (
    <div className="light-bar" aria-hidden="true">
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.9 + Math.abs(i - (SEGMENTS - 1) / 2) * 0.035 }}
        />
      ))}
    </div>
  );
}
