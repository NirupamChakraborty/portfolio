import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import usePageTitle from "../lib/usePageTitle";

export default function PageHeader({ eyebrow, title, children }) {
  usePageTitle(eyebrow);

  return (
    <motion.header
      className="page-header"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.05 }}
    >
      <p className="eyebrow">// {eyebrow.toLowerCase()}</p>
      <h1 className="page-title">{title}</h1>
      {children && <p className="page-lead">{children}</p>}
    </motion.header>
  );
}
