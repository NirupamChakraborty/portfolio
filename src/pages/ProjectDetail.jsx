import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { getProjectBySlug, projects } from "../data/projects";
import { techLogos } from "../data/techLogos";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <section className="section proj-detail">
      <Link to="/projects" className="proj-back">
        <FiArrowLeft /> All Projects
      </Link>

      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Project {project.num}
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {project.title.toUpperCase()}
      </motion.h2>

      <motion.div
        className="proj-detail-img-wrap"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img src={project.image} alt={project.title} className="proj-detail-img" />
      </motion.div>

      <div className="proj-detail-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="proj-detail-desc">{project.longDesc || project.desc}</p>

          <div className="proj-links proj-detail-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline">
                <FiGithub /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-orange">
                <FiExternalLink /> Live Site
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="proj-detail-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ac-label">Tech Stack</div>
          <div className="proj-tags-row" style={{ marginTop: ".75rem" }}>
            {(project.stack || project.tags).map((t) => (
              <span key={t} className="p-tag">
                {t}
              </span>
            ))}
          </div>
          {project.logos?.length > 0 && (
            <div className="proj-logos" style={{ marginTop: "1.25rem" }}>
              {project.logos.map((l) => (techLogos[l] ? <img key={l} src={techLogos[l]} alt={l} title={l} /> : null))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="proj-detail-nav">
        <Link to={`/projects/${prev.slug}`} className="proj-detail-nav-link">
          <span className="pdn-label">← Previous</span>
          <span className="pdn-title">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="proj-detail-nav-link align-right">
          <span className="pdn-label">Next →</span>
          <span className="pdn-title">{next.title}</span>
        </Link>
      </div>
    </section>
  );
}
