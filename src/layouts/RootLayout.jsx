import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor";
import Noise from "../components/Noise";
import Navbar from "../components/Navbar";
import MobileDock from "../components/MobileDock";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import PageTransition from "../components/PageTransition";
import Curtain from "../components/Curtain";

export default function RootLayout() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("portfolio-theme") || "dark";
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Curtain />
      <Noise />
      <Cursor />
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-shell">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet context={{ theme, toggleTheme }} />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileDock theme={theme} onToggleTheme={toggleTheme} />
    </>
  );
}
