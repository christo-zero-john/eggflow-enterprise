import type { ReactNode } from "react";

export function ViewportSection({
  id,
  labelledBy,
  tone = "carton",
  className = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: "carton" | "shell";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`viewport-section ${tone === "shell" ? "bg-shell" : "bg-carton"} ${className}`}
    >
      <div className="viewport-section__inner">{children}</div>
    </section>
  );
}
