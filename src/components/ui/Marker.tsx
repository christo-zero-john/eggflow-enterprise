import type { ReactNode } from "react";

/**
 * Section heading with a rule. The index is optional and should only be passed
 * when the sections genuinely form a sequence — a numbered marker on unordered
 * content tells the reader something untrue about the structure.
 */
export function Marker({
  index,
  children,
  id,
}: {
  index?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="ef-marker">
      {index ? <span className="ef-marker__index ef-num">{index}</span> : null}
      <h2 className="ef-h2" id={id}>
        {children}
      </h2>
    </div>
  );
}
