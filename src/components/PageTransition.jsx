import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

export default function PageTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: EASE }}>
      {children}
    </motion.div>
  );
}
