import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Nudges its child toward the pointer. Disabled for reduced-motion users.
export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: ReactNode; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-px w-8 origin-left bg-accent-text"
              aria-hidden
            />
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h2>
          {intro && <p className="mt-4 text-base leading-7 text-dim sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export const card = "spot rounded-3xl border border-line bg-surface";
export const chip = "rounded-full border border-line px-3 py-1 font-mono text-[11px] text-dim transition-colors hover:border-accent-text hover:text-accent-text";
const btnBase =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition active:scale-[0.97]";
export const btnPrimary = `${btnBase} bg-accent text-accent-ink hover:shadow-[0_8px_30px_-8px_var(--accent)] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full`;
export const btnGhost = `${btnBase} border border-line text-ink hover:border-accent-text hover:text-accent-text`;
export const iconNudge = "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
