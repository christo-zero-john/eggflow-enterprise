# Photography brief

Every image the site needs, with a ready-to-paste generation prompt for each.

Read §1 and §2 before generating anything. They are short, and they are what
stops you producing eighteen images that do not look like they came from the
same shoot.

---

## 1. Read this first: what may and may not be AI-generated

Each shot below is tagged one of two ways.

**`AI-OK`** — context, mood, environment, backgrounds, lifestyle scenes. The
product is absent, heavily out of focus, or incidental. Generate these freely.

**`REAL-PHOTO-REQUIRED`** — the shot a buyer studies to decide what they are
getting: the product filling the frame, its proportions, its colour, its
surface, how the front slot actually looks. Generate a placeholder now if you
like, but **replace it with a photograph of the real unit before you take a
single order.**

The reason is not aesthetic. An AI image of a physical product you ship is a
picture of a thing that does not exist. The customer receives something that
does not match, and you get the return, the bad review, and — under the CCPA
2023 guidelines on misleading representation — a claim you cannot defend. It is
also the single fastest way to lose the trust the rest of this site is built to
earn.

A phone camera, a window, and a sheet of white A3 card as a bounce will beat any
generated image for the `REAL-PHOTO-REQUIRED` shots. It takes about forty
minutes.

## 2. House style — paste this into every prompt

Consistency across images matters more than any individual image. Append this
block to every prompt below so the set reads as one shoot:

```
STYLE: modern direct-to-consumer product photography. Soft diffused daylight
from a large window at 45 degrees, gentle falloff, no hard flash. Warm neutral
palette — cream, oat, soft clay, warm grey. Clean uncluttered composition with
generous negative space. Shallow but not extreme depth of field. Natural
realistic colour, no HDR, no heavy saturation, no vignette. Shot on a 50mm lens,
eye-level unless stated. Photographic realism, not a 3D render, not
illustration. Neutral white balance, true-to-life plastic surface with a subtle
matte finish.
```

```
AVOID: text, watermarks, logos, brand names, packaging labels, extra unrelated
products, cluttered kitchen backgrounds, dramatic shadows, blue or cold colour
cast, plastic that looks glossy or wet, cracked or broken eggs, hands with
distorted fingers, more than four tiers, motorised or electronic parts, cables,
buttons, screens.
```

### Describing the product accurately

Most generators do not know this object. Paste this description into any prompt
that shows the product:

```
PRODUCT: a four-tier egg rack for a refrigerator, moulded from a single piece of
matte plastic. Four narrow shelves stacked vertically, each shelf a shallow
channel tilted a few degrees downward toward the front. Each channel holds about
seven chicken eggs in a single line, nose to tail. Raised side walls run along
each channel so eggs cannot roll off sideways. At the low front end of each
channel there is an open slot where one egg sits exposed and can be lifted out.
No motor, no wires, no buttons, no lid. Simple, functional, utilitarian.
```

---

## 3. The manifest

`W` is the minimum width to generate. Always generate larger than you think —
downscaling is free, upscaling is not. Deliver **WebP** where possible, PNG
otherwise. Filenames are exact; the code expects them.

| # | id / filename | Ratio | Min W | Tag | Used on |
|---|---|---|---|---|---|
| 01 | `hero-primary` | 4:3 | 2400 | REAL-PHOTO-REQUIRED | Home hero |
| 02 | `hero-ambient` | 21:9 | 2800 | AI-OK | Home hero background band |
| 03 | `pdp-front` | 1:1 | 2000 | REAL-PHOTO-REQUIRED | PDP gallery, frame 1 |
| 04 | `pdp-side-tilt` | 1:1 | 2000 | REAL-PHOTO-REQUIRED | PDP gallery, frame 2 |
| 05 | `pdp-front-slot` | 1:1 | 2000 | REAL-PHOTO-REQUIRED | PDP gallery, frame 3 |
| 06 | `pdp-top-down` | 1:1 | 2000 | REAL-PHOTO-REQUIRED | PDP gallery, frame 4 |
| 07 | `pdp-in-hand` | 1:1 | 2000 | REAL-PHOTO-REQUIRED | PDP gallery, frame 5 — scale |
| 08 | `context-in-fridge` | 4:5 | 1800 | REAL-PHOTO-REQUIRED | "Will it fit" section |
| 09 | `context-kitchen` | 3:2 | 2400 | AI-OK | Home, atmosphere band |
| 10 | `seq-01-loaded` | 3:2 | 2000 | REAL-PHOTO-REQUIRED | Scroll story, frame 1 |
| 11 | `seq-02-lifting` | 3:2 | 2000 | REAL-PHOTO-REQUIRED | Scroll story, frame 2 |
| 12 | `seq-03-advanced` | 3:2 | 2000 | REAL-PHOTO-REQUIRED | Scroll story, frame 3 |
| 13 | `colour-pair` | 3:2 | 2400 | REAL-PHOTO-REQUIRED | Colour selector |
| 14 | `detail-rail` | 3:2 | 2000 | REAL-PHOTO-REQUIRED | Materials section, macro |
| 15 | `packaging-flat` | 3:2 | 2000 | REAL-PHOTO-REQUIRED | Shipping page |
| 16 | `texture-backdrop` | 16:9 | 2400 | AI-OK | Section backgrounds |
| 17 | `og-image` | 1200×630 exact | 1200 | AI-OK (composite) | Social sharing card |

