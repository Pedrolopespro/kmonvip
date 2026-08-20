import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({ breaks: true });

/** Post content is Markdown written by an authenticated CRM user, but it's still
 * rendered to every site visitor — sanitize regardless of who authored it. */
export function renderPostContent(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(html);
}
