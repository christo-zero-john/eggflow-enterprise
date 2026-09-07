import type { ReactNode } from "react";

export function Container({
  children,
  narrow = false,
  className = "",
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={`ef-container${narrow ? " ef-container--narrow" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
