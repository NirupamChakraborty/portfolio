import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function StackCard({ item, index, total, progress }) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.025]);

  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="stack-slot" style={{ "--offset": `${index * 12}px` }}>
      <motion.article
        className="stack-card spot"
        data-index={number}
        style={reduced ? undefined : { scale }}
      >
        <p className="eyebrow">
          {number} / {item.label}
        </p>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </motion.article>
    </div>
  );
}

// Cards pin in turn and recede slightly as the next one slides over them.
export default function StackCards({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="stack">
      {items.map((item, i) => (
        <StackCard key={item.title} item={item} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}
