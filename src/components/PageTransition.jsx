import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

// Each route arrives behind a racing-stripe sweep.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.div
        className="route-wipe"
        aria-hidden="true"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}>
        {children}
      </motion.div>
    </>
  );
}
