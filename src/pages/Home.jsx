import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { FiUser, FiCode, FiMail, FiArrowRight } from "react-icons/fi";
import Ticker from "../components/Ticker";

// three.js is a heavy dependency — split it into its own chunk so it only
// loads once the browser actually needs the hero's 3D scene.
const Scene3D = lazy(() => import("../components/Scene3D"));

const ROLES = ["Full-Stack Engineer", "AI Engineer", "Software Engineer"];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", minWidth: "13ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          style={{ display: "inline-block" }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const QUICK_LINKS = [
  { to: "/about", Icon: FiUser, title: "About Me", text: "CSE final-year, JEC · design + engineering + AI" },
  { to: "/projects", Icon: FiCode, title: "Projects", text: "7 shipped products, from blockchain health-tech to AI SaaS" },
  { to: "/contact", Icon: FiMail, title: "Get in Touch", text: "Open to full-time roles starting 2026" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div id="hero" className="hero">
        <Suspense fallback={null}>
          <Scene3D className="hero-scene3d" />
        </Suspense>
        <div className="hero-bg-text">NC</div>
        <motion.div
          className="hero-slash"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img className="hero-slash-img" src="/profile.jpeg" alt="" />
          <div className="hero-slash-overlay" />
        </motion.div>
        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RotatingRole /> · CSE 2026
          </motion.div>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NIRUPAM
            <span className="line2">CHAKRABORTY</span>
          </motion.h1>
          <motion.div
            className="hero-bottom"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p className="hero-desc" variants={itemVariants}>
              Final-year CSE student building at the intersection of <strong>design</strong>,{" "}
              <strong>engineering</strong>, and <strong>AI</strong>. 3 internships. 7 shipped products. Tea &gt; Coffee.
            </motion.p>
            <motion.div className="hero-meta" variants={itemVariants}>
              <div className="hero-stats">
                {[
                  { n: "3", l: "Internships" },
                  { n: "7+", l: "Projects" },
                  { n: "20+", l: "Technologies" },
                ].map((stat, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <div className="stat-n">{stat.n}</div>
                    <div className="stat-l">{stat.l}</div>
                  </motion.div>
                ))}
              </div>
              <div className="hero-cta">
                <motion.a
                  href="/Nirupam_Chakraborty_Resume.pdf"
                  target="_blank"
                  className="btn-orange"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ↓ Resume
                </motion.a>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact" className="btn-outline">
                    Get in Touch →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Ticker />

      <motion.div
        className="hdiv"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        style={{ originX: 0 }}
      />

      {/* QUICK LINKS */}
      <section className="section">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Explore
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          FIND OUT <em>MORE</em>
        </motion.h2>
        <div className="quick-links-grid" style={{ perspective: 1200 }}>
          {QUICK_LINKS.map((q, i) => (
            <motion.div
              key={q.to}
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: -130, rotateX: -70 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 85, damping: 12, delay: i * 0.12 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
            >
              <Link to={q.to} className="quick-link-card">
                <div className="ql-icon">
                  <q.Icon />
                </div>
                <div className="ql-title">{q.title}</div>
                <div className="ql-text">{q.text}</div>
                <div className="ql-arrow">
                  <FiArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
