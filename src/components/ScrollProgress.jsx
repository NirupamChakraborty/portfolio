import { motion, useScroll, useSpring } from "framer-motion";

// A hairline along the nav that fills as the reader moves down the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 });
  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX }} />;
}
