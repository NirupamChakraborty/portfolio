import { motion } from "framer-motion";
import { Briefcase, Code, Globe } from "lucide-react";

const experiences = [
  {
    title: "Software Developer Intern",
    icon: Code,
    content: (
      <>
        <p className="font-medium">Indian Oil Corporation Limited (IOCL)</p>
        <p className="text-sm text-white/60 mt-1">
          June 2025 – August 2025
        </p>
        <p className="text-sm text-white/50 mt-3">
    Developed a cybersecurity web application to analyze URLs and uploaded files (PDF/TXT) for phishing,
malware, and defacement threats using RESTful APIs and integrated Gemini-1.5-flash genAI model's services to support secure data processing, MySQL-based authentication system to enhance  reliability.
        </p>
      </>
    ),
  },
  {
    title: "Research Intern",
    icon: Briefcase,
    content: (
      <>
        <p className="font-medium">Jorhat Engineering College</p>
        <p className="text-sm text-white/60 mt-1">
          June 2024 – July 2024
        </p>
        <p className="text-sm text-white/50 mt-3">
         Explored python libraries like OpenCV for computer vission techniques to idenfify and solve pothole detection system.
        </p>
      </>
    ),
  },
  {
    title: "Web Developer",
    icon: Globe,
    content: (
      <>
        <p className="font-medium">Growth Link</p>
        <p className="text-sm text-white/60 mt-1">
         Jan 2025 – February 2025
        </p>
        <p className="text-sm text-white/50 mt-3">
          Contributed to multiple open-source projects including UI libraries and developer tools, focused on clean code, documentation, and maintainability.
        </p>
      </>
    ),
  },
];

export default function WorkExperience() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold mb-10">
        Work Experience
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {experiences.map((exp, i) => {
          const Icon = exp.icon;
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
                  <h3 className="font-semibold">{exp.title}</h3>
                </div>

                {exp.content}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
