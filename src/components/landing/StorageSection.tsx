import Image from "next/image";
import { ViewportSection } from "./ViewportSection";

const benefits = [
  ["Stores upright", "Uses a narrow strip of shelf instead of spreading eggs across a flat tray."],
  ["Contents stay visible", "See what is left without opening a carton or lifting a stack."],
  ["Easy front access", "The curved outlet keeps the foremost egg within reach."],
] as const;

export function StorageSection() {
  return (
    <ViewportSection tone="shell" labelledBy="storage-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <figure className="relative mx-auto aspect-[4/5] h-auto w-full max-w-[430px] overflow-hidden rounded-[20px] bg-carton">
          <Image
            src="/images/lifestyle/fridge.png"
            alt="White rolling egg shelf standing on a refrigerator glass shelf"
            fill
            sizes="(min-width: 1024px) 430px, 90vw"
            className="object-cover"
          />
        </figure>

        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">In your fridge</p>
          <h2 id="storage-heading" className="mt-3 font-display text-[clamp(2.2rem,3.4vw,3rem)] font-bold">A place for every egg.</h2>
          <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-soft">
            Keep the eggs together and the dispensing tray easy to reach, without rearranging a
            carton every time you need one.
          </p>

          <ul className="mt-6 border-t border-line">
            {benefits.map(([title, body]) => (
              <li key={title} className="grid grid-cols-[1fr_1.7fr] gap-5 border-b border-line py-3">
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="text-[0.9rem] leading-normal text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
          <a href="#size" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold underline decoration-line-strong underline-offset-4">
            Check the size
          </a>
        </div>
      </div>
    </ViewportSection>
  );
}
