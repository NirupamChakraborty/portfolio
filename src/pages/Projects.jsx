import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { techLogos } from "../data/techLogos";
import { getProjectSpans } from "../utils/gridSpans";

export default function Projects() {
  const projSpans = getProjectSpans(projects.length);

  return (
    <section className="section" style={{ maxWidth: "100%", padding: "6rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          THINGS I'VE <em>BUILT</em>
        </motion.h2>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="proj-grid" style={{ perspective: 1400 }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              className="proj-card"
              style={{ gridColumn: `span ${projSpans[i]}`, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: -160, rotateX: -75 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 75, damping: 13, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <Link to={`/projects/${p.slug}`} className="proj-card-link">
                <motion.div className="proj-img-wrap" whileHover={{ scale: 1.05 }}>
                  <img className="proj-img" src={p.image} alt={p.title} loading="lazy" />
                  <div className="proj-img-overlay" />
                  <div className="proj-num-bg">{p.num}</div>
                  {p.featured && (
                    <motion.div
                      className="proj-feat"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 100, delay: i * 0.06 + 0.2 }}
                    >
                      ★ Featured
                    </motion.div>
                  )}
                </motion.div>
                <div className="proj-body">
                  <div className="proj-tags-row">
                    {p.tags.map((t) => (
                      <span key={t} className="p-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                </div>
              </Link>
              <div className="proj-body proj-body-foot">
                <div className="proj-foot">
                  <div className="proj-logos">
                    {p.logos.map((l) =>
                      techLogos[l] ? <img key={l} src={techLogos[l]} alt={l} title={l} /> : null
                    )}
                  </div>
                  <div className="proj-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="p-lnk">
                        GitHub ↗
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="p-lnk">
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
