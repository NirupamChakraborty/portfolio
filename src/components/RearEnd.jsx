import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

const FINS = [320, 380, 440, 560, 620, 680];
const PIPES = [
  [484, 256],
  [516, 256],
  [484, 288],
  [516, 288],
];

// The view everyone else gets: wing, light blade, diffuser and four pipes.
export default function RearEnd() {
  return (
    <svg className="rear" viewBox="0 0 1000 380" role="img" aria-label="Rear of a hypercar with a full-width tail light">
      <rect x="58" y="262" width="96" height="104" rx="14" className="rear-tyre" />
      <rect x="846" y="262" width="96" height="104" rx="14" className="rear-tyre" />
      <path d="M400 96 422 150M600 96 578 150" className="rear-strut" />
      <path d="M150 68H850L882 98H118Z" className="rear-wing" />
      <path d="M112 54H148L162 132H128ZM888 54H852L838 132H872Z" className="rear-plate" />
      <path d="M90 250Q110 150 300 140H700Q890 150 910 250L932 302H68Z" className="rear-body" />
      <path d="M380 162H620M400 180H600M420 198H580" className="rear-louvre" />
      <motion.path
        d="M170 264 120 232 300 214H700L880 232 830 264"
        className="rear-blade"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <path d="M200 302 262 358H738L800 302Z" className="rear-diffuser" />
      {FINS.map((x) => (
        <path key={x} d={`M${x} 304V356`} className="rear-fin" />
      ))}
      <circle cx="500" cy="272" r="42" className="rear-cluster" />
      {PIPES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="12" className="rear-pipe" />
      ))}
    </svg>
  );
}
