import Image from "next/image";

type Slot = {
  id: string;
  src: string | null;
  ratio: string;
  alt: string;
};

/**
 * A photograph, or an honest hole where one will go.
 *
 * The design is photo-led and no photography exists yet, so every slot renders
 * at its final aspect ratio either way. The layout is finished now; dropping a
 * file into public/images/product/ and setting `src` in lib/product.ts changes
 * nothing about the page except what is inside the frame.
 *
 * A missing image is drawn as a visible, labelled absence rather than a blank
 * box, so it cannot quietly ship.
 */
export function PhotoSlot({ slot, priority = false }: { slot: Slot; priority?: boolean }) {
  return (
    <figure
      className="relative overflow-hidden rounded-[18px] border border-line bg-shell-deep"
      style={{ aspectRatio: slot.ratio }}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-4">
          <span
            aria-hidden
            className="block h-full w-full rounded-[10px] border border-dashed border-line-strong"
          />
          <figcaption className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 p-6 text-center">
            <span className="egg h-9 w-7 opacity-40" aria-hidden />
            <span className="mt-2 text-[0.8rem] font-medium text-ink-soft">{slot.alt}</span>
            <span className="tnum text-[0.75rem] text-ink-faint">
              photo slot {slot.id}
            </span>
          </figcaption>
        </div>
      )}
    </figure>
  );
}
