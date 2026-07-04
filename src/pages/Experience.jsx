import { motion } from "framer-motion";
import { experiences } from "../data/experiences";

export default function Experience() {
  return (
    <section className="section">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Work Experience
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        WHERE I'VE <em>WORKED</em>
      </motion.h2>
      <div className="exp-list" style={{ perspective: 1200 }}>
        {experiences.map((e, i) => (
          <motion.div
            key={i}
            className="exp-item"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: -60, rotateY: 35 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 85, damping: 14, delay: i * 0.12 }}
            whileHover={{ x: 5 }}
          >
            <div className="exp-num">{e.num}</div>
            <div className="exp-body">
              <div className="exp-role">{e.role}</div>
              <div className="exp-company">{e.company}</div>
              <div className="exp-desc">{e.desc}</div>
              <div className="exp-tags">
                {e.tags.map((t) => (
                  <motion.span key={t} className="exp-tag" whileHover={{ scale: 1.05 }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="exp-period">{e.period}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
