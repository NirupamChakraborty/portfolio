import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../data/siteConfig";
import { EASE, SPRING } from "../lib/motion";
import Emblem from "./Emblem";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled || open ? " is-solid" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={close}>
          <Emblem />
          <span className="sr-only">Nirupam Chakraborty, home</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((n, i) => (
            <NavLink key={n.path} to={n.path} className="nav-link">
              {({ isActive }) => (
                <>
                  {isActive && <motion.span className="nav-pill" layoutId="nav-pill" transition={SPRING} />}
                  <span className="nav-label">
                    <b>{i + 1}</b> {n.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="palette-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <kbd>⌘K</kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className={`menu-btn${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu-sheet"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {navItems.map((n, i) => (
              <motion.div
                key={n.path}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.04 + i * 0.04 }}
              >
                <NavLink to={n.path} className="menu-link" onClick={close}>
                  <b>{i + 1}</b> {n.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
