import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import CarDrive from "../components/CarDrive";
import CountUp from "../components/CountUp";
import DreamGarage from "../components/DreamGarage";
import Headlights from "../components/Headlights";
import LetterReveal from "../components/LetterReveal";
import LightBar from "../components/LightBar";
import Magnetic from "../components/Magnetic";
import PortraitZoom from "../components/PortraitZoom";
import Reveal from "../components/Reveal";
import ScrollText from "../components/ScrollText";
import Showcase from "../components/Showcase";
import StackCards from "../components/StackCards";
import Tachometer from "../components/Tachometer";
import TerminalLine from "../components/TerminalLine";
import { currentWork } from "../data/experiences";
import { projects } from "../data/projects";
import { SITE } from "../data/siteConfig";
import { EASE } from "../lib/motion";
import usePageTitle from "../lib/usePageTitle";

const FIGURES = [
  { value: 15, suffix: "+", unit: "services", label: "Shipping through automated CI/CD" },
  { value: 3, unit: "environments", label: "Provisioned with Terraform" },
  { value: 60, suffix: "%", unit: "faster", label: "Page loads after a React migration" },
  { value: 30, suffix: "+", unit: "users", label: "Active on QuickAI, my AI SaaS" },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="hero">
      <div className="hero-pin">
        <motion.div className="container hero-grid" style={reduced ? undefined : { scale, opacity }}>
          <div className="hero-copy">
            <TerminalLine prompt="nirupam@riskgrid:~$" command="./ignition --mode=sport" delay={300} />
            <LetterReveal text={SITE.name} delay={0.9} />
            <motion.p className="hero-lead" {...rise(1.5)}>
              {SITE.role} at {SITE.company}. I engineer access control, backend services and cloud infrastructure, built
              to hold up at full throttle.
            </motion.p>
            <motion.div className="actions" {...rise(1.65)}>
              <Magnetic>
                <Link to="/projects" className="btn btn-primary">
                  View the garage
                </Link>
              </Magnetic>
              <a href={SITE.resume} target="_blank" rel="noreferrer" className="btn-text">
                Resume <FiArrowDown />
              </a>
            </motion.div>
          </div>
          <motion.div {...rise(0.3)}>
            <Tachometer progress={scrollYProgress} />
          </motion.div>
        </motion.div>
        <LightBar />
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle();

  return (
    <>
      <Hero />

      <Headlights>Lights on. Eyes on the road.</Headlights>

      <PortraitZoom>Off the clock: anything with an engine.</PortraitZoom>

      <section className="section">
        <div className="container">
          <p className="eyebrow">// under the hood</p>
          <ScrollText text="Most of my work is the part of a product people never see: who can access what, what gets recorded, and how code reaches production safely." />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">// now at {SITE.company}</p>
            <h2>The build sheet.</h2>
          </Reveal>
          <StackCards items={currentWork} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">// measured, not claimed</p>
            <h2>Performance figures.</h2>
          </Reveal>
          <div className="figures">
            {FIGURES.map((f, i) => (
              <Reveal key={f.label} className="figure spot" delay={i * 0.08}>
                <p className="stat-value">
                  <CountUp value={f.value} suffix={f.suffix} />
                  <small>{f.unit}</small>
                </p>
                <p className="stat-label">{f.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DreamGarage />

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head-row">
            <div>
              <p className="eyebrow">// the garage</p>
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
        <CarDrive />
        <Reveal className="container">
          <p className="eyebrow">// pit lane open</p>
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
