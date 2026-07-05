import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCode } from "react-icons/fi";
import { GITHUB_USERNAME, LEETCODE_USERNAME } from "../data/siteConfig";
import { techLogos } from "../data/techLogos";

export function GithubStatsCard({ theme }) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
        const user = await userRes.json();
        const repos = await reposRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        const topLangCounts = {};
        if (Array.isArray(repos)) {
          repos.forEach((r) => {
            if (r.language) topLangCounts[r.language] = (topLangCounts[r.language] || 0) + 1;
          });
        }
        const topLangs = Object.entries(topLangCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);
        if (!cancelled) {
          setState({
            status: "ready",
            data: {
              repos: user.public_repos,
              followers: user.followers,
              following: user.following,
              stars,
              avatar: user.avatar_url,
              topLangs,
            },
          });
        }
      } catch (e) {
        if (!cancelled) setState({ status: "error", data: null });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxLangCount = state.data?.topLangs?.[0]?.[1] || 1;
  const streakTheme = theme === "light" ? "default" : "dark";
  const orangeHex = theme === "light" ? "7c3aed" : "8b5cf6";

  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="stats-card-head">
        <div className="stats-card-title">
          <span className="stats-card-icon">
            <img src={techLogos.github} alt="" />
          </span>
          GitHub Live
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="stats-card-link"
        >
          @{GITHUB_USERNAME} ↗
        </a>
      </div>

      {state.status === "loading" && <div className="stats-loading">Fetching live data…</div>}
      {state.status === "error" && (
        <div className="stats-error">Couldn't reach the GitHub API right now — try refreshing.</div>
      )}
      {state.status === "ready" && (
        <>
          <div className="stats-grid">
            {[
              { n: state.data.repos, l: "Repos" },
              { n: state.data.stars, l: "Stars" },
              { n: state.data.followers, l: "Followers" },
            ].map((s) => (
              <motion.div key={s.l} className="stat-box" whileHover={{ y: -4 }}>
                <div className="stat-box-n">{s.n}</div>
                <div className="stat-box-l">{s.l}</div>
              </motion.div>
            ))}
          </div>
          {state.data.topLangs.length > 0 && (
            <div className="stats-bar-wrap">
              {state.data.topLangs.map(([lang, count]) => (
                <div className="stats-bar-row" key={lang}>
                  <div className="stats-bar-label">{lang}</div>
                  <div className="stats-bar-track">
                    <motion.div
                      className="stats-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(count / maxLangCount) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="stats-bar-val">{count}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="streak-img-wrap">
        <img
          className="streak-img"
          src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=${streakTheme}&hide_border=true&background=00000000&ring=${orangeHex}&fire=${orangeHex}&currStreakLabel=${orangeHex}`}
          alt="GitHub contribution streak"
          loading="lazy"
        />
      </div>

      <div className="contrib-img-wrap">
        <img
          className="contrib-img"
          src={`https://ghchart.rshah.org/${orangeHex}/${GITHUB_USERNAME}`}
          alt="GitHub daily contribution graph"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function LeetcodeStatsCard({ theme }) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
        if (!res.ok) throw new Error("LeetCode API error");
        const json = await res.json();
        if (json.status === "error" || !json.totalSolved) throw new Error("No LeetCode data");
        if (!cancelled) setState({ status: "ready", data: json });
      } catch (e) {
        if (!cancelled) setState({ status: "error", data: null });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const d = state.data;
  const maxDiff = d ? Math.max(d.easySolved, d.mediumSolved, d.hardSolved, 1) : 1;
  const cardTheme = theme === "light" ? "light" : "dark";

  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="stats-card-head">
        <div className="stats-card-title">
          <span className="stats-card-icon">
            <FiCode />
          </span>
          LeetCode Live
        </div>
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="stats-card-link"
        >
          @{LEETCODE_USERNAME} ↗
        </a>
      </div>

      {state.status === "loading" && <div className="stats-loading">Fetching live data…</div>}
      {state.status === "error" && (
        <div className="stats-error">
          Live stats unavailable — set LEETCODE_USERNAME in the code to your real handle.
        </div>
      )}
      {state.status === "ready" && (
        <>
          <div className="stats-grid">
            <motion.div className="stat-box" whileHover={{ y: -4 }}>
              <div className="stat-box-n">{d.totalSolved}</div>
              <div className="stat-box-l">Solved</div>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -4 }}>
              <div className="stat-box-n">{d.ranking ? `#${d.ranking.toLocaleString()}` : "—"}</div>
              <div className="stat-box-l">Rank</div>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -4 }}>
              <div className="stat-box-n">{d.totalQuestions}</div>
              <div className="stat-box-l">Total Qs</div>
            </motion.div>
          </div>
          <div className="stats-bar-wrap">
            {[
              { l: "Easy", v: d.easySolved },
              { l: "Medium", v: d.mediumSolved },
              { l: "Hard", v: d.hardSolved },
            ].map((s) => (
              <div className="stats-bar-row" key={s.l}>
                <div className="stats-bar-label">{s.l}</div>
                <div className="stats-bar-track">
                  <motion.div
                    className="stats-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.v / maxDiff) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="stats-bar-val">{s.v}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="heatmap-img-wrap">
        <img
          className="heatmap-img"
          src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=${cardTheme}&ext=heatmap`}
          alt="LeetCode submission heatmap and streak"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
