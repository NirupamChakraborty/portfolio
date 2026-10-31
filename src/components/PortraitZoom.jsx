import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// A small framed photo that grows to fill the screen as the reader scrolls.
export default function PortraitZoom({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const closed = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const clipPath = useTransform(
    closed,
    (v) => `inset(calc(${v} * 14svh) calc(${v} * max(20px, 50vw - 230px)) round ${v * 36}px)`,
  );
  // Wide screens start the photo smaller so the small frame shows the whole pose.
  const startScale = window.innerWidth < 720 ? 1 : 0.75;
  const scale = useTransform(scrollYProgress, [0, 0.7], [startScale, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.62, 0.82], [32, 0]);

  return (
    <section ref={ref} className="zoom">
      <div className="zoom-pin">
        <motion.div className="zoom-frame" style={reduced ? undefined : { clipPath }}>
          <motion.img src="/profile.jpeg" alt="" style={reduced ? undefined : { scale }} />
          <div className="zoom-scrim" />
        </motion.div>
        <motion.h2 className="zoom-caption" style={reduced ? undefined : { opacity: captionOpacity, y: captionY }}>
          {children}
        </motion.h2>
      </div>
    </section>
  );
}
