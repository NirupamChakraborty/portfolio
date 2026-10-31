import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import CountUp from "../components/CountUp";
import Magnetic from "../components/Magnetic";
import LetterReveal from "../components/LetterReveal";
import PortraitZoom from "../components/PortraitZoom";
import Reveal from "../components/Reveal";
import ScrollText from "../components/ScrollText";
import Showcase from "../components/Showcase";
import StackCards from "../components/StackCards";
import { currentWork } from "../data/experiences";
import { projects } from "../data/projects";
import { SITE } from "../data/siteConfig";
import { EASE } from "../lib/motion";
import usePageTitle from "../lib/usePageTitle";

const STATS = [
  { value: 15, suffix: "+", label: "services shipping through automated CI/CD" },
  { value: 3, label: "cloud environments provisioned with Terraform" },
  { value: 60, suffix: "%", label: "faster page loads after a React migration" },
  { value: 30, suffix: "+", label: "active users on QuickAI, my AI SaaS platform" },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: EASE, delay },
});

function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const pointerX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const orb = useMotionTemplate`radial-gradient(420px circle at ${pointerX}px ${pointerY}px, rgba(120, 110, 255, 0.2), transparent 70%)`;

  const onPointerMove = (e) => {
    pointerX.set(e.clientX);
    pointerY.set(e.clientY);
  };

  return (
    <section ref={ref} className="hero" onPointerMove={onPointerMove}>
      <div className="hero-pin">
        <motion.div className="hero-glow" aria-hidden="true" style={reduced ? undefined : { opacity }} />
        <motion.div className="hero-orb" aria-hidden="true" style={{ background: orb }} />
        <motion.div className="edge-wrap" aria-hidden="true" style={reduced ? undefined : { opacity }}>
          <div className="edge-fade">
            <div className="edge-glow" />
          </div>
        </motion.div>
        <motion.div className="container hero-copy" style={reduced ? undefined : { scale, opacity }}>
          <motion.p className="eyebrow" {...rise(0.1)}>
            {SITE.role} at {SITE.company}
          </motion.p>
          <LetterReveal text={SITE.name} delay={0.2} />
          <motion.p className="hero-lead" {...rise(0.9)}>
            I build the access control, backend services and cloud infrastructure that products depend on.
          </motion.p>
          <motion.div className="actions" {...rise(1.05)}>
            <Magnetic>
              <Link to="/projects" className="btn btn-primary">
                View my work
              </Link>
            </Magnetic>
            <a href={SITE.resume} target="_blank" rel="noreferrer" className="btn-text">
              Resume <FiArrowDown />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle();

  return (
    <>
      <Hero />

      <PortraitZoom>From Assam, shipping to production.</PortraitZoom>

      <section className="section">
        <div className="container">
          <ScrollText text="Most of my work is the part of a product people never see: who can access what, what gets recorded, and how code reaches production safely." />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Now at {SITE.company}</p>
            <h2>What I'm building.</h2>
          </Reveal>
          <StackCards items={currentWork} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Impact</p>
            <h2>By the numbers.</h2>
          </Reveal>
          <div className="stat-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} className="stat spot" delay={i * 0.08}>
                <p className="stat-value">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head-row">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Things I've built.</h2>
            </div>
            <Link to="/projects" className="btn-text">
              All projects <FiArrowRight />
            </Link>
          </Reveal>
          {projects.map((p) => (
            <Showcase key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="section closing">
        <Reveal className="container">
          <h2 className="shine">Let's talk.</h2>
          <p className="page-lead">Have a project, a question, or an idea worth building? I'd like to hear about it.</p>
          <div className="actions">
            <Magnetic strength={0.35}>
              <Link to="/contact" className="btn btn-primary btn-glow">
                Get in touch
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
