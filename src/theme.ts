export type ThemeId = "dark" | "light" | "midnight" | "ocean" | "ember" | "sage";
export type Choice = ThemeId | "system";

export const THEMES: { id: ThemeId; label: string; mode: "Dark" | "Light"; swatch: [string, string] }[] = [
  { id: "dark", label: "Graphite", mode: "Dark", swatch: ["#0a0b10", "#c8f169"] },
  { id: "light", label: "Paper", mode: "Light", swatch: ["#f6f5f1", "#c8f169"] },
  { id: "midnight", label: "Midnight", mode: "Dark", swatch: ["#0d0a1a", "#a78bfa"] },
  { id: "ocean", label: "Ocean", mode: "Dark", swatch: ["#06141a", "#22d3ee"] },
  { id: "ember", label: "Ember", mode: "Dark", swatch: ["#120c08", "#fb923c"] },
  { id: "sage", label: "Sage", mode: "Light", swatch: ["#f1f5ef", "#7ddc9a"] },
];

const KEY = "theme";

export function resolveTheme(choice: Choice): ThemeId {
  if (choice === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return choice;
}

export function readChoice(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "system" || THEMES.some((t) => t.id === v)) return v as Choice;
  } catch {
    /* storage unavailable */
  }
  return "dark";
}

export function applyTheme(choice: Choice, persist = true) {
  const id = resolveTheme(choice);
  document.documentElement.dataset.theme = id;
  const swatch = THEMES.find((t) => t.id === id)?.swatch[0];
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && swatch) meta.setAttribute("content", swatch);
  if (persist) {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* storage unavailable */
    }
  }
}
