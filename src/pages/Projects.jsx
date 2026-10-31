import PageHeader from "../components/PageHeader";
import Showcase from "../components/Showcase";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="container page">
      <PageHeader eyebrow="Projects" title="Things I've built." />
      {projects.map((p) => (
        <Showcase key={p.slug} project={p} />
      ))}
    </div>
  );
}
