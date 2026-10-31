import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export function Device({ project }) {
  return (
    <div className="device">
      <div className="device-screen">
        <img src={project.shot} alt={`${project.title} website`} loading="lazy" />
      </div>
      <div className="device-base" aria-hidden="true" />
    </div>
  );
}

// A laptop that lies back, then rises to face the reader as it scrolls in.
export default function Showcase({ project }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const bloom = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <article className="showcase" style={{ "--hue": project.hue }}>
      <div ref={ref} className="showcase-stage">
        <motion.div className="showcase-bloom" aria-hidden="true" style={reduced ? undefined : { opacity: bloom }} />
        <motion.div className="showcase-device" style={reduced ? undefined : { rotateX, scale }}>
          <Link to={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>
            <Device project={project} />
          </Link>
        </motion.div>
      </div>
      <div className="showcase-copy">
        <div>
          <p className="eyebrow">{project.tags.slice(0, 3).join(" · ")}</p>
          <h3>{project.title}</h3>
          <p className="showcase-desc">{project.desc}</p>
          <Link to={`/projects/${project.slug}`} className="btn-text">
            See the project <FiArrowRight />
          </Link>
        </div>
        {project.metric && (
          <p className="metric">
            <strong>{project.metric.value}</strong> {project.metric.label}
          </p>
        )}
      </div>
    </article>
  );
}
