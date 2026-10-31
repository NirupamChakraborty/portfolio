import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Device } from "../components/Showcase";
import Reveal from "../components/Reveal";
import { getProjectBySlug, projects } from "../data/projects";
import { EASE } from "../lib/motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="container page">
      <Link to="/projects" className="btn-text back-link">
        <FiArrowLeft /> All projects
      </Link>

      <motion.header
        className="detail-head"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <p className="eyebrow">{project.tags.join(" · ")}</p>
        <h1>{project.title}</h1>
      </motion.header>

      <motion.div
        className="detail-device"
        style={{ "--hue": project.hue }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
      >
        <Device project={project} />
      </motion.div>

      <div className="detail-grid">
        <Reveal>
          {project.metric && (
            <p className="metric detail-metric">
              <strong>{project.metric.value}</strong> {project.metric.label}
            </p>
          )}
          <p className="detail-copy">{project.longDesc}</p>
          <div className="actions">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                Visit site <FiArrowUpRight />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-text">
                View code <FiArrowUpRight />
              </a>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="eyebrow">Built with</h2>
          <ul className="detail-stack">
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <nav className="detail-nav" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`}>
          <span>
            <FiArrowLeft /> Previous
          </span>
          {prev.title}
        </Link>
        <Link to={`/projects/${next.slug}`} className="is-next">
          <span>
            Next <FiArrowRight />
          </span>
          {next.title}
        </Link>
      </nav>
    </div>
  );
}
