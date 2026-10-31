import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={onToggle}
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
