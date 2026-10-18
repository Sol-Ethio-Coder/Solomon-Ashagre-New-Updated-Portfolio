import { SERVICES_LIST } from "../data/portfolioData";
import { Reveal, Section, card } from "./ui";

export default function Services() {
  return (
    <Section id="services" eyebrow="Services" title="How I can help">
      <div className="grid gap-4 md:grid-cols-2">
        {SERVICES_LIST.map((s, i) => (
          <Reveal key={s.id} delay={0.05 * i} className={`${card} flex flex-col p-7 sm:p-8`}>
            <p className="font-mono text-xs text-accent-text">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-xl font-semibold leading-snug">{s.title}</h3>
            <p className="mt-3 text-sm leading-6 text-dim">{s.shortDesc}</p>
            <ul className="mt-5 space-y-2 text-sm leading-6">
              {s.deliverables.slice(0, 3).map((d) => (
                <li key={d} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{d}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
