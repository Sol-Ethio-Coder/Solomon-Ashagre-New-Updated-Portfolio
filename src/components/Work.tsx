import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { PROJECTS, Project } from "../data/portfolioData";
import MoreProjects from "./MoreProjects";
import ProjectImage from "./ProjectImage";
import { Reveal, Section, btnGhost, btnPrimary, card, chip, iconNudge } from "./ui";

const CASE_IDS = ["stca", "equbhub", "mistir", "sol-ebooks", "tasko"];
const cases = CASE_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean) as Project[];

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className={`${card} group/card grid overflow-hidden shadow-none hover:shadow-[0_30px_80px_-40px_var(--accent)] lg:grid-cols-2`}>
        <div className={`relative min-h-64 overflow-hidden border-line bg-surface-2 ${flip ? "lg:order-2 lg:border-l" : "lg:border-r"}`}>
          <ProjectImage project={project} framed className="h-full w-full transition-transform duration-700 ease-out group-hover/card:scale-[1.04]" />
        </div>
        <div className="flex flex-col p-7 sm:p-10">
          <p className="font-mono text-xs text-accent-text">
            {[String(index + 1).padStart(2, "0"), project.year, project.category === "fullstack" ? "Full stack" : "Frontend"].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-1 text-dim">{project.subtitle}</p>
          <p className="mt-5 leading-7">{project.description}</p>

          {project.features && (
            <ul className="mt-5 space-y-2 text-sm leading-6 text-dim">
              {project.features.slice(0, 3).map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => <li key={t} className={chip}>{t}</li>)}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className={btnPrimary}>
                Live demo <ArrowUpRight className={`h-4 w-4 ${iconNudge}`} aria-hidden />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className={btnGhost}>
                <Code2 className="h-4 w-4" aria-hidden /> Source
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Projects built end to end" intro="Five live products I designed and built: a coding academy platform, an Equb management app, an encrypted password manager, an author website, and a task manager.">
      <div className="space-y-6">
        {cases.map((p, i) => <CaseStudy key={p.id} project={p} index={i} />)}
      </div>

      <MoreProjects />
    </Section>
  );
}