---

## 4. The prompts

Each is written to be pasted whole. Append the **STYLE** and **AVOID** blocks
from §2, and the **PRODUCT** block wherever the rack is visible.

### 01 · `hero-primary` — 4:3 · REAL-PHOTO-REQUIRED

The one image that carries the site. The product, fully loaded, hero-lit.

```
A four-tier egg rack in soft warm grey plastic, fully loaded with about
twenty-eight brown and cream chicken eggs arranged in four neat single-file
lines, one line per tier. Photographed three-quarter front at eye level on a
plain warm oat-coloured surface against a seamless cream backdrop. The tilt of
each tier is clearly visible. The frontmost egg on each tier sits in an open
slot at the low end, slightly proud of the others. Generous empty space above
and to the right of the product for a headline to sit. Soft daylight from the
left, gentle shadow falling right.
```

If shooting for real: fill every tier, wipe every egg, shoot at egg height not
from above, and leave a third of the frame empty on one side.

### 02 · `hero-ambient` — 21:9 · AI-OK

A wide, almost-empty band that sits behind the hero. No product.

```
An extremely minimal wide horizontal background. A seamless warm cream and oat
gradient surface with the softest possible shadow gradient falling from upper
left to lower right. Completely empty, no objects, no product, no texture
detail. The feel of a bright kitchen wall in morning light, entirely out of
focus. Calm, warm, spacious.
```

### 03 · `pdp-front` — 1:1 · REAL-PHOTO-REQUIRED

Straight-on catalogue shot. This is the one that must be truthful.

```
A four-tier egg rack in warm grey plastic, loaded with chicken eggs,
photographed straight on from the front at eye level, perfectly centred and
symmetrical, on a seamless pure white studio background. The full product fills
the frame with even margins on all four sides. Even soft shadowless lighting.
Clean e-commerce catalogue photograph.
```

### 04 · `pdp-side-tilt` — 1:1 · REAL-PHOTO-REQUIRED

The shot that proves the mechanism. The tilt must be unmistakable.

```
A four-tier egg rack photographed from directly side-on, profile view, at eye
level, on a seamless pure white background. The downward slope of each of the
four tiers toward the front is the subject of the photograph and is clearly
visible as four parallel angled lines. Eggs rest along each tier, gathered
toward the low front end. Soft even lighting, minimal shadow.
```

### 05 · `pdp-front-slot` — 1:1 · REAL-PHOTO-REQUIRED

Macro on the single detail buyers do not understand from words.

```
Close macro photograph of the open front slot of a plastic egg rack, where a
single brown chicken egg rests in the lowest point of a tilted channel, ready to
be lifted out. The raised side walls of the channel and the smooth matte plastic
surface are sharp and clearly visible. The egg immediately behind it is slightly
soft in the background. Shallow depth of field, warm soft light, seamless cream
background.
```

### 06 · `pdp-top-down` — 1:1 · REAL-PHOTO-REQUIRED

```
A four-tier egg rack photographed from directly above, flat lay, perfectly
square to the camera, on a seamless warm oat background. All four tiers and
their lines of eggs are visible receding from front to back. Even diffused
overhead light, soft shadow directly beneath the product.
```

### 07 · `pdp-in-hand` — 1:1 · REAL-PHOTO-REQUIRED

Scale. Nothing communicates size like a hand.

```
A person lifting a single brown chicken egg out of the open front slot of a
four-tier plastic egg rack with their thumb and two fingers. Only the hand and
forearm are in frame, natural skin tone, short clean nails, no jewellery, no
nail polish. The rack is sharp, the background is a softly blurred warm neutral
kitchen. Natural daylight. The hand is relaxed and the grip looks effortless.
```

Generator hands are unreliable. If you generate this one, check the fingers.

### 08 · `context-in-fridge` — 4:5 · REAL-PHOTO-REQUIRED

Answers the top question on the site: will it fit my shelf.

```
A four-tier egg rack loaded with eggs, sitting on a glass shelf inside an open
refrigerator, photographed from the front at shelf height, vertical portrait
orientation. Clean modern fridge interior with white and pale grey surfaces and
a few unobtrusive everyday items softly out of focus behind. Cool clean interior
fridge light mixed with warm room light from the front. The clearance between
the top of the rack and the shelf above is clearly visible.
```

### 09 · `context-kitchen` — 3:2 · AI-OK

