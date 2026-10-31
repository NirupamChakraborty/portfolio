import { FiArrowUpRight } from "react-icons/fi";
import Magnetic from "../components/Magnetic";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { GITHUB_USERNAME, SITE } from "../data/siteConfig";

const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "LinkedIn", value: "nirupamchakraborty", href: SITE.linkedin },
  { label: "GitHub", value: GITHUB_USERNAME, href: SITE.github },
  { label: "Location", value: SITE.location },
];

export default function Contact() {
  return (
    <div className="container page">
      <PageHeader eyebrow="Contact" title="Pit lane.">
        Have a project, a question, or an idea worth building? Email is the best way to reach me.
      </PageHeader>

      <div className="actions contact-cta">
        <Magnetic>
          <a href={`mailto:${SITE.email}`} className="btn btn-primary">
            Send an email
          </a>
        </Magnetic>
      </div>

      <Reveal>
        <dl className="contact-rows">
          {LINKS.map((l) => (
            <div key={l.label}>
              <dt>{l.label}</dt>
              <dd>
                {l.href ? (
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {l.value} <FiArrowUpRight />
                  </a>
                ) : (
                  l.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
