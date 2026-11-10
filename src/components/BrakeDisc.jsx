import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const HOLES = Array.from({ length: 36 }, (_, i) => {
  const radius = i % 2 ? 78 : 62;
  const angle = (i * 10 * Math.PI) / 180;
  return [100 + radius * Math.cos(angle), 100 + radius * Math.sin(angle)];
});

// A drilled brake disc that turns with the page and glows hot under hard scrolling.
export default function BrakeDisc() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (y) => y * 0.35);
  const heat = useSpring(
    useTransform(useVelocity(scrollY), (v) => Math.min(1, Math.abs(v) / 2600)),
    { stiffness: 40, damping: 18 },
  );

  return (
    <svg className="disc" viewBox="0 0 200 200" aria-hidden="true">
      <motion.circle cx="100" cy="100" r="90" className="disc-heat" style={{ opacity: heat }} />
      <motion.g style={{ rotate }}>
        <circle cx="100" cy="100" r="90" className="disc-rotor" />
        {HOLES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" className="disc-hole" />
        ))}
        <circle cx="100" cy="100" r="40" className="disc-hat" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx="100" cy="76" r="4.5" className="disc-hole" transform={`rotate(${a} 100 100)`} />
        ))}
      </motion.g>
      <path d="M181.4 49.1A96 96 0 0 1 181.4 150.9L147.5 129.7A56 56 0 0 0 147.5 70.3Z" className="disc-caliper" />
    </svg>
  );
}
