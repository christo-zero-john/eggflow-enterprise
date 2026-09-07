import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-24">
      <p className="tnum text-[0.9rem] font-medium text-ink-faint">404</p>
      <h1 className="mt-3 font-display text-h2 font-bold">There is nothing on this page.</h1>
      <p className="mt-4 text-ink-soft">
        The link is wrong, or this page has moved. Everything about the shelf is on one page.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-yolk px-6 py-3 font-semibold text-ink transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-yolk-deep active:translate-y-0 active:scale-[0.985]"
        >
          Back to the start
        </Link>
      </p>
    </main>
  );
}
