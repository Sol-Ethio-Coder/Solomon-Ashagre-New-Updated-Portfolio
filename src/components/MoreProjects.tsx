import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, Maximize2 } from "lucide-react";
import { MORE_PROJECTS, Project } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import { Reveal, chip, iconNudge } from "./ui";

type Filter = "all" | "fullstack" | "frontend";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full stack" },
  { id: "frontend", label: "Frontend" },
];

const MAX_TAGS = 3;

// Every card has the same fixed structure so all cards render at exactly the same size.
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const extra = project.technologies.length - MAX_TAGS;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05, layout: { type: "spring", stiffness: 260, damping: 28 } }}
      whileHover={{ y: -5 }}
      className="spot group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <button onClick={onOpen} aria-label={`View details for ${project.title}`} className="relative block h-44 w-full shrink-0 overflow-hidden border-b border-line bg-surface-2 text-left">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 transition-opacity duration-500 group-hover:opacity-55`} aria-hidden />
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{ objectPosition: project.imagePosition ?? "top" }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" aria-hidden />
        <div className="absolute left-4 top-4 flex gap-2">
          {project.year && <span className="rounded-full border border-line bg-bg/75 px-2.5 py-1 font-mono text-[10px] text-dim backdrop-blur">{project.year}</span>}
          <span className="rounded-full border border-line bg-bg/75 px-2.5 py-1 font-mono text-[10px] text-accent-text backdrop-blur">
            {project.category === "fullstack" ? "Full stack" : "Frontend"}
          </span>
        </div>
        <span className="absolute bottom-3 right-4 font-mono text-xs text-ink/60" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="truncate text-lg font-semibold leading-snug transition-colors group-hover:text-accent-text">{project.title}</h4>
        <p className="mt-1 truncate text-sm text-faint">{project.subtitle}</p>
        <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-dim">{project.description}</p>

        <ul className="mt-4 flex h-6 flex-wrap gap-1.5 overflow-hidden">
          {project.technologies.slice(0, MAX_TAGS).map((t) => <li key={t} className={`${chip} !px-2.5 !py-0.5 !text-[10px]`}>{t}</li>)}
          {extra > 0 && <li className="px-1 py-0.5 font-mono text-[10px] text-faint">+{extra}</li>}
        </ul>

        <button onClick={onOpen} className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-accent-text">
          Details <Maximize2 className="h-3 w-3" aria-hidden />
        </button>

        <div className="mt-auto flex gap-2 pt-4">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="group/l inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-accent-ink transition hover:shadow-[0_8px_24px_-8px_var(--accent)] active:scale-[0.97]">
              Live demo <ArrowUpRight className={`h-3.5 w-3.5 ${iconNudge}`} aria-hidden />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-xs font-semibold transition hover:border-accent-text hover:text-accent-text active:scale-[0.97]">
              <Code2 className="h-3.5 w-3.5" aria-hidden /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function MoreProjects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown = useMemo(() => MORE_PROJECTS.filter((p) => filter === "all" || p.category === filter), [filter]);
  const count = (f: Filter) => (f === "all" ? MORE_PROJECTS.length : MORE_PROJECTS.filter((p) => p.category === f).length);

  if (MORE_PROJECTS.length === 0) return null;

  return (
    <div className="mt-20 sm:mt-28">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            <span className="h-px w-8 bg-accent-text" aria-hidden />
            More projects
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">Smaller builds &amp; earlier work</h3>
          <p className="mt-3 text-dim">Internship builds, tools and experiments. Open Details on any card for the full story.</p>
        </div>

        <div role="tablist" aria-label="Filter more projects" className="flex w-fit gap-1 rounded-full border border-line bg-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === f.id ? "text-accent-ink" : "text-dim hover:text-ink"}`}
            >
              {filter === f.id && (
                <motion.span layoutId="more-filter-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full bg-accent" />
              )}
              <span className="relative">{f.label} <span className="font-mono text-[11px] opacity-70">{count(f.id)}</span></span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />)}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
