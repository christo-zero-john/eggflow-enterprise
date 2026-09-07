import type { ReactNode } from "react";

/**
 * The one button on this site.
 *
 * Three variants, one shape, one size floor (44px, so it is a real touch
 * target). Every variant has a hover state, a pressed state and a visible
 * focus ring — a button that does not visibly respond to being pressed reads
 * as broken on touch, where there is no hover to fall back on.
 *
 * The press effect is deliberately small: 1px of travel and a slight scale.
 * Anything larger reads as a toy.
 */
type Variant = "primary" | "secondary" | "onInk";

const base =
  "inline-flex min-h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.985] active:duration-75 " +
  "motion-reduce:transform-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-yolk text-ink shadow-[0_2px_0_0_var(--color-yolk-deep)] hover:bg-yolk-deep hover:shadow-[0_4px_10px_-2px_rgba(120,80,10,0.45)] active:shadow-[0_1px_0_0_var(--color-yolk-deep)]",
  secondary:
    "border border-line-strong bg-transparent font-medium text-ink hover:border-ink hover:bg-shell active:bg-shell-deep",
  onInk:
    "border border-shell/30 bg-transparent font-medium text-shell hover:border-shell/70 hover:bg-shell/10 active:bg-shell/15",
};

export function Cta({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}

/** A row of buttons that wraps sensibly on a phone. */
export function CtaRow({
  children,
  centered = false,
  id,
}: {
  children: ReactNode;
  centered?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      {children}
    </div>
  );
}
