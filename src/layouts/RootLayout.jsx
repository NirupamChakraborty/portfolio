import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ScrollToTop from "../components/ScrollToTop";
import PageTransition from "../components/PageTransition";
import useSpotlight from "../lib/useSpotlight";

export default function RootLayout() {
  // index.html has already resolved the saved or system theme before first paint.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const location = useLocation();
  useSpotlight();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
    if (!document.startViewTransition) return setTheme(next);
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </MotionConfig>
  );
}
