import { Link } from "react-router-dom";
import { SITE, navItems } from "../data/siteConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
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
          © {new Date().getFullYear()} {SITE.name} <span className="footer-status">● all systems nominal</span>
        </p>
      </div>
    </footer>
  );
}