```
A calm modern Indian kitchen counter in warm morning light. Pale oat and cream
surfaces, a wooden board, a linen cloth, a small bowl of brown eggs. Uncluttered
and airy with a lot of empty counter space. The composition is a background
scene with nothing in sharp focus in the centre. Soft warm daylight from a
window to the left.
```

### 10 · `seq-01-loaded` — 3:2 · REAL-PHOTO-REQUIRED

Frames 10–12 are one sequence. **Camera and lighting must not move between
them.** For a real shoot: put the phone on a tripod or prop it, take all three
without touching it. This is what makes the scroll animation work.

```
A four-tier egg rack fully loaded with eggs, photographed three-quarter front at
eye level on a seamless warm oat surface. Every tier is full, the frontmost egg
of the top tier sits in the open front slot. Nothing is being touched. Soft
daylight from the left.
```

### 11 · `seq-02-lifting` — 3:2 · REAL-PHOTO-REQUIRED

```
The exact same four-tier egg rack, same camera position, same framing, same
lighting as the previous image. A hand is now lifting the frontmost egg of the
top tier upward and out of the open slot. The slot beneath it is momentarily
empty. Everything else in the frame is unchanged.
```

### 12 · `seq-03-advanced` — 3:2 · REAL-PHOTO-REQUIRED

```
The exact same four-tier egg rack, same camera position, same framing, same
lighting as the previous two images. The hand is gone. The next egg has rolled
forward into the front slot of the top tier and now rests where the removed egg
was. That tier holds one fewer egg. Everything else in the frame is unchanged.
```

### 13 · `colour-pair` — 3:2 · REAL-PHOTO-REQUIRED

Colour accuracy is a top return reason. Match the real units.

```
Two four-tier egg racks side by side on a seamless cream background,
photographed three-quarter front at eye level. The left one is warm mid-grey
plastic, the right one is soft off-white plastic. Both are loaded with eggs.
Identical lighting on both, even and soft, so the two colours can be compared
accurately. Equal spacing and margins.
```

### 14 · `detail-rail` — 3:2 · REAL-PHOTO-REQUIRED

```
Extreme close macro of the moulded plastic channel of an egg rack, showing the
raised side wall, the smooth matte surface, the subtle moulding seam and the
gentle curve where the channel cradles an egg. Abstract and tactile, filling the
frame. Very shallow depth of field, soft raking daylight revealing the surface
texture.
```

### 15 · `packaging-flat` — 3:2 · REAL-PHOTO-REQUIRED

```
A four-tier egg rack lying beside a plain unbranded brown corrugated cardboard
shipping box and a sheet of protective wrap, arranged neatly on a warm oat
surface, photographed from a high three-quarter angle. Calm and orderly, no
clutter, no labels or printed text on the box. Soft even daylight.
```

### 16 · `texture-backdrop` — 16:9 · AI-OK

```
An abstract minimal background of a warm cream plaster wall with the very
softest gradient of light falling across it from upper left to lower right.
Extremely subtle, almost flat, no visible texture detail, no objects. Calm and
neutral, intended to sit behind text.
```

### 17 · `og-image` — 1200×630 exact · AI-OK

Generate the scene only. Text is added in code, not in the image.

```
A four-tier egg rack loaded with brown eggs, positioned in the right third of a
wide horizontal frame on a seamless warm cream background, with the entire left
two-thirds of the frame empty and uncluttered for text to be placed over it
later. Soft warm daylight from the left. Clean, premium, spacious.
```

---

## 5. Delivering the files to me

1. Name each file exactly its `id` from the manifest, plus the extension.
   `hero-primary.webp`, `pdp-front.webp`, and so on.
2. Put them all in `public/images/product/`.
3. Tell me they are in, and I will wire them into `src/lib/product.ts`, delete
   the corresponding placeholders, and regenerate the alt text.

Do not rename, do not nest them in subfolders, and do not resize below the
minimum widths — the layout crops from a larger original at several breakpoints.

## 6. Alt text

Alt text is written in code, not supplied with the images, because it must
describe what the image shows in the context of the surrounding copy. The rule
used throughout: describe the mechanism or the fact the image is there to prove,
never the phrase "image of". `pdp-side-tilt` is not "side view of an egg rack" —
it is "the four tiers seen from the side, each sloping down toward the front".

## 7. Until the real files arrive

Every slot renders a labelled SVG placeholder at its exact aspect ratio, showing
the slot id and the intended dimensions. This means:

- The layout is final now. Nothing shifts when real images land.
- No the marketplace image CDN URL remains anywhere in the codebase.
- A missing image is visible as a missing image, rather than silently collapsing
  a section to zero height.

Placeholders are generated by `scripts/make-placeholders.mjs` and written to
`public/images/product/`. Replacing one is a single file drop; no code change is
needed as long as the filename matches the manifest.
