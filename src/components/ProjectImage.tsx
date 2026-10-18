import { useState } from "react";
import { Project } from "../data/portfolioData";

// Real screenshot when it loads; otherwise a clean placeholder built from the project's own title.
// `framed` shows the screenshot inside a small browser window on a tinted panel (used by case studies).
export default function ProjectImage({ project, className = "", framed = false }: { project: Project; className?: string; framed?: boolean }) {
  const [failed, setFailed] = useState(false);
  const host = project.live ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.title;

  if (!project.image || failed) {
    return (
      <div role="img" aria-label={`${project.title} preview`} className={`relative flex items-end overflow-hidden bg-surface-2 ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
        <div className="relative p-6">
          {project.year && <p className="font-mono text-xs text-accent-text">{project.year}</p>}
          <p className="mt-1 text-2xl font-semibold leading-tight">{project.title}</p>
        </div>
      </div>
    );
  }

  if (framed) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-surface-2 p-5 sm:p-8 ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-25`} aria-hidden />
        <div className="relative w-full overflow-hidden rounded-xl border border-line bg-bg shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-faint/60" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-faint/60" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-faint/60" aria-hidden />
            <span className="ml-2 min-w-0 truncate font-mono text-[10px] text-faint">{host}</span>
          </div>
          <img
            src={project.image}
            alt={`${project.title} homepage screenshot`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="block h-auto w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover object-top ${className}`}
    />
  );
}
