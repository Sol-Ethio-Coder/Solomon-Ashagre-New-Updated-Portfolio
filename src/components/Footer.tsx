import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="border-t border-line px-5 pb-8 pt-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-base font-medium">
              <span className="text-accent-text">&lt;</span>Solomon Ashagre<span className="text-accent-text"> /&gt;</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-dim">Computing teacher, full stack developer, and founder of STCA, based in Addis Ababa.</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-3 gap-x-10 gap-y-3 text-sm sm:grid-cols-6 md:grid-cols-3">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-dim transition-all hover:translate-x-0.5 hover:text-accent-text">
                {l.label}
              </a>
            ))}
          </nav>

          <motion.button
            onClick={toTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            aria-label="Back to top"
            title="Back to top"
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink transition-shadow hover:shadow-[0_10px_30px_-8px_var(--accent)]"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </motion.button>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-faint md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Solomon Ashagre · Sol Ethio Coder · Built in Addis Ababa</p>
          <ul className="flex gap-5 uppercase tracking-widest">
            {[["GitHub", PROFILE.socials.github], ["LinkedIn", PROFILE.socials.linkedin], ["Telegram", PROFILE.socials.telegram]].map(([l, h]) => (
              <li key={l}><a href={h} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent-text">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
