import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <div className="container page">
      <PageHeader eyebrow="Skills" title="Full spec." />
      <div className="skill-rows">
        {skillGroups.map((g, i) => (
          <Reveal key={g.category} className="skill-row">
            <div>
              <p className="eyebrow">
                P{i + 1} · {g.part}
              </p>
              <h2>{g.category}</h2>
            </div>
            <ul className="tags">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
