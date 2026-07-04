import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { GithubStatsCard, LeetcodeStatsCard } from "../components/StatsCards";

export default function Stats() {
  const { theme } = useOutletContext();

  return (
    <section className="section">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Live Stats
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        NUMBERS IN <em>REAL TIME</em>
      </motion.h2>
      <div className="stats-inner">
        <GithubStatsCard theme={theme} />
        <LeetcodeStatsCard theme={theme} />
      </div>
      <p className="stats-note">
        Pulled live from the GitHub REST API and a public LeetCode stats API on every page load — not hardcoded.
      </p>
    </section>
  );
}
