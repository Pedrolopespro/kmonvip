import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({ breaks: true });

/** Pure-JS sanitizer on purpose. isomorphic-dompurify pulls in jsdom, which is a
 * whole DOM implementation inside the serverless function — it built fine but
 * failed at request time on Vercel (500 on every post page). sanitize-html has
 * no such dependency. */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr",
    "strong", "em", "b", "i", "s", "del",
    "ul", "ol", "li",
    "blockquote", "code", "pre",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  // Outbound links in editorial content shouldn't hand the target window a
  // reference back to ours.
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

/** Post content is Markdown written by an authenticated CRM user, but it's still
 * rendered to every site visitor — sanitize regardless of who authored it. */
export function renderPostContent(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
