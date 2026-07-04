import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { navItems } from "../data/siteConfig";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, x: "-50%", y: -50 }}
      animate={{ opacity: 1, x: "-50%", y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="nav-logo">
        NIRUPAM<span>.</span>
      </Link>

      <div className="nav-links">
        {navItems.map((n) => (
          <NavLink
            key={n.path}
            to={n.path}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {n.label}
          </NavLink>
        ))}
      </div>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </motion.nav>
  );
}
