import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { RESUME_FILENAME, RESUME_URL } from "../data/resume";
import { Magnetic, btnPrimary } from "./ui";
import ThemePicker from "./ThemePicker";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    [...LINKS.map((l) => l.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
      <nav aria-label="Primary" className="mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full border border-line bg-bg/70 py-2 pl-2.5 pr-2 backdrop-blur-xl">
        <a href="#top" aria-label="Solomon Ashagre, back to top" className="group flex min-w-0 items-center gap-2.5 font-mono text-sm font-medium tracking-tight">
          <img
            src="/logo-96.png"
            alt=""
            width={32}
            height={32}
            decoding="async"
            className="h-8 w-8 shrink-0 rounded-full transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <span className="truncate">
            <span className="text-accent-text transition-all group-hover:mr-0.5">&lt;</span>
            Solomon Ashagre
            <span className="text-accent-text transition-all group-hover:ml-0.5"> /&gt;</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${active === l.id ? "text-ink" : "text-dim hover:text-ink"}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full bg-surface-2" />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemePicker />
          <Magnetic className="hidden sm:inline-flex">
            <a href="#contact" className={`${btnPrimary} !px-5 !py-2.5`}>Let&apos;s talk</a>
          </Magnetic>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-4xl rounded-3xl border border-line bg-surface p-3 md:hidden">
          {[...LINKS, { id: "contact", label: "Contact" }].map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium hover:bg-surface-2">
              {l.label}
            </a>
          ))}
          <a href={RESUME_URL} download={RESUME_FILENAME} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium text-accent-text hover:bg-surface-2">Download CV</a>
          <p className="px-4 pb-2 pt-3 font-mono text-xs text-faint">{PROFILE.location}</p>
        </div>
      )}
    </header>
  );
}
