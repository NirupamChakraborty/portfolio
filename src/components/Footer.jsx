import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-logo">
        NIRUPAM<span>.</span>
      </Link>
      <div className="footer-copy">
        © {new Date().getFullYear()} · Built with React &amp; Three.js · Assam, India
      </div>
    </footer>
  );
}
