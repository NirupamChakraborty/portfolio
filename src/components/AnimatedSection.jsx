import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedSection({ children, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      {children}
    </motion.div>
  );
}