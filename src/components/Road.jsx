import { motion, useScroll, useTransform } from "framer-motion";

// Dashed lane markings down both margins that rush past as the page moves.
export default function Road() {
  const { scrollY } = useScroll();
  const backgroundPositionY = useTransform(scrollY, (y) => `${y * 1.4}px`);
  return (
    <>
      <motion.div className="lane is-left" aria-hidden="true" style={{ backgroundPositionY }} />
      <motion.div className="lane is-right" aria-hidden="true" style={{ backgroundPositionY }} />
    </>
  );
}
