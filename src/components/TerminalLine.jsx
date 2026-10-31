import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Types a command after a short delay, like a shell session starting up.
export default function TerminalLine({ prompt, command, delay = 400, speed = 38 }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reduced ? command.length : typed;

  useEffect(() => {
    if (reduced) return;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setTyped((n) => {
          if (n >= command.length) clearInterval(timer);
          return Math.min(n + 1, command.length);
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [command, delay, speed, reduced]);

  return (
    <p className="terminal-line">
      <span>{prompt}</span> {command.slice(0, shown)}
      <i aria-hidden="true" />
    </p>
  );
}
