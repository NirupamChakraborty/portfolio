import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <div className="container page">
      <PageHeader eyebrow="Skills" title="What I work with." />
      <div className="skill-rows">
        {skillGroups.map((g) => (
          <Reveal key={g.category} className="skill-row">
            <h2>{g.category}</h2>
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
