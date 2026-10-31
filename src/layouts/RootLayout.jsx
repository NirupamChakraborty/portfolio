import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import CommandPalette from "../components/CommandPalette";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Road from "../components/Road";
import ScrollProgress from "../components/ScrollProgress";
import ScrollToTop from "../components/ScrollToTop";
import StartGate from "../components/StartGate";
import Telemetry from "../components/Telemetry";
import PageTransition from "../components/PageTransition";
import { shouldShowGate } from "../lib/startGate";
import useSpotlight from "../lib/useSpotlight";

export default function RootLayout() {
  // index.html has already resolved the saved or system theme before first paint.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();
  const [started, setStarted] = useState(() => !shouldShowGate(location.pathname));
  const onStarted = useCallback(() => setStarted(true), []);
  useSpotlight();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
    if (!document.startViewTransition) return setTheme(next);
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggleTheme} />
      <Telemetry />
      <AnimatePresence>{!started && <StartGate onDone={onStarted} />}</AnimatePresence>
      <Road />
      {started && (
        <>
          <main id="main">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
