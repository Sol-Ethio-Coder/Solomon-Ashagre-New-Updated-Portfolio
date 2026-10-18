import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Palette } from "lucide-react";
import { Choice, THEMES, applyTheme, readChoice } from "../theme";

export default function ThemePicker() {
  const [choice, setChoice] = useState<Choice>("dark");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    applyTheme(stored, false);
  }, []);

  // Follow the OS setting live while "System" is selected.
  useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => applyTheme("system", false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (c: Choice) => {
    setChoice(c);
    applyTheme(c);
    setOpen(false);
  };

  const item = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-2";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose theme"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-dim transition hover:text-ink"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div role="group" aria-label="Theme" className="absolute right-0 top-full z-50 mt-3 w-60 rounded-2xl border border-line bg-surface p-2 shadow-2xl">
          <button onClick={() => pick("system")} aria-pressed={choice === "system"} className={item}>
            <Monitor className="h-5 w-5 text-dim" aria-hidden />
            <span className="flex-1">
              System
              <span className="block font-mono text-[10px] text-faint">Match device</span>
            </span>
            {choice === "system" && <Check className="h-4 w-4 text-accent-text" aria-hidden />}
          </button>
          <div className="my-1 h-px bg-line" />
          {THEMES.map((t) => (
            <button key={t.id} onClick={() => pick(t.id)} aria-pressed={choice === t.id} className={item}>
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-line" style={{ background: t.swatch[0] }} aria-hidden>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-tl-full" style={{ background: t.swatch[1] }} />
              </span>
              <span className="flex-1">
                {t.label}
                <span className="block font-mono text-[10px] text-faint">{t.mode}</span>
              </span>
              {choice === t.id && <Check className="h-4 w-4 text-accent-text" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
