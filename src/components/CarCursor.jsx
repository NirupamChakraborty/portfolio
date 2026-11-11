import { useEffect, useRef, useState } from "react";

const FOLLOW = 0.11;
const GAP = 30;
const STEER = 0.18;
const SKID_TURN = 0.09;
const SKID_SPEED = 7;

const canRun = () =>
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

// A tiny car that chases the mouse, steering toward it and leaving tyre
// marks on hard turns. Desktop only; the real cursor is untouched.
export default function CarCursor() {
  const [enabled] = useState(canRun);
  const carRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const car = carRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let target = null;
    let x = 0;
    let y = 0;
    let heading = 0;
    let lastSkid = -Infinity;
    let frame;

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    const onMove = (e) => {
      if (!target) {
        x = e.clientX - GAP;
        y = e.clientY + GAP;
        car.style.opacity = "1";
      }
      target = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      target = null;
      car.style.opacity = "0";
    };

    const mark = (px, py) => {
      ctx.fillStyle = document.documentElement.dataset.theme === "dark" ? "rgba(236,233,226,0.16)" : "rgba(20,20,20,0.16)";
      ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
    };

    const tick = (time) => {
      frame = requestAnimationFrame(tick);
      if (time - lastSkid < 4000) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.035)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
      }
      if (!target) return;
      // Hold a gap from the pointer, backing off if it gets too close, so the
      // car never covers what is being clicked.
      const dx = target.x - x;
      const dy = target.y - y;
      const pull = (1 - GAP / Math.max(Math.hypot(dx, dy), 1)) * FOLLOW;
      const vx = dx * pull;
      const vy = dy * pull;
      const speed = Math.hypot(vx, vy);
      x += vx;
      y += vy;
      if (speed > 0.6) {
        let turn = Math.atan2(vy, vx) - heading;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn)) * STEER;
        heading += turn;
        if (Math.abs(turn) > SKID_TURN && speed > SKID_SPEED) {
          lastSkid = time;
          const cos = Math.cos(heading);
          const sin = Math.sin(heading);
          for (const side of [-5, 5]) mark(x - cos * 9 - sin * side, y - sin * 9 + cos * side);
        }
      }
      car.style.transform = `translate(${x - 14}px, ${y - 8}px) rotate(${heading}rad)`;
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <canvas ref={canvasRef} className="skid-canvas" aria-hidden="true" />
      <div ref={carRef} className="car-cursor" aria-hidden="true">
        <svg viewBox="0 0 28 16">
          <rect x="1" y="1" width="3" height="14" rx="1" fill="#111" />
          <rect x="3" y="2" width="22" height="12" rx="5" fill="#e10600" />
          <path d="M14 4h5l3 4-3 4h-5z" fill="#0b0b0c" />
          <rect x="6" y="5.5" width="6" height="5" rx="1.5" fill="#0b0b0c" />
          <rect x="24" y="3.5" width="2" height="3" rx="1" fill="#f2f7ff" />
          <rect x="24" y="9.5" width="2" height="3" rx="1" fill="#f2f7ff" />
        </svg>
      </div>
    </>
  );
}
