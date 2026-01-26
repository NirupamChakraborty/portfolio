import { motion } from "framer-motion";

const projects = [
  { title: "Chat AI", desc: "AI chat app with code generation" },
  { title: "Phishing Detector", desc: "ML-based phishing detection" },
  { title: "VibeStay", desc: "Location review platform" },
];

export default function Projects() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8 ">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl glass-card"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-white/60 mt-2">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
