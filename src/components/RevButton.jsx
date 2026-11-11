import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Hold to rev: the needle climbs and the hero shakes, and hitting the
// limiter launches the page forward with nitrous.
export default function RevButton({ throttle }) {
  const ramp = useRef(null);
  const held = useRef(false);
  const [state, setState] = useState("idle");

  const release = () => {
    if (!held.current) return;
    held.current = false;
    ramp.current?.stop();
    document.documentElement.classList.remove("is-revving");
    ramp.current = animate(throttle, 0, { duration: 0.7, ease: "easeOut" });
    setState("idle");
  };

  const launch = () => {
    setState("launch");
    ramp.current = animate(throttle, [1, 0.88, 1, 0.88, 1], {
      duration: 0.45,
      onComplete: () => {
        window.dispatchEvent(new Event("nitrous"));
        release();
      },
    });
  };

  const press = () => {
    if (held.current) return;
    held.current = true;
    document.documentElement.classList.add("is-revving");
    setState("revving");
    ramp.current?.stop();
    ramp.current = animate(throttle, 1, {
      duration: 1.6,
      ease: [0.5, 0, 0.9, 0.6],
      onComplete: launch,
    });
  };

  useEffect(
    () => () => {
      ramp.current?.stop();
      document.documentElement.classList.remove("is-revving");
    },
    [],
  );

  return (
    <button
      type="button"
      className={`rev-btn is-${state}`}
      onPointerDown={(e) => {
        e.preventDefault();
        press();
      }}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          press();
        }
      }}
      onKeyUp={(e) => (e.key === " " || e.key === "Enter") && release()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <span className="rev-btn-dot" aria-hidden="true" />
      {state === "launch" ? "Launch!" : state === "revving" ? "Revving…" : "Hold to rev"}
    </button>
  );
}
