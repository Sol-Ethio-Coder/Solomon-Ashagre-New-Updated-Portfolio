import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin, School } from "lucide-react";
import { CERTIFICATIONS_LIST, EDUCATION_TIMELINE, EXPERIENCE_TIMELINE, PROFILE, PROJECTS } from "../data/portfolioData";
import { Reveal, Section, card } from "./ui";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce || !match) return;
    const controls = animate(0, target, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) return <p ref={ref}>{value}</p>;
  return <p ref={ref}>{n}{suffix}</p>;
}

const teaching = EXPERIENCE_TIMELINE.find((e) => e.type === "Teaching");
const degree = EDUCATION_TIMELINE[0];
const internships = EXPERIENCE_TIMELINE.filter((e) => e.type === "Internship").length;

const STATS = [
  { value: PROFILE.yearsOfExperience, label: "Years teaching" },
  { value: String(PROJECTS.length), label: "Live products" },
  { value: String(internships), label: "Internships" },
  { value: String(CERTIFICATIONS_LIST.length), label: "Certifications" },
];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={<>A developer who also <span className="text-accent-text">teaches</span></>}>
      <div className="grid gap-4 md:grid-cols-4">
        <Reveal className={`${card} p-7 sm:p-9 md:col-span-2 md:row-span-2`}>
          <p className="text-lg leading-8 sm:text-xl">{PROFILE.bio}</p>
          <p className="mt-5 leading-7 text-dim">
            Teaching shapes how I build: readable code, clear interfaces, and projects I can explain from the database up to the button.
          </p>
        </Reveal>

        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * (i + 1)} className={`${card} flex flex-col justify-between p-6`}>
            <div className="text-4xl font-semibold tabular-nums tracking-tight text-accent-text sm:text-5xl"><CountUp value={s.value} /></div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-faint">{s.label}</p>
          </Reveal>
        ))}

        <Reveal delay={0.1} className={`${card} flex items-start gap-4 p-6 md:col-span-2`}>
          <School className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Teaching</p>
            <p className="mt-1">{teaching ? `${teaching.title}, ${teaching.company}` : "Computer science educator"}</p>
            <p className="mt-1 text-sm text-dim">{teaching?.period}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className={`${card} flex items-start gap-4 p-6`}>
          <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Education</p>
            <p className="mt-1 text-sm leading-6">{degree.degree}</p>
            <p className="text-sm text-dim">{degree.school}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className={`${card} flex items-start gap-4 p-6`}>
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-text" aria-hidden />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Based in</p>
            <p className="mt-1 text-sm leading-6">{PROFILE.location}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
