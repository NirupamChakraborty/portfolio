import { motion, useScroll, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { experiences } from "../data/experiences";

export default function Experience() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });

  return (
    <div className="container page">
      <PageHeader eyebrow="Work" title="Where I've worked." />

      <div ref={ref} className="timeline">
        <div className="timeline-rail" aria-hidden="true">
          <motion.div style={reduced ? undefined : { scaleY: scrollYProgress }} />
        </div>
        {experiences.map((e) => (
          <Reveal key={e.company} className="job">
            <p className="job-period">
              {e.current && <span className="live-dot" aria-hidden="true" />}
              {e.period}
            </p>
            <h2>{e.role}</h2>
            <p className="job-company">
              {e.company} · {e.location}
            </p>
            <ul className="job-points">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ul className="tags">
              {e.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
