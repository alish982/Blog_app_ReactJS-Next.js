import DOMPurify from "dompurify";

/** Splits a comma-separated tag */
export function parseTags(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Sanitizes Tiptap-produced HTML before rendering
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  return `${sliced.slice(0, sliced.lastIndexOf(" "))}…`;
}

const CATEGORY_COLORS = [
  "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400",
  "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400",
];

export function categoryColor(category: string): string {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash + category.charCodeAt(i)) % CATEGORY_COLORS.length;
  }
  return CATEGORY_COLORS[hash];
}
