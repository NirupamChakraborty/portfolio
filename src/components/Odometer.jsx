import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

const STRIP = Array.from({ length: 20 }, (_, i) => i % 10);

// Mechanical odometer: each digit rolls a full turn, then settles on its value.
export default function Odometer({ value, suffix = "" }) {
  const digits = String(value).split("").map(Number);
  return (
    <span className="odo" aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} className="odo-col" aria-hidden="true">
          <motion.span
            className="odo-strip"
            initial={{ y: "0%" }}
            whileInView={{ y: `${-(10 + d) * 5}%` }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.5 + (digits.length - i) * 0.3, ease: EASE }}
          >
            {STRIP.map((n, k) => (
              <span key={k}>{n}</span>
            ))}
          </motion.span>
        </span>
      ))}
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
