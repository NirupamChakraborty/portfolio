import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [showGlow, setShowGlow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!showGlow) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [showGlow]);

  return (
    <motion.section
      id="hero"
      onMouseEnter={() => window.innerWidth > 768 && setShowGlow(true)}
      onMouseLeave={() => setShowGlow(false)}
      className="relative grid md:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow cursor */}
      {showGlow && (
        <div
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
          style={{
            transform: `translate(${pos.x - 150}px, ${pos.y - 150}px)`,
          }}
        >
          <div
            className="
              w-[300px] h-[300px]
              rounded-full
              bg-white/25
              blur-3xl
            "
          />
        </div>
      )}

      {/* Text */}
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Hi I'm Nirupam.<br/> I build beautiful web apps that solves real world problems.
        </h1>
        <p className="mt-6 text-white/60 max-w-xl">
        I'm a 4th-year Computer Science student focused on full-stack web development, GenAi and cloud tools. I love clean UI and elegant solutions. <br /> Funfact: Sometimes I prefer Tea over Coffee.
        </p>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        {/* <div className="w-72 h-72 rounded-3xl glass-card" /> */}
        <div className="w-72 h-72 rounded-3xl glass-card overflow-hidden">
             <img src="/profile.jpeg" alt="Nirupam Chakraborty" className="w-full h-full object-cover"/>
        </div>

      </div>
    </motion.section>
  );
}
