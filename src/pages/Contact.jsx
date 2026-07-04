import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiMapPin, FiGithub } from "react-icons/fi";
import { GITHUB_USERNAME } from "../data/siteConfig";

const TAGS = ["Full-Stack Dev", "Frontend Dev", "Backend Dev", "GenAI Apps", "SaaS Products", "Remote / Hybrid", "Assam / India"];

const LINKS = [
  { href: "mailto:nirupamchakraborty04@gmail.com", Icon: FiMail, label: "Email", val: "nirupamchakraborty04@gmail.com", link: true },
  { href: "https://www.linkedin.com/in/nirupam-chakraborty-01a55b254/", Icon: FiLinkedin, label: "LinkedIn", val: "Nirupam Chakraborty", link: true },
  { href: `https://github.com/${GITHUB_USERNAME}`, Icon: FiGithub, label: "GitHub", val: `@${GITHUB_USERNAME}`, link: true },
  { Icon: FiMapPin, label: "Location", val: "Digboi, Assam, India", link: false },
];

export default function Contact() {
  return (
    <section className="section">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        LET'S <em>CONNECT</em>
      </motion.h2>
      <div className="contact-inner">
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-big">
            SAY<span>HELLO.</span>
          </div>
          <p className="contact-sub">
            Open to full-time roles, freelance projects, and interesting collaborations. I respond fast — usually
            within a day.
          </p>
          <div className="contact-links" style={{ perspective: 1000 }}>
            {LINKS.map((c, i) => (
              <motion.a
                key={i}
                href={c.link ? c.href : undefined}
                target={c.link && c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.link && c.href.startsWith("http") ? "noreferrer" : undefined}
                className="c-link-row"
                style={{ ...(c.link ? {} : { textDecoration: "none", cursor: "default" }), transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, x: -80, rotateY: -50 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 90, damping: 13, delay: i * 0.1 }}
                whileHover={c.link ? { x: 8 } : {}}
              >
                <div className="c-ico">
                  <c.Icon />
                </div>
                <div className="c-info">
                  <div className="c-label">{c.label}</div>
                  <div className="c-val">{c.val}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="contact-box" whileHover={{ y: -8, boxShadow: "0 30px 80px rgba(139,92,246,0.3)" }}>
            <div className="cb-title">Available for Work</div>
            <div className="cb-sub">Looking for full-time opportunities starting 2026</div>
            <div className="cb-avail">
              <span className="avail-dot" />
              Open to opportunities right now
            </div>
            <div className="cb-tags">
              {TAGS.map((t, i) => (
                <motion.span
                  key={t}
                  className="cb-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <motion.a
                href="mailto:nirupamchakraborty04@gmail.com"
                className="btn-orange"
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Send a Message →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
