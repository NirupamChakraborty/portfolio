import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiCode, FiZap, FiMail } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const ITEMS = [
  { path: "/", Icon: FiHome, l: "Home", end: true },
  { path: "/about", Icon: FiUser, l: "About" },
  { path: "/projects", Icon: FiCode, l: "Work" },
  { path: "/skills", Icon: FiZap, l: "Skills" },
  { path: "/contact", Icon: FiMail, l: "Contact" },
];

export default function MobileDock({ theme, onToggleTheme }) {
  return (
    <motion.div
      className="mob-dock"
      initial={{ x: "-50%", y: 100 }}
      animate={{ x: "-50%", y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) => `mob-dock-item${isActive ? " active" : ""}`}
        >
          <item.Icon className="dock-icon" />
          {item.l}
        </NavLink>
      ))}
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </motion.div>
  );
}
