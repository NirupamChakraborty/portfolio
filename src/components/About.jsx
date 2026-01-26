import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Wrench } from "lucide-react";

const cards = [
  {
    title: "Education",
    icon: GraduationCap,
    content: (
    <div>
      <div>
        <p className="font-medium">
          B.Tech in Computer Science
        </p>
        <p className="text-sm text-white/60 mt-1">
          Jorhat Engineering College (2022 – 2026)
        </p>
      </div>
      <div>
      <p className="font-medium">
        Class XII - Stream Science
      </p>
      <p className="text-sm text-white/60 mt-1">
        The Little Stars Sr. Sec. School (2019 – 2021)
      </p>
     
    </div>
    </div>
    ),
  },
  {
    title: "What I Love Building",
    icon: Sparkles,
    content: (
      <>
        <p className="text-sm text-white/60">
          I enjoy creating products that combine
          <span className="text-white"> clean UI</span>,
          <span className="text-white"> motion</span>, and
          <span className="text-white"> scalable backend systems</span>.
        </p>
        <p className="text-sm text-white/50 mt-3">
          Especially interested in GenAI, developer tools, and SaaS-style apps.
        </p>
      </>
    ),
  },
  {
    title: "Tools & Mindset",
    icon: Wrench,
    content: (
      <>
        <p className="text-sm text-white/60">
          React, Node.js, MongoDB, AWS, Docker, Tailwind, Git.
        </p>
        <p className="text-sm text-white/50 mt-3">
          I think in components, APIs, edge cases, and long-term maintainability.
        </p>
      </>
    ),
  },
];

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      
    >
      <h2 className="text-3xl font-semibold mb-10">About Me   <a
  href="/resume2026.pdf"
  target="_blank"
//   download
  className="
    inline-flex items-center gap-2
    mt-6
    px-6 py-3
    rounded-xl
    bg-white/10 backdrop-blur-md
    text-sm font-medium
    hover:scale-105
    transition
  "
>
  <span className="text-lg"> Download Resume</span>
</a>
</h2>

<p className="mt-6 text-white/60 ">
Hello, I'm Nirupam a final year Computer Science Undergrad at Jorhat Engineering College. I love to build web applications, solve problems, learn about cloud services etc. My interests involve full-stack web development, Generative AI, and cloud computing. I'm passionate about creating clean, user-friendly interfaces and elegant backend solutions. I enjoy exploring new technologies and occasionally sipping tea instead of coffee.
</p>
      
<br /><br />      

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative p-6 rounded-3xl
                bg-white/10 backdrop-blur-xl
                border border-white/10
                shadow-xl glass-card"
            >
              {/* subtle glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{card.title}</h3>
                </div>

                {card.content}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
