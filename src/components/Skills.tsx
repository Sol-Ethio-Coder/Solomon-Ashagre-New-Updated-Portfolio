import { motion } from "framer-motion";
import { SKILLS, Skill } from "../data/portfolioData";
import { Reveal, Section, card } from "./ui";

const CATEGORIES: Skill["category"][] = ["Frontend", "Backend", "Database", "Tools & Cloud", "AI & Others"];

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I reach for" intro="Used across internships, project work and teaching. Highlighted tags are the core skills listed on my CV. Hover or focus a tag for detail.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {CATEGORIES.map((cat, i) => {
          const items = SKILLS.filter((s) => s.category === cat);
          return (
            <Reveal key={cat} delay={0.05 * i} className={`${card} p-6 sm:p-7 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <h3 className="flex items-baseline justify-between text-lg font-semibold">
                {cat}
                <span className="font-mono text-xs text-faint">{String(items.length).padStart(2, "0")}</span>
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((s) => {
                  const core = !!s.core;
                  return (
                    <li key={s.name}>
                      <motion.span
                        tabIndex={0}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        title={s.description}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-accent-text ${
                          core ? "border-accent-text/50 bg-accent/10 text-ink" : "border-line text-dim"
                        }`}
                      >
                        {core && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                        {s.name}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
