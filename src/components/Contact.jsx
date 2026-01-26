import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1.03 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          mass: 0.6,
        }}
        className="glass-card p-8 md:p-10 max-w-xl w-full text-center"
      >
        <h3 className="text-3xl font-semibold mb-4">
          Contact
        </h3>

        <p className="text-white/60 mb-8">
          Want to work together or build something cool?
          Feel free to reach out.
        </p>

        {/* Contact details */}
        <div className="space-y-5 text-sm">
          <div className="flex items-center justify-center gap-3">
            <Mail size={18} />
            <a
              href="mailto:nirupamchakraborty04@gmail.com"
              className="underline hover:text-white transition"
            >
              nirupamchakraborty04@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Linkedin size={18} />
            <a
              href="https://www.linkedin.com/in/nirupam-chakraborty-01a55b254/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white transition"
            >
              Nirupam Chakraborty
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 text-white/70">
            <MapPin size={18} />
            <span>Digboi, India</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="mailto:nirupamchakraborty04@gmail.com"
            className="
              inline-block px-6 py-3 rounded-xl
              bg-white/20 border border-white/30
              hover:bg-white/30 transition
              font-medium
            "
          >
            Say Hello 👋
          </a>
        </div>
      </motion.div>
    </section>
  );
}
