export type ProjectLeadSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  budget: string;
  projectType: string;
  timeline: string;
  message: string;
  source: string;
  pageUrl: string;
  userAgent: string;
  submittedAt: string;
};

export type SubmitResult = {
  /** "confirmed": the server answered success. "unconfirmed": sent, but the answer could not be read. */
  status: "confirmed" | "unconfirmed";
  /** true when the server also emailed a confirmation to the visitor */
  confirmationSent: boolean;
};

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const FALLBACK_GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzubhSYmoqHMmYFvadld6s9mr_ClRJ1K9pAqDAl1jsQvCafXD4fFefL26b8L220l9yt/exec";

export const GOOGLE_SHEETS_WEB_APP_URL = env?.VITE_GOOGLE_SHEETS_WEB_APP_URL || FALLBACK_GOOGLE_SHEETS_URL;

const TIMEOUT_MS = 20000;

export function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Thrown when the server answered and said the message was NOT accepted (e.g. validation or rate limit). */
export class SubmissionRejected extends Error {}

export async function submitLeadToGoogleSheets(submission: ProjectLeadSubmission): Promise<SubmitResult> {
  // "text/plain" keeps this a CORS "simple request" (no preflight), and Apps Script answers with
  // permissive CORS headers, so the JSON reply is readable and we know whether it really worked.
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(submission),
      signal: controller.signal,
    });

    const data = (await response.json()) as { status?: string; message?: string; confirmationSent?: boolean };

    if (data.status === "success") {
      return { status: "confirmed", confirmationSent: Boolean(data.confirmationSent) };
    }
    throw new SubmissionRejected(data.message || "The message could not be sent.");
  } catch (error) {
    if (error instanceof SubmissionRejected) throw error;

    // The reply could not be read (blocked by the browser, network hiccup, bad JSON...).
    // Fall back to the classic hidden-form post, which still reaches the script, but cannot confirm it.
    if (controller.signal.aborted) throw new Error("The request timed out. Please try again.");
    postWithHiddenForm(GOOGLE_SHEETS_WEB_APP_URL, submission);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    return { status: "unconfirmed", confirmationSent: false };
  } finally {
    window.clearTimeout(timer);
  }
}

function postWithHiddenForm(url: string, submission: ProjectLeadSubmission) {
  const iframeName = `sol-contact-target-${submission.id}`;
  const iframe = document.createElement("iframe");
  iframe.name = iframeName;
  iframe.title = "Contact form submission target";
  iframe.style.display = "none";

  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  form.target = iframeName;
  form.style.display = "none";

  Object.entries(submission).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(iframe);
  document.body.appendChild(form);
  form.submit();

  window.setTimeout(() => {
    form.remove();
    iframe.remove();
  }, 6000);
}
