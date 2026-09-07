import type { ReactNode } from "react";

/**
 * Native <details>. Chosen over a JS accordion on purpose: the answer text stays
 * findable by the browser's "Find in page", stays indexable by search engines,
 * and works with no JavaScript at all.
 *
 * Passing the same `group` to several of these makes them mutually exclusive
 * via the native `name` attribute — no state, no effect, no re-render.
 */
export function Disclosure({
  question,
  children,
  group,
  id,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  group?: string;
  id?: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className="ef-disclosure" name={group} id={id} open={defaultOpen}>
      <summary>
        <span>{question}</span>
        <span className="ef-disclosure__sign" aria-hidden="true" />
      </summary>
      <div className="ef-disclosure__body">{children}</div>
    </details>
  );
}
