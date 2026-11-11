import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { experiences } from "../data/experiences";
import { EASE } from "../lib/motion";

// Career as an F1 timing tower: current role leads, earlier stints follow.
export default function TimingTower() {
  return (
    <div className="tower">
      <div className="tower-head" aria-hidden="true">
        <span>Pos</span>
        <span>Team</span>
        <span>Status</span>
      </div>
      <ol>
        {experiences.map((e, i) => (
          <motion.li
            key={e.company}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
          >
            <Link to="/experience" className="tower-row" style={{ "--team": e.color }}>
              <span className="tower-pos">{i + 1}</span>
              <span className="tower-code">{e.code}</span>
              <span className="tower-name">
                <strong>{e.company}</strong>
                <small>{e.role}</small>
              </span>
              <span className={`tower-status${e.current ? " is-live" : ""}`}>
                {e.current ? "On track" : "Finished"}
                <small>{e.period}</small>
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
