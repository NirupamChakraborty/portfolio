import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import { techLogos } from "../data/techLogos";

export default function Skills() {
  return (
    <section className="section">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tech Stack
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        MY <em>SKILLS</em>
      </motion.h2>
      <div className="skills-inner">
        {skillGroups.map((g, gi) => (
          <motion.div
            key={g.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
          >
            <div className="sg-head">
              <motion.div className="sg-num" whileHover={{ scale: 1.2, color: "var(--accent-2)" }}>
                0{gi + 1}
              </motion.div>
              <div className="sg-title">{g.category}</div>
            </div>
            <div className="skill-chips">
              {g.items.map((s, si) => (
                <motion.div
                  key={s.name}
                  className="s-chip"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.03 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  {techLogos[s.logo] && <img src={techLogos[s.logo]} alt={s.name} />}
                  {s.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
