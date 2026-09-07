# Design system

Direction: **modern DTC — warm, confident, photo-led.**

The previous design was "cold storage": fridge whites, grey polypropylene, a
teal accent, 3px radii. It was coherent and it read as a technical document. The
new direction keeps its discipline and inverts its temperature.

## 1. The idea in one paragraph

An egg is warm-coloured, organic, and slightly imperfect. A fridge is cold,
rectilinear and clinical. This product sits between them, and so does the
design: a warm cream ground, generous space, a soft serif for display, and a
deep moss green that keeps the whole thing from becoming another amber egg
website. Yolk gold exists, but it is a seasoning — a badge, an underline, an
active state — never a background and never a button.

**The trap being avoided:** egg product → amber and cream everything → looks
like fourteen other stores. Warm ground with a cool-dark accent is what
separates this from that.

## 2. Colour

Tokens live in `src/styles/globals.css` under Tailwind v4 `@theme`.

```css
@theme {
  /* ground + surface */
  --color-cream:      #FBF7F2;  /* page ground                              */
  --color-oat:        #F2EBE1;  /* alternating band, cards on cream         */
  --color-surface:    #FFFFFF;  /* raised cards, form fields                */
  --color-shell:      #EDE4D8;  /* hairline-free separation, image mats     */

  /* ink */
  --color-ink:        #1C1815;  /* headings, body. 15.8:1 on cream          */
  --color-ink-soft:   #6A5F56;  /* secondary. 5.4:1 on cream                */
  --color-ink-faint:  #9C9086;  /* meta only, never body. 3.2:1 — large text
                                   or non-essential UI exclusively          */

  /* accent — the load-bearing colour */
  --color-moss:       #33513F;  /* primary buttons, links. 8.4:1 on cream   */
  --color-moss-deep:  #24382C;  /* hover                                    */
  --color-moss-tint:  #E4EBE4;  /* quiet backgrounds, selected states       */

  /* highlight — used sparingly, on purpose */
  --color-yolk:       #D99A2B;  /* badges, underlines, the demo eggs        */
  --color-yolk-tint:  #FAF0DC;

  /* state */
  --color-clay:       #A8452A;  /* errors, destructive. 6.1:1 on cream      */
  --color-clay-tint:  #F8E9E4;

  /* borders */
  --color-line:       #E3D9CC;
  --color-line-strong:#C9BBA9;
}
```

### Rules

1. **Moss is the only button colour.** A second competing call to action makes
   both weaker.
2. **Yolk is never a background larger than a badge**, and never a button. It
   marks: the eggs in the interactive demo, the "in stock" style badges, and the
   underline under the active nav item.
3. **`ink-faint` is never body text.** Meta, captions and disabled states only.
4. **Every text/background pair must clear 4.5:1**, large display text 3:1. The
   values above are measured, not estimated.

### Dark mode

Deferred, deliberately, and documented as a deferral rather than an omission.

The previous build had a good dark theme. A warm-cream photo-led design does not
invert cleanly — the photography carries a cream background baked into the
pixels, so a dark UI around cream images looks broken rather than dark. Doing it
properly means either a second set of images or a hard commitment to
transparent-background cutouts.

Until then `color-scheme: light` is declared so browser UI matches, rather than
shipping a half-working dark theme.

## 3. Type

Two families, both from Google Fonts via `next/font`, both variable.

| Role | Family | Why |
|---|---|---|
| Display | **Fraunces** (variable, `opsz` + `SOFT` + `WONK`) | A warm modern serif with real character. Its optical-size axis means the same family works at 72px and 20px. Its slight quirk is what keeps the page from looking like a template. |
| Text / UI | **Instrument Sans** | A clean neutral grotesque that gets out of the way. Chosen over Inter specifically because Inter is the default everyone reaches for and reads as such. |

```css
--font-display: var(--font-fraunces), Georgia, serif;
--font-sans:    var(--font-instrument), ui-sans-serif, system-ui, sans-serif;
```

### Scale

Fluid where it matters, fixed where it does not.

```css
--text-display: clamp(2.75rem, 1.6rem + 5.2vw, 5.5rem);  /* h1, display only */
--text-h2:      clamp(2rem,    1.5rem + 2.2vw, 3.25rem);
--text-h3:      clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem);
--text-lead:    clamp(1.125rem,1.05rem + 0.5vw, 1.375rem);
--text-body:    1.0625rem;
--text-small:   0.9375rem;
--text-micro:   0.8125rem;
```

Rules:

- Display and h2 use `--font-display`, weight 400–500, `letter-spacing: -0.02em`,
  `line-height: 0.95–1.05`, `text-wrap: balance`.
