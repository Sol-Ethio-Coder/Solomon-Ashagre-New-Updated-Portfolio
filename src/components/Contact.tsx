import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Download, Loader2, Mail, Send } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { RESUME_FILENAME, RESUME_URL } from "../data/resume";
import { ProjectLeadSubmission, SubmissionRejected, SubmitResult, createSubmissionId, submitLeadToGoogleSheets } from "../utils/googleSheets";
import { Magnetic, Reveal, Section, btnGhost, btnPrimary, card, iconNudge } from "./ui";

const TYPES = ["Full Stack Web App", "Portfolio / Business Site", "EdTech Platform", "Technical Consulting"];

// text-base (16px) on inputs stops iOS Safari from zooming the page when a field is focused.
const fieldBase =
  "block w-full min-h-12 rounded-2xl border bg-bg px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";
const fieldOk = "border-line focus:border-accent-text";
const fieldBad = "border-red-400 focus:border-red-400";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errors.email = "Please enter a valid email address.";
  if (message.trim().length < 10) errors.message = "Please write at least a few words (10+ characters).";
  return errors;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-dim">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<SubmitResult | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") || "")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const found = validate(name, email, message);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const type = String(data.get("type") || TYPES[0]);
    const submission: ProjectLeadSubmission = {
      id: createSubmissionId(),
      name: name.trim(),
      email: email.trim(),
      subject: `New ${type} inquiry`,
      budget: "Not specified",
      projectType: type,
      timeline: "Not specified",
      message: message.trim(),
      source: "Sol Ethio Coder Portfolio",
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    };

    setBusy(true);
    setFailed(null);
    try {
      setDone(await submitLeadToGoogleSheets(submission));
    } catch (error) {
      setFailed(error instanceof SubmissionRejected ? error.message : "That didn't go through.");
    } finally {
      setBusy(false);
    }
  };

  const describe = (key: keyof Errors) => (errors[key] ? `${key}-error` : undefined);

  return (
    <Section id="contact" eyebrow="Contact" title={<>Have a project in mind? <span className="text-accent-text">Let&apos;s talk.</span></>}>
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Form first on phones, second on desktop */}
        <Reveal delay={0.08} className={`${card} order-first min-w-0 p-5 sm:p-8 lg:order-none lg:col-span-7 lg:p-9`}>
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                className="flex min-h-72 flex-col items-center justify-center text-center"
              >
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}>
                  <CheckCircle2 className="h-14 w-14 text-accent-text" aria-hidden />
                </motion.span>
                <h3 className="mt-5 text-2xl font-semibold">{done.status === "confirmed" ? "Message sent" : "Message submitted"}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-dim">
                  {done.status === "confirmed"
                    ? done.confirmationSent
                      ? "Thank you! I received your message. A confirmation has been sent to your email, and I will reply as soon as I can."
                      : "Thank you! I received your message and will reply by email as soon as I can."
                    : "Your message was submitted, but I could not confirm delivery from your browser. If you do not hear back within a day or two, please email me directly at "}
                  {done.status === "unconfirmed" && (
                    <a href={`mailto:${PROFILE.email}`} className="break-all font-medium text-accent-text underline underline-offset-4">{PROFILE.email}</a>
                  )}
                </p>
                <button onClick={() => { setDone(null); setErrors({}); }} className={`${btnGhost} mt-6`}>Send another message</button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 sm:space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field id="name" label="Name" error={errors.name}>
                    <input id="name" name="name" autoComplete="name" required placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={describe("name")} className={`${fieldBase} ${errors.name ? fieldBad : fieldOk}`} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={describe("email")} className={`${fieldBase} ${errors.email ? fieldBad : fieldOk}`} />
                  </Field>
                </div>

                <Field id="type" label="Project type">
                  <select id="type" name="type" defaultValue={TYPES[0]} className={`${fieldBase} ${fieldOk}`}>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="message" name="message" rows={5} required placeholder="Tell me about your project..." aria-invalid={!!errors.message} aria-describedby={describe("message")} className={`${fieldBase} resize-y ${errors.message ? fieldBad : fieldOk}`} />
                </Field>

                {/* Honeypot — hidden from people and assistive tech */}
                <div className="absolute -left-[9999px]" aria-hidden>
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <button type="submit" disabled={busy} className={`${btnPrimary} w-full !py-4 disabled:cursor-not-allowed disabled:opacity-60`}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className={`h-4 w-4 ${iconNudge}`} aria-hidden />}
                  {busy ? "Sending..." : "Send message"}
                </button>

                {failed && (
                  <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-6">
                    {failed} Please try again, or email me directly at{" "}
                    <a href={`mailto:${PROFILE.email}`} className="break-all font-medium text-accent-text underline underline-offset-4">{PROFILE.email}</a>.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <Reveal className={`${card} min-w-0 p-5 sm:p-8 lg:col-span-5 lg:p-9`}>
          <p className="leading-7 text-dim">The fastest way to reach me is email or Telegram. I reply as soon as I can.</p>
          <Magnetic className="mt-6 flex w-full" strength={0.12}>
            <a href={`mailto:${PROFILE.email}`} className={`${btnPrimary} w-full min-w-0`}>
              <Mail className="h-4 w-4 shrink-0" aria-hidden /> <span className="min-w-0 break-all">{PROFILE.email}</span>
            </a>
          </Magnetic>
          <a href={RESUME_URL} download={RESUME_FILENAME} className={`${btnGhost} mt-3 w-full`}>
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /> Download CV (PDF)
          </a>
          <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
            {[
              ["Telegram", PROFILE.socials.telegram],
              ["WhatsApp", PROFILE.socials.whatsapp],
              ["LinkedIn", PROFILE.socials.linkedin],
              ["GitHub", PROFILE.socials.github],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="group flex min-h-12 items-center justify-between py-3 text-dim transition-all hover:pl-2 hover:text-accent-text">
                  {label} <ArrowUpRight className={`h-4 w-4 ${iconNudge}`} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-xs text-faint">{PROFILE.location}</p>
        </Reveal>
      </div>
    </Section>
  );
}
