import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      cursorRef.current.style.left = e.clientX + "px";
      cursorRef.current.style.top = e.clientY + "px";
      ringRef.current.style.left = e.clientX + "px";
      ringRef.current.style.top = e.clientY + "px";
    };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className={`cursor-ring ${hovered ? "hovered" : ""}`} ref={ringRef} />
    </>
  );
}