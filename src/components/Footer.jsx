import { Link } from "react-router-dom";
import Emblem from "./Emblem";
import { SITE, navItems } from "../data/siteConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="checker" aria-hidden="true" />
      <div className="container footer-inner">
        <Emblem size={26} />
        <nav className="footer-links" aria-label="Footer">
          {navItems.map((n) => (
            <Link key={n.path} to={n.path}>
              {n.label}
            </Link>
          ))}
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE.name} <span className="footer-status">● engine running</span>
        </p>
      </div>
    </footer>
  );
}
