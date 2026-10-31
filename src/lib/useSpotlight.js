import { useEffect } from "react";

// Tracks the pointer over any `.spot` element so its CSS glow can follow it.
export default function useSpotlight() {
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target.closest?.(".spot");
      if (!el) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - box.left}px`);
      el.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}
