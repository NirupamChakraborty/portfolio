import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SITE, navItems } from "../data/siteConfig";
import { projects } from "../data/projects";
import { EASE } from "../lib/motion";

export default function CommandPalette({ open, onClose, onToggleTheme }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo(
    () => [
      { label: "Home", hint: "cd ~", run: () => navigate("/") },
      ...navItems.map((n) => ({ label: n.label, hint: `cd ${n.path}`, run: () => navigate(n.path) })),
      ...projects.map((p) => ({ label: p.title, hint: "project", run: () => navigate(`/projects/${p.slug}`) })),
      { label: "Open resume", hint: "pdf", run: () => window.open(SITE.resume, "_blank") },
      { label: "Send an email", hint: "mail", run: () => (window.location.href = `mailto:${SITE.email}`) },
      { label: "GitHub", hint: "link", run: () => window.open(SITE.github, "_blank") },
      { label: "LinkedIn", hint: "link", run: () => window.open(SITE.linkedin, "_blank") },
      { label: "Switch theme", hint: "toggle", run: onToggleTheme },
    ],
    [navigate, onToggleTheme],
  );

  const results = commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setQuery("");
    setActive(0);
    onClose();
  };

  const select = (command) => {
    close();
    command.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Enter" && results[active]) select(results[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input">
              <span>$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or page"
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <ul>
              {results.map((c, i) => (
                <li key={c.label}>
                  <button
                    type="button"
                    className={i === active ? "is-active" : ""}
                    onPointerMove={() => setActive(i)}
                    onClick={() => select(c)}
                  >
                    {c.label}
                    <span>{c.hint}</span>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className="palette-empty">command not found: {query}</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
