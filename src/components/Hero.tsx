import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { PROFILE, SKILLS } from "../data/portfolioData";
import { RESUME_FILENAME, RESUME_URL } from "../data/resume";
import { Magnetic, btnGhost, btnPrimary } from "./ui";

const MARQUEE = SKILLS.filter((s) => s.core).map((s) => s.name);

const HEADLINE: { w: string; accent?: boolean }[] = [
  { w: "I" }, { w: "build" }, { w: "web" }, { w: "products" }, { w: "and" },
  { w: "teach", accent: true }, { w: "people" }, { w: "to" }, { w: "build" }, { w: "them." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const word = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function TiltPortrait() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });

  return (
    <div className="[perspective:1000px]">
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface"
      >
        <img src={PROFILE.avatar} alt={`Portrait of ${PROFILE.name}`} fetchPriority="high" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-line bg-bg/80 p-4 backdrop-blur-md">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent-text">Founder · STCA</p>
          <p className="mt-0.5 text-sm text-dim">Sol Tutoring &amp; Coding Academy</p>
        </div>
      </motion.div>

      {/* Floating stack badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 top-10 hidden rounded-full border border-line bg-surface/90 px-4 py-2 font-mono text-xs shadow-xl backdrop-blur sm:block"
      >
        <span className="text-accent-text">●</span> React · Node.js
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -right-3 top-1/2 hidden rounded-full border border-line bg-surface/90 px-4 py-2 font-mono text-xs shadow-xl backdrop-blur sm:block"
      >
        <span className="text-accent-text">●</span> MongoDB
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-10 pt-32 sm:px-8 md:pt-40">
      <div className="atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {PROFILE.availableForWork && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-xs text-dim"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work · {PROFILE.location}
            </motion.p>
          )}

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            aria-label="I build web products and teach people to build them."
            className="mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {HEADLINE.map((h, i) => (
              <motion.span key={i} variants={word} aria-hidden className={`mr-[0.25em] inline-block ${h.accent ? "text-accent-text" : ""}`}>
                {h.w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-xl text-base leading-7 text-dim sm:text-lg sm:leading-8"
          >
            {PROFILE.name} — full stack developer working with React, Node.js and MongoDB, founder of STCA, and a computing teacher in Addis Ababa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic><a href="#work" className={btnPrimary}>Explore my work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /></a></Magnetic>
            <Magnetic>
              <a href={RESUME_URL} download={RESUME_FILENAME} className={btnGhost}>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /> Download CV
              </a>
            </Magnetic>
            <Magnetic><a href="#contact" className={btnGhost}>Contact me</a></Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
        >
          <TiltPortrait />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden border-y border-line py-4" aria-hidden>
        <div className="marquee flex w-max gap-10 font-mono text-sm text-faint">
          {[...MARQUEE, ...MARQUEE].map((name, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {name}
              <span className="text-accent-text">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
