import { useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Award as AwardIcon, Expand } from "lucide-react";
import { AWARDS, Award, CERTIFICATIONS_LIST, EDUCATION_TIMELINE, EXPERIENCE_TIMELINE, LANGUAGES, VOLUNTEERING } from "../data/portfolioData";
import Lightbox from "./Lightbox";
import { Reveal, Section, card } from "./ui";

export default function Journey() {
  const [viewing, setViewing] = useState<Award | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <Section id="journey" eyebrow="Journey" title="Experience, education & recognition">
      <div className="grid gap-10 lg:grid-cols-12">
        <ol ref={listRef} className="relative space-y-8 border-l border-line pl-7 lg:col-span-7">
          <motion.span aria-hidden style={{ scaleY }} className="absolute -left-px top-0 h-full w-px origin-top bg-accent" />
          {EXPERIENCE_TIMELINE.map((e, i) => (
            <Reveal key={`${e.company}-${e.period}`} delay={0.04 * i}>
              <li className="group relative">
                <span className="absolute -left-[34px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg transition-all duration-300 group-hover:scale-150 group-hover:bg-accent" aria-hidden />
                <p className="font-mono text-xs text-accent-text">{e.period} · {e.location}</p>
                <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-accent-text">{e.title}</h3>
                <p className="text-dim">{e.company}</p>
                <p className="mt-3 text-sm leading-6 text-dim">{e.description}</p>
                <ul className="mt-3 space-y-1.5 text-sm leading-6">
                  {e.achievements.slice(0, 2).map((a) => (
                    <li key={a} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden />{a}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="space-y-6 lg:col-span-5">
          <Reveal className={`${card} p-6 sm:p-7`}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Education</h3>
            <ul className="mt-5 space-y-5">
              {EDUCATION_TIMELINE.map((ed) => (
                <li key={ed.degree}>
                  <p className="font-medium leading-snug">{ed.degree}</p>
                  <p className="text-sm text-dim">{ed.school} · {ed.period}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.03} className={`${card} p-6 sm:p-7`}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Awards</h3>
            <ul className="mt-5 space-y-5">
              {AWARDS.map((a) => (
                <li key={a.title}>
                  <p className="font-medium leading-snug">{a.title}</p>
                  <p className="text-sm text-dim">{[a.org, a.date].filter(Boolean).join(" · ")}</p>
                  <p className="mt-1.5 text-sm leading-6 text-dim">{a.description}</p>

                  {a.image && (
                    <button
                      onClick={() => setViewing(a)}
                      aria-label={`View certificate: ${a.title}`}
                      className="group relative mt-4 block w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#f3d27a] via-[#c8962e] to-[#f3d27a] p-[3px] shadow-[0_18px_50px_-24px_rgba(231,184,75,0.55)] transition-shadow duration-500 hover:shadow-[0_24px_70px_-20px_rgba(231,184,75,0.75)]"
                    >
                      <span className="relative block overflow-hidden rounded-[13px] bg-bg">
                        <img
                          src={a.image}
                          alt={a.imageAlt ?? a.title}
                          loading="lazy"
                          decoding="async"
                          className="block aspect-[1467/1072] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        {/* shine sweep */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#f3d27a] backdrop-blur">
                          <AwardIcon className="h-3 w-3" aria-hidden /> Certificate
                        </span>
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                          <Expand className="h-3.5 w-3.5" aria-hidden /> View full certificate
                        </span>
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className={`${card} p-6 sm:p-7`}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Certifications · {CERTIFICATIONS_LIST.length}</h3>
            <ul className="mt-5 space-y-4">
              {CERTIFICATIONS_LIST.map((c) => (
                <li key={c.title} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium leading-snug">{c.title}</p>
                    <p className="text-xs text-dim">{c.issuer}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-faint">{c.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className={`${card} p-6 sm:p-7`}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Languages</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <li key={l.name} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {l.name} <span className="text-dim">· {l.level}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-faint">Volunteering</h3>
            <p className="mt-3 font-medium leading-snug">{VOLUNTEERING.title}</p>
            <p className="text-sm text-dim">{VOLUNTEERING.org} · {VOLUNTEERING.date}</p>
            <p className="mt-1.5 text-sm leading-6 text-dim">{VOLUNTEERING.description}</p>
          </Reveal>
        </div>
      </div>
      <AnimatePresence>
        {viewing?.image && (
          <Lightbox
            src={viewing.image}
            alt={viewing.imageAlt ?? viewing.title}
            title={viewing.title}
            caption={[viewing.org, viewing.date].filter(Boolean).join(" · ")}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
