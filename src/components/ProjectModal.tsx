import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, X } from "lucide-react";
import { Project } from "../data/portfolioData";
import ProjectImage from "./ProjectImage";
import { chip, iconNudge } from "./ui";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/80 backdrop-blur transition hover:border-accent-text hover:text-accent-text"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto">
          <ProjectImage project={project} className="aspect-[16/9] w-full border-b border-line" />

          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs text-accent-text">
              {[project.year, project.category === "fullstack" ? "Full stack" : "Frontend"].filter(Boolean).join(" · ")}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-dim">{project.subtitle}</p>

            <p className="mt-5 leading-7">{project.longDescription ?? project.description}</p>

            {project.features && (
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-dim">
                {project.features.map((f) => (
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:shadow-[0_8px_30px_-8px_var(--accent)] active:scale-[0.97]">
                  Live demo <ArrowUpRight className={`h-4 w-4 ${iconNudge}`} aria-hidden />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition hover:border-accent-text hover:text-accent-text active:scale-[0.97]">
                  <Code2 className="h-4 w-4" aria-hidden /> Source code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
