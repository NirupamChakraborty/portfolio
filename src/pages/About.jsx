import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { SITE } from "../data/siteConfig";

const EDUCATION = [
  {
    title: "B.Tech, Computer Science and Engineering",
    place: "Jorhat Engineering College",
    meta: "CGPA 7.70 · Oct 2022 – June 2026",
  },
  {
    title: "Class XII, Science (PCM)",
    place: "The Little Stars Sr. Sec. School, Digboi",
    meta: "92.8% · Apr 2019 – May 2021",
  },
];

const CERTIFICATIONS = [
  { title: "Cloud Computing with AWS", place: "Internshala" },
  { title: "Git and GitHub", place: "Internshala" },
  { title: "PwC Cyber Risk & Regulatory Launchpad", place: "PwC" },
];

function List({ label, items }) {
  return (
    <Reveal className="about-list">
      <h2 className="eyebrow">{label}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.place}</p>
            {item.meta && <p>{item.meta}</p>}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div className="container page">
      <PageHeader eyebrow="About" title="Backend developer, from Assam.">
        I'm a backend software developer at {SITE.company}, and a 2026 Computer Science graduate of Jorhat
        Engineering College.
      </PageHeader>

      <Reveal className="portrait" y={40}>
        <div ref={ref} className="portrait-frame">
          <motion.img
            src="/profile.jpeg"
            alt="Nirupam Chakraborty in a white shirt, leaning on a motorcycle on a misty street at night"
            style={reduced ? undefined : { y }}
          />
        </div>
      </Reveal>

      <div className="about-body">
        <Reveal>
          <p>
            I work across the Python backend and the cloud underneath it: permission systems, audit trails, delivery
            pipelines and infrastructure as code.
          </p>
          <p>
            Before that I shipped web and AI products, from a cybersecurity tool at Indian Oil to a React migration at
            GrowthLink Solutions and QuickAI, an AI SaaS platform of my own.
          </p>
          <p>
            At college I was Technical Coordinator at NEEV-JEC, where I led technical event planning and execution.
          </p>
        </Reveal>
      </div>

      <div className="about-columns">
        <List label="Education" items={EDUCATION} />
        <List label="Certifications" items={CERTIFICATIONS} />
      </div>
    </div>
  );
}
