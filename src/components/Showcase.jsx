import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const TILT = { stiffness: 140, damping: 18 };

export function Device({ project, priority = false }) {
  return (
    <div className="device" style={{ viewTransitionName: `device-${project.slug}` }}>
      <div className="device-screen">
        <img
          src={project.shot}
          alt={`${project.title} website`}
          width="1800"
          height="1125"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
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

  // A second, pointer-driven layer of tilt on top of the scroll-driven one.
  const tiltX = useSpring(useMotionValue(0), TILT);
  const tiltY = useSpring(useMotionValue(0), TILT);

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - box.left) / box.width - 0.5) * 7);
    tiltX.set(((e.clientY - box.top) / box.height - 0.5) * -5);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <article className="showcase">
      <div ref={ref} className="showcase-stage">
        <motion.div className="showcase-bloom" aria-hidden="true" style={reduced ? undefined : { opacity: bloom }} />
        <motion.div className="showcase-device" style={reduced ? undefined : { rotateX, scale }}>
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            <Link to={`/projects/${project.slug}`} viewTransition aria-label={`Read about ${project.title}`}>
              <Device project={project} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="showcase-copy">
        <div>
          <p className="eyebrow">{project.tags.slice(0, 3).join(" · ")}</p>
          <h3>{project.title}</h3>
          <p className="showcase-desc">{project.desc}</p>
          <ul className="spec-tags">
            {project.stack.slice(0, 5).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Link to={`/projects/${project.slug}`} viewTransition className="btn-text">
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
