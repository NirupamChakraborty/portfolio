import { motion } from "framer-motion";

const CARDS = [
  {
    num: "B.Tech",
    label: "Degree",
    text: (
      <>
        <strong>Computer Science &amp; Engineering</strong>
        <br />
        Jorhat Engineering College · CGPA 7.55
        <br />
        2022 – 2026
      </>
    ),
  },
  { num: "3", label: "Internships", text: <>IOCL · GrowthLink Solutions · Jorhat Engineering College</> },
  { num: "7+", label: "Projects Shipped", text: <>AI SaaS · Blockchain Health-tech · Real-time Video · Full-stack Web</> },
  { num: "📍", label: "Location", text: <><strong>Digboi, Assam</strong> · Open to remote &amp; relocation</> },
];

export default function About() {
  return (
    <section className="section">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        WHO I <em>AM</em>
      </motion.h2>
      <div className="about-inner">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="about-big">
            Hello — I'm a final-year <strong>Computer Science</strong> undergrad at Jorhat Engineering College. I
            build products that sit at the <span className="highlight">sweet spot of design, code, and AI</span>.
            <br />
            <br />
            I care deeply about interfaces that <strong>feel great</strong>, backed by systems that{" "}
            <strong>scale reliably</strong>. I've shipped real products across cybersecurity, SaaS, and developer
            tooling. When I'm not coding, I'm reading about <strong>GenAI</strong> or brewing tea.
          </p>
        </motion.div>
        <div className="about-cards" style={{ perspective: 1200 }}>
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              className="ac"
              initial={{ opacity: 0, y: -140, rotateX: -70 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 11, delay: i * 0.12 }}
              whileHover={{ y: -10, rotateX: 4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="ac-num">{c.num}</div>
              <div className="ac-label">{c.label}</div>
              <div className="ac-text">{c.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