- Everything else is `--font-sans`.
- Body `line-height: 1.65`, measure capped at `68ch`.
- All numerals in specs, prices and quantities are `font-variant-numeric:
  tabular-nums lining-nums`. A price that shifts width when the quantity changes
  looks broken.

## 4. Space, radius, elevation

4px base scale: `4 8 12 16 24 32 48 64 96 128`.

Section rhythm: `clamp(4rem, 9vw, 8rem)` block padding. Generous is the point —
whitespace is most of what reads as "premium", and it costs nothing.

```css
--radius-sm: 8px;    /* inputs, badges         */
--radius:    14px;   /* buttons, cards          */
--radius-lg: 24px;   /* image frames, panels    */
--radius-xl: 32px;   /* hero media              */
```

Shadows are warm-tinted and soft. A neutral-grey shadow on a cream ground reads
as dirt.

```css
--shadow-sm: 0 1px 2px rgb(60 45 30 / 0.05);
--shadow:    0 4px 16px -4px rgb(60 45 30 / 0.10);
--shadow-lg: 0 24px 48px -16px rgb(60 45 30 / 0.16);
```

## 5. Motion

Rich and scroll-driven, as chosen — with one governing rule.

**Motion explains the mechanism or it does not exist.** The product's entire
value is that eggs roll forward. Animating that is information. Fading in a
paragraph because it entered the viewport is decoration, and decoration is what
makes a site feel dated in eighteen months.

| Where | What | How |
|---|---|---|
| Hero rack | Click an egg, the line advances | `layout` animation, spring `{ stiffness: 260, damping: 30 }` |
| `/how-it-works` | Pinned section, eggs advance as you scroll | `useScroll` + `useTransform`, scroll-linked not time-linked |
| Section entry | 12px rise + fade, once | `whileInView`, `viewport={{ once: true, margin: "-15%" }}`, 400ms |
| Buttons | Background and 1px lift | CSS transition 150ms |
| Sticky buy bar | Slides in past the hero CTA | `useScroll` threshold |
| Gallery | Crossfade, no slide | 250ms |

Durations: 150ms UI, 250–400ms content, 600ms+ only for the scroll sequences.
Easing `cubic-bezier(0.2, 0, 0, 1)` everywhere except springs.

### Reduced motion is not a token gesture

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Plus, in components: `useReducedMotion()` makes the scroll sequence render as
three static captioned frames rather than a pinned scrubbing section, and the
rack demo advances instantly on click. The information is still there; only the
movement is gone. A pinned scroll-jacked section with motion disabled but
pinning intact is worse than no animation at all.

## 6. Components

| Component | Notes |
|---|---|
| `ui/Button` | Variants: `primary` (moss), `secondary` (outline, `line-strong`), `quiet` (text + underline). One size for touch: min 44px. |
| `ui/Field` | Label always visible above the input. Never a placeholder as a label. Error text below in `clay`, `aria-describedby` wired. |
| `ui/Money` | Formats paise → `₹222`. Tabular numerals. The only place currency is rendered. |
| `ui/Badge` | Small, `yolk-tint` or `moss-tint`. |
| `ui/Disclosure` | Native `<details>`, carried over unchanged. It was right. |
| `ui/Placeholder` | Labelled aspect-ratio box standing in for a missing photograph. |
| `marketing/Hero` | Display heading, lead, primary CTA, price line, hero image. |
| `marketing/MechanismScroll` | The pinned three-frame sequence. |
| `marketing/ProofRow` | Rating, review count, source named on-screen. |
| `marketing/Gallery` | Thumbnail rail + stage, keyboard-navigable. |
| `marketing/StickyBuyBar` | Mobile only, appears after the hero CTA scrolls away. Price + Order now. |
| `order/OrderForm` | Single screen. zod schema shared with the server. |
| `admin/OrderTable` | Dense, tabular numerals, status badges, oldest `new` first. |

## 7. Accessibility, as build criteria not aspiration

- Contrast measured for every pair; nothing ships that fails 4.5:1 body / 3:1 large.
- Visible focus ring on every interactive element: 2px moss, 2px offset. Never
  `outline: none` without a replacement.
- Touch targets 44×44px minimum.
- The scroll sequence has a static equivalent under reduced motion, and its
  content is real text in the DOM, not baked into images.
- Form errors are announced, associated with their input, and describe the fix
  ("Pincode must be 6 digits") rather than the failure ("Invalid").
- One `h1` per page; heading levels never skip.
- The interactive rack demo is keyboard-operable and its state is announced via
  a polite live region.

## 8. What is deliberately not in the system

No icon library — the handful of icons are inline SVG. No component library — at
this size a dependency costs more than it saves and its defaults would fight the
direction. No CSS-in-JS. No dark mode yet (§2). No animation on page load: the
first thing a visitor sees should be the finished page, not a page assembling
itself.
