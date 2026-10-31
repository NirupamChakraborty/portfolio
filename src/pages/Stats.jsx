import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import CountUp from "../components/CountUp";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { GITHUB_USERNAME, SITE } from "../data/siteConfig";
import { EASE } from "../lib/motion";

async function fetchGithubStats() {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
  const user = await userRes.json();
  const repos = await reposRes.json();

  const langCounts = {};
  repos.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });

  return {
    repos: user.public_repos,
    followers: user.followers,
    stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    topLangs: Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
  };
}

export default function Stats() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchGithubStats()
      .then((data) => !cancelled && setState({ status: "ready", data }))
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, []);

  const { status, data } = state;

  return (
    <div className="container page">
      <PageHeader eyebrow="Stats" title="Live from GitHub.">
        Fetched from the GitHub API each time this page loads.
      </PageHeader>

      {status === "loading" && <p className="status-note">Loading live data…</p>}
      {status === "error" && (
        <p className="status-note">
          GitHub's API isn't responding right now.{" "}
          <a href={SITE.github} target="_blank" rel="noreferrer">
            See the profile on GitHub
          </a>
          .
        </p>
      )}

      {status === "ready" && (
        <>
          <div className="stat-grid stat-grid-3">
            {[
              { value: data.repos, label: "Public repositories" },
              { value: data.stars, label: "Stars earned" },
              { value: data.followers, label: "Followers" },
            ].map((s, i) => (
              <Reveal key={s.label} className="stat spot" delay={i * 0.08}>
                <p className="stat-value">
                  <CountUp value={s.value} />
                </p>
                <p className="stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="panel spot">
            <h2 className="eyebrow">Most-used languages</h2>
            <ul className="bars">
              {data.topLangs.map(([lang, count]) => (
                <li key={lang}>
                  <span>{lang}</span>
                  <div className="bar-track">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: count / data.topLangs[0][1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: EASE }}
                    />
                  </div>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      )}

      <Reveal className="panel spot">
        <h2 className="eyebrow">Contributions</h2>
        <div className="chart-scroll">
          <img
            src={`https://ghchart.rshah.org/2997ff/${GITHUB_USERNAME}`}
            alt="GitHub contribution graph for the past year"
            loading="lazy"
          />
        </div>
      </Reveal>

      <a href={SITE.github} target="_blank" rel="noreferrer" className="btn-text">
        @{GITHUB_USERNAME} on GitHub <FiArrowUpRight />
      </a>
    </div>
  );
}
