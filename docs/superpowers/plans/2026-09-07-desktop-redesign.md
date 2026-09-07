# EggFlow Desktop Redesign Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan task-by-task after design approval. Checkboxes below track future implementation, not work completed while preparing this document.

**Goal:** Replace inaccurate product simulations with credible product imagery and create a balanced desktop shopping page whose main sections fit the available viewport without clipping.

**Architecture:** Keep the Next.js page composition and established visual identity. Rebuild section layout around shared viewport and spacing rules; isolate header visibility, image storytelling and gallery selection into small client components. Keep ordinary content server-rendered.

**Tech stack:** Existing Next.js 16.3.4, React 19, Tailwind CSS and Framer Motion. No new animation library, smooth-scroll engine or commerce dependency is needed.

**Spec:** Sections 1–10 of this document are the design specification. Sections 11–13 define implementation and acceptance. Status: implemented in the working tree on 2026-09-07; commerce destinations, mobile redesign, real-product photography and physical measurement remain explicitly deferred.

**Implementation note:** The shipped design uses the seven-part sequence specified here, two accessible desktop text scrollers, direction-aware fixed navigation, and the matched `ready` / `take` / `next` story assets. The compact “what comes in the box” content appears in the gallery and specifications rather than adding another full-screen section.

## 1. Decisions and scope

The recommendation is a structural desktop redesign, retaining the brand colours and typefaces. Patching individual margins will not fix the combination of oversized content, inconsistent section rules and inaccurate product art.

| User direction | Design response |
|---|---|
| Retain scrolling interaction but use images | Keep one dark, pinned product story with copy on the left and changing images on the right. Remove the rail simulation. |
| Purchase buttons are intentionally unfinished | Preserve the current action destinations during this design phase. Do not build checkout, messaging, reservations or payment handling. Their unfinished state is not a desktop-design acceptance failure. |
| Remove the unwanted section | Interpret this as removing the dedicated **“What it does not do”** section. This does not mean removing useful specifications or FAQs. |
| Desktop first | Design and verify desktop widths and heights now. Mobile composition and mobile navigation are a later phase. Short desktop windows and desktop zoom remain in scope. |
| Sections should feel like complete screens | Give the main narrative sections a shared viewport composition. Following the user's refinement, specifications and FAQs use 100dvh desktop sections with one scrollable text panel each. Footers remain compact; short-window/accessibility fallbacks use document flow. |
| Navbar may hide down/reappear up | Implement a fixed header that hides on deliberate downward scrolling and returns on upward scrolling or keyboard focus. Its appearance must never resize the story stage. |
| Plan additional images | Reuse the six existing images for the first layout pass. Plan a matched three-image story set; make further assets conditional on a specific information gap. |

Deliverable of this task is this document. Application code, generated assets and purchase flows are not changed by the planning task. Existing uncommitted work belongs to the user/Claude and must be preserved during later implementation.

## 2. Current-state audit: what is actually happening

### Evidence and limits

Read the current page, layout, styles, product data and landing components. Inspected the running page at `http://localhost:3000` in an isolated headless browser at 1440×900, 1366×768 and 1280×720. Font loading completed before measuring. The audit used the existing server on port 3000; it did not start or stop that server.

Measurements describe the current development build, with FAQs initially closed. Screenshots may capture an animation during entry; an empty rail in a screenshot is not evidence of a persistent loading failure. These findings establish layout and code behaviour, not conversion performance or real-product mechanical accuracy.

Local evidence: `.playwright-mcp/desktop-plan/measurements.json` and screenshots in the same directory. This is ignored local audit output, not a required production asset. Key measurements are preserved here so the plan is useful without those files.

| Region | Height at 1440×900 | Height at 1366×768 | Finding |
|---|---:|---:|---|
| Header | 70 px | 70 px | CSS assumes 58 px for sticky offsets. |
| Hero, excluding header | 766 px | 760 px | Hero + header reaches 830 px on a 768 px-high window. |
| Benefit strip | 295 px | 295 px | A separate large pause before the comparison. |
| Comparison | 675 px | 675 px | Followed by another roughly 150 px CTA wrapper outside the section. |
| Dark mechanism track | 2700 px | 2304 px | Exactly 300vh; the visible sticky stage is a separate measurement. |
| Fit section | 670 px | 670 px | Size is content-driven rather than coordinated with the viewport. |
| Colour/gallery section | 1083 px | 1083 px | The stacked image mosaic makes a complete screen impossible. |
| “What it does not do” | 550 px | 550 px | Remove per user direction. |
| Specifications | 1156 px | 1156 px | Long table, introduction, note and CTA create a tall left column. |
| FAQ, closed | 848 px | 848 px | Exceeds a 768 px viewport even before expansion. |
| Closing purchase area | 616 px | 616 px | Intentionally unfinished action flow. |

At 1280×720, the hero plus header reaches about 819 px. No document-wide horizontal overflow was observed at these three sizes. The main problem is vertical composition, not a proven global horizontal overflow defect.

### Root causes

1. **Most sections are not 100vh today.** Repeated `py-20 sm:py-24` gives 192 px of vertical padding on desktop, in addition to content of arbitrary height. The site layout's `min-h-dvh` applies to the page wrapper, not each section.
2. **Viewport calculations use the wrong header height.** `--header-h: 58px` disagrees with the roughly 70 px rendered header. The pinned region can sit beneath the header by about 12 px.
3. **The hero is assembled as separate grid rows.** A tall heading, large row gaps, description, CTA margins and stats compete with a large illustration. On shorter windows the final content approaches or passes the bottom edge.
4. **The gallery is effectively an image stack.** One full-width square plus a second row of differently shaped frames is too tall for the intended screen-sized section.
5. **Specs concentrate height on one side.** Twelve rows and substantial supporting copy sit beside a comparatively short visual, leaving the page visibly unbalanced.
6. **The mechanism text is absolutely positioned in a reserved 7.5rem area.** Longer copy can exceed that reservation; the sticky ancestor uses `overflow-hidden`. This is a clipping risk even if a particular capture happens to fit.
7. **The product drawings communicate the wrong form.** Hero code builds posts and open rails rather than the enclosed body and curved outlet in the references. The size drawing also shows four side openings and no faithful projecting chute.
8. **The six new image files are not connected.** `product.images` still contains null sources, so the page renders labelled photo placeholders.

## 3. Recommended design direction

Make the product the strongest visual, supported by concise copy and predictable space. Keep warm ivory, dark brown and amber. Keep the existing display and body fonts, but reduce oversized headings and give multiline headings more leading.

Three approaches were considered:

| Approach | Benefit | Limitation | Decision |
|---|---|---|---|
| Replace SVGs and adjust margins only | Small implementation scope | Leaves overloaded sections and inconsistent rhythm | Reject |
| Rebuild composition using current brand identity | Fixes product representation, pacing and fit together | Requires page-level restructuring | **Recommend** |
| Create an entirely new brand style and visual system | Maximum stylistic freedom | Adds work without resolving a demonstrated brand problem | Defer |

The plan does not predict a conversion uplift. Its intended improvements are product recognition, easier scanning, less contradictory information and fewer layout distractions. Commercial outcomes must be evaluated once the purchase journey exists.

## 4. Desktop viewport and spacing contract

### Screen-sized does not mean clipped

Major sections should read as complete compositions at 1280×720, 1366×768, 1440×900 and 1920×1080. At normal desktop zoom, target one viewport per major section, with exceptions explicitly listed below.

Use `100dvh` for viewport-relative layout. Use `min-height` for ordinary sections, so content has a safe escape when text or zoom makes it larger. Specifications and FAQs are explicit exceptions: use a 100dvh desktop shell with a constrained, accessible `overflow-y: auto` text panel. A hard height with hidden overflow must never make text inaccessible. The story's decorative image layers may be clipped within their frame.

**Recommended safe frame:** use a fixed 72 px header and equal top/bottom section padding `P = clamp(88px, 10dvh, 112px)`. The top allowance clears the header by at least 16 px; matching bottom space avoids the top-heavy composition the user dislikes. When the header hides, these margins remain equal and do not collapse.

| Viewport height | Each vertical margin P | Available content height H − 2P |
|---:|---:|---:|
| 720 px | 88 px | 544 px |
| 768 px | 88 px | 592 px |
| 900 px | 90 px | 720 px |
| 1080 px | 108 px | 864 px |

These are layout budgets, not assertions that every paragraph will fit automatically. Fit the composition to the budget using the content limits below. At heights below 680 px, or when fixed headings/controls leave less than 280 px of useful text-panel height, disable pinning and internal text scrolling and allow ordinary document flow. Ordinary narrative sections also fall back when their content exceeds the safe frame; overflowing specifications/FAQ text is expected and belongs in the designated panel. Do not solve overflow by shrinking body copy to 12–14 px.

### Shared design rules

| Element | Desktop rule |
|---|---|
| Content width | Maximum 1200 px; horizontal gutters `clamp(32px, 5vw, 80px)` |
| Major columns | Generally 44% copy / 56% media within the width remaining after a 40–64 px gap; use fractional grid tracks, not percentages plus gap |
| H1 | 56–72 px, line-height 1.03–1.08; target at most three lines on the shortest test viewport |
| H2 | 36–48 px, line-height 1.08–1.15; at most two lines |
| Body | 17–19 px, line-height 1.5–1.6; copy width 38–48 characters |
| Supporting labels | 14–16 px with readable contrast |
| Spacing scale | 8, 12, 16, 24, 32, 48, 64 px |
| Heading to body | 16–24 px |
| Body to primary action | 24–32 px |
| Related controls | 12–16 px |
| Visual treatment | Restrained 16–20 px image corners; remove nested borders and large floating shadows |
| Main media | Maximum height from the available-content budget; `contain` when the full product must remain visible |
| Whole-page behaviour | Native scrolling; no mandatory scroll snap or wheel interception. One internal text scroller is allowed in each of specs and FAQ only; no nested scrollers inside those panels. |

Group each section's copy, action and supporting information into one balanced content block. Avoid pushing a final CTA to the bottom with `justify-between`. Do not combine the shared section padding with another large `py-24` inner wrapper.

### Section-height policy

| Section | Target at normal desktop sizes | Exception |
|---|---|---|
| Hero | 100dvh | Natural growth for accessibility/short-window fallback |
| Storage benefit | 100dvh | Same fallback |
| Image story | Visible stage 100dvh; total track initially 220dvh | Ordinary static content when pinning is unsuitable |
| Fit and specifications | 100dvh | Fixed visual/heading, scrollable specs panel; natural flow in short-window fallback |
| Colour/gallery | 100dvh | Images stay within one media frame |
| FAQs | 100dvh | Answers expand inside one scrollable question panel; natural flow in short-window fallback |
| Closing purchase presentation | Approximately 50–65dvh | Future commerce design may change it |
| Footer | Natural compact height | Never inflate to a full screen |

This preserves the full-screen intention while keeping long text reachable. FAQ/specification expansion changes the panel's scrollable content height, not the outer desktop section height. Short-window fallbacks may grow naturally; an accidental 1083 px gallery on a 768 px viewport remains unacceptable. Do not pad out the footer to fill a screen.

### Scrollable text panels: deliberate exceptions

This is a revision to the initial plan, which used document expansion for FAQs and specifications. The desktop version now supports the user's preference for fixed full-screen compositions with locally scrolling text.

- **Specifications:** stable product/size visual on the left; heading and concise fit summary above a scrollable specification table on the right. Keep essential dimensions visible outside the scroller once confirmed. Detailed rows and relevant notes scroll together.
- **FAQ:** short heading/introduction on the left, question list on the right. The question list is one scrollable panel; open answers belong to that same panel, never to individual answer scrollboxes.
- Use a height-constrained grid with `minmax(0, 1fr)` for the scrollable track and `min-height: 0` through its grid/flex ancestors. Apply `overflow-y: auto` only to the panel. Account for headings, gaps and any controls before assigning its remaining height.
- Preserve a visible, restrained scrollbar with stable gutter space. Show a small “Scroll for more specifications/questions” hint only while content remains below. Do not use a gradient that obscures the last lines or makes complete text look cropped.
- The panel receives native wheel/trackpad input only when the pointer is over it. Outside it, scrolling moves the page. Keep normal scroll chaining at panel boundaries (`overscroll-behavior-y: auto`); do not use wheel handlers, `preventDefault`, or `contain` to hold visitors inside it.
- If a panel genuinely overflows, make it keyboard focusable (`tabIndex=0`) with a named region and visible focus outline. Arrow/Page keys use native behaviour; Tab exits normally. Do not steal focus when the section enters the viewport.
- Opening an FAQ should keep its summary visible within the panel and reveal the beginning of the answer when necessary. Adjust only the panel's scroll position, not the whole page. Do not auto-open, auto-advance or reset panel scroll on page re-entry.
- Offer a small “Next section” anchor outside each long panel so visitors can continue without reading every row. Do not require completion or make a progress meter look compulsory.
- At 1366×768, use the 592 px safe frame to target at least 400 px of readable panel height. If text zoom or a short viewport leaves less than 280 px after headings/controls, switch to normal flow and remove the fixed section height and panel overflow constraint together.
- Test scrollbar dragging, reverse scroll chaining, keyboard entry/exit and a long FAQ opened near the panel bottom. Native chaining should be verified in the target browser rather than assumed identical across input devices.

Internal scrolling introduces a second scroll context. It is a reasonable desktop treatment for dense reference material, but should not spread to hero, benefits, gallery or short explanatory copy merely to force a screen height.

## 5. Revised page sequence and copy

### 5.1 Hero: identify the product immediately

**Question answered:** What is it, and why would I want it?

Left: small product identifier, short headline, one benefit sentence, existing price/action treatment, then at most three concise attributes. Right: a large white product studio image. Remove the interactive rack, egg counter and refill control completely from the hero.

Proposed copy:

> EggFlow Rolling Egg Shelf  
> **Your next egg, within reach.**  
> Keep eggs together in a compact upright holder, with a curved tray for easy access.

Use the existing price from product data. Retain the primary CTA destination. Keep “See how it works” as a secondary section link. Supporting labels can be “Four tiers”, “White or charcoal”, “No power needed”, subject to product-data review. Omit a headline capacity or footprint claim until the conflicting source interpretation is resolved.

Use `/images/gallery/white.png`, not the wide image inside a narrow right column. Target an image frame no taller than 520 px at 1366×768. At every size, cap it at the smaller of 520 px and the available content height; the 1280×720 safe frame provides 544 px. The media frame includes any inner padding. Keep the full chute and top visible.

Do not bake text over the image. The current wide `/images/hero.png` is an optional alternate full-width hero treatment, not required for this recommended split layout.

### 5.2 Storage benefit: show it in a real setting

**Question answered:** Where does it go, and what changes in my routine?

Use the refrigerator image on the left, contained in a height-capped frame, with short copy on the right. Proposed heading: **“A place for every egg.”** Body: “Keep your eggs together and the dispensing tray easy to reach.” Follow with three short benefit rows covering upright storage, visible contents and access at the chute.

Merge the useful content of `BenefitStrip` and `Comparison` into this chapter. Remove the separate four-card benefit strip, standalone comparison chapter and detached CTA wrapper. Do not add a fake before/after comparison or claim a percentage of shelf space saved. The refrigerator image is context, not proof of a measured fit.

A small link to “Check the size” is enough here. Do not place a second large purchase pair beneath every short block.

### 5.3 Dark image story

**Question answered:** What is the experience of using it?

Retain the dark section and scroll interaction. Detailed behaviour is specified in section 6. This is the one principal motion feature on the page.

### 5.4 Fit and essential specifications

**Question answered:** Will this fit the space I have?

Combine the current fit section and specifications into one coherent chapter. Show a faithful full-product view or a corrected diagram on one side and essential specifications on the other. A gallery photo can stand in during composition work; do not present it as a measured diagram.

Proposed heading: **“Find its place in your fridge.”** Show three clearly named axes and a short note about loading access once those values have been established. Keep this short summary visible above a scrollable semantic table for material, tiers, pack contents, power and further specifications. The visual and summary stay still while detailed rows scroll. A second disclosure is unnecessary unless it meaningfully groups information. Follow the text-panel rules in section 4.

Remove the “two numbers decide it” assertion. The reference appears to distinguish body length, total length including the chute, narrow width and height. Confirm the mapping before renaming product fields. Do not automatically reinterpret 7 cm as shelf depth, or product height as sufficient loading clearance. Preserve original source values in internal notes until resolved.

Show one concise supplier-attribution note where needed. Remove repeated commentary about the page's own honesty. Do not replace removed caveats with unsupported certifications or absolutes.

### 5.5 Colour and product gallery

**Question answered:** What does it look like, and which version do I prefer?

Replace the tall mosaic with one main image and a horizontal thumbnail row. At 1366×768, budget approximately 440 px for the main image, 64 px for thumbnails and 16 px between them: 520 px total, within the 592 px safe area.

Use labelled White and Charcoal buttons, with an obvious selected state. Selecting a colour changes the studio view; it does not pretend to place an order. Gallery thumbnails show studio, chute detail, refrigerator and kitchen context. Existing context images are white: label them as white context views rather than implying they change colour when Charcoal is selected.

Proposed heading: **“Choose your finish.”** Body: “White or charcoal. The same compact design.” Keep a short product name and price/action group beside the main image. No second tier of large photographs underneath.

Use `aria-pressed` buttons with descriptive names for colour and image selection. Keep the frame dimensions stable between image changes. Zoom/lightbox is optional later; current assets do not justify an elaborate zoom experience.

### 5.6 Questions

**Question answered:** Is anything still stopping me from deciding?

Keep approximately five concise FAQs: size/access, egg suitability/capacity, use/loading, cleaning and material. Avoid repeating answers already fully visible immediately above. Preserve useful existing information after checking unsupported statements such as an arbitrary temperature threshold or unconditional fit assurance.

Use native disclosure elements inside one scrollable question panel, one answer open at a time if desired. Keep the section at 100dvh on the target desktop sizes; opening an answer expands the panel's content rather than the section. The entire answer must remain reachable through the shared panel, with no separate answer scrollbar. Business-policy FAQs remain outside this design task until those policies are decided.

### 5.7 Additional sections: add only where they answer a new question

**Recommended addition within the product-details chapter: “What comes in the box.”** State the confirmed pack contents near the specification table/gallery: one holder and the selected colour. If confirmed, explicitly state that eggs shown are styling props and are not included. This is a compact information block, not another 100vh chapter. It resolves a practical expectation that current hero and story copy do not address.

**Recommended addition within FAQs: “Loading and cleaning.”** Include one concise answer explaining the verified loading point and care method. Use the planned empty-product view if a source reference is available. Do not create a second long how-it-works chapter; the dark story already owns that topic.

| Candidate standalone section | Decision | Reason / condition |
|---|---|---|
| In-fridge/storage context | Already in the proposed sequence | Shows placement and everyday benefit |
| Before/after comparison | Do not add now | Duplicates the storage chapter; requires a fair same-fridge, same-contents comparison to provide meaningful evidence |
| Reviews/customer photos | Add only when genuine customer material exists | No invented ratings, testimonials or AI customer evidence; not a current implementation dependency |
| Delivery/returns/payment reassurance | Deferred with the commerce decisions | When settled, place concise reassurance near purchase actions; a full-screen chapter is unlikely to be necessary |
| Brand story/about us | No standalone chapter now | There is no specific brand story supplied that improves this purchase decision |
| Another lifestyle/CTA section | Do not add | Existing storage, gallery and closing sections cover those jobs |

**Resulting page order stays focused:** Hero → Storage context → Dark image story → Fit/specifications (including pack contents) → Colour/gallery → FAQs (including loading/care) → Closing purchase area → Compact footer. No additional generated image is required for the two compact additions; `gallery/empty.png` remains conditional on a reliable reference.

### 5.8 Closing purchase presentation and footer

Keep a compact product/price/action composition for the existing unfinished purchase area. Do not invent checkout steps, delivery promises, stock status, testimonials or contact methods. Existing CTA destinations remain intentionally unchanged in this phase; visual polish does not imply commerce completion.

Keep the footer compact with necessary section navigation. The dedicated “What it does not do” section is removed entirely. Useful factual limitations may appear inside the relevant FAQ; the removed block must not reappear under a different marketing heading.

## 6. Image-based scrolling story

### Composition

Dark background using the existing ink tone. Left 42%: eyebrow “Everyday use”, heading, one active short paragraph, and a three-step list. Right 58%: one fixed square image frame with softly rounded corners. Both columns sit inside the common safe frame and align around the same vertical centre.

Avoid a full-width heading above another large image row. That vertical stacking was part of the original height problem. The right image frame occupies the same space for all steps; changing images never changes the height of the section.

### First pass with existing assets

| Step | Heading | Image | What the image honestly communicates |
|---|---|---|---|
| 01 | Keep them together | `gallery/white.png` | Whole product and visible stored eggs |
| 02 | Within easy reach | `detail.png` | The curved chute and accessible foremost egg |
| 03 | Ready for your routine | `lifestyle/kitchen.png` | Product in a kitchen setting |

This is an editorial sequence of product views. It must not be called frame-by-frame footage of an egg moving. The existing images use different camera distances and cannot create a physically continuous removal animation.

### Final matched-image option

Create a consistent three-shot sequence showing the same chute before an egg is taken, the hand taking it, and an egg available at the outlet afterward. The exact mechanical progression needs a real-unit check. Until that exists, use illustrative captions and do not invent inter-tier paths or transparent cutaways.

This sequence is recommended after the initial composition is approved. It creates a more coherent visual transition than crossfading between unrelated crops.

### Scroll mechanics

Let `H` be the viewport height. Start with a track of `2.2H`: one `H`-high sticky stage plus `1.2H` of scroll travel. This differs deliberately from saying each image needs another full screen. The visible composition always fits one viewport.

Use native scroll progress `p = clamp((scrollY − trackTop) / (trackHeight − H), 0, 1)`. Sticky stage sits at `top: 0`; its symmetric safe padding clears the fixed header. Header visibility never enters the progress calculation.

| Progress | Image behaviour |
|---|---|
| 0–0.24 | Hold image 1 |
| 0.24–0.36 | Crossfade image 1 to image 2 |
| 0.36–0.64 | Hold image 2 |
| 0.64–0.76 | Crossfade image 2 to image 3 |
| 0.76–1.00 | Hold image 3, then release naturally |

Use opacity blending only in the first implementation. Do not add bounce, parallax, rotations, simulated egg motion or image morphing. At crossover, reserve sufficient space for the longest text; a shared CSS grid cell can overlap text while retaining its intrinsic height. Do not repeat the current fixed 7.5rem absolute-text reservation.

Set active step at `p < 0.30`, `p < 0.70`, otherwise step 3. Small 0.02 hysteresis around those boundaries prevents labels flickering on trackpad jitter. Image blending stays continuous and reversible.

Step labels are actual buttons. Clicking them scrolls to the corresponding hold centres at `p = 0.12`, `0.50`, `0.88`, retaining keyboard focus on the button. Provide a quiet “Skip to size” anchor. Do not intercept wheel events or require the sequence to finish before users can leave.

### Loading, accessibility and failure modes

- Render the first image and all story text in the initial document. Enhance the composition when JavaScript is ready; never ship an empty story shell dependent on animation entry.
- Begin loading/decoding the next story images roughly one viewport before entering the track. Only fade to an image once it is ready; keep the prior image if loading fails.
- In reduced-motion mode, disable pinning and transitions, and show three ordinary image/text rows. All information stays available.
- Below 680 px viewport height, or if text/media exceeds the safe frame at zoom, use the same normal-flow fallback. No internal scrollbars.
- In enhanced mode, expose the active image with appropriate alt text and hide duplicate transition layers from assistive technology. Keep all three step buttons accessible; avoid live announcements on every scroll pixel.
- At fast scrolling, derive state from current progress immediately. Do not queue transitions or replay missed steps.
- Recompute geometry on resizing; do not reset to step 1 merely because the header returns.

## 7. Navbar behaviour

Use a **fixed**, 72 px-high desktop header. Remove its existing normal-flow height so the first section is not `header + 100dvh`. The shared safe frame provides room for it. Keep the logo, three or four useful section links, and the current order action.

Initial thresholds are tuning values, to be verified with mouse wheel and trackpad:

1. Always visible within the first 96 px of document scroll.
2. After that, hide after 48 px cumulative deliberate downward movement.
3. Reveal after 16 px cumulative upward movement; ignore isolated deltas below 3 px.
4. Reset directional accumulation when the direction changes. Clamp negative overscroll to zero.
5. Never hide while focus is within the header or the pointer is interacting with it. Reveal immediately on `focusin`; reveal when the skip link is focused.
6. Move using `transform: translateY(...)`, approximately 180–220 ms ease-out. Do not animate document margins or section heights.
7. Disable transitions under reduced motion. Anchor navigation reserves 88 px clearance, reveals the header during navigation, and focuses the destination heading when appropriate.

Keep a visible focus indicator. A visually hidden header must reveal synchronously when one of its links receives keyboard focus; do not leave offscreen focused controls. The header remains a real navigation landmark.

Alternative if directional reveal proves distracting: retain a permanently visible compact header. Do not build floating side menus or an additional desktop sticky purchase bar in this pass.

## 8. Image plan

### Reuse inventory

| Existing file under `public/images/` | Native size | Recommended role |
|---|---|---|
| `gallery/white.png` | 1254×1254 | Primary hero, white gallery, first story layout pass |
| `gallery/charcoal.png` | 1254×1254 | Colour selection/gallery |
| `detail.png` | 1254×1254 | Story close-up and gallery |
| `lifestyle/fridge.png` | 1122×1402 | Storage benefit, secondary gallery |
| `lifestyle/kitchen.png` | 1536×1024 | Story layout pass and optional gallery |
| `hero.png` | 1536×1024 | Alternate wide composition; not mandatory in the recommended design |

Do not use every image simply because it exists. The current square studio images are adequate for approximately 500–600 CSS px display widths, but not large forensic zooms. On very wide screens cap media size instead of stretching to fill the entire monitor.

The six original PNGs total roughly 10 MB. Do not eagerly deliver all originals. Preserve originals, serve appropriately sized optimized images, and inspect actual browser requests before setting delivery budgets.

### Additional assets, in priority order

| Priority | Path | Brief | Dependency |
|---|---|---|---|
| P1 | `story/ready.png` | White product chute with foremost egg resting behind the lip; fixed three-quarter camera | Approved right-side story frame |
| P1 | `story/take.png` | Identical camera and product; natural hand lifting only the foremost egg | Reference showing the correct use action |
| P1 | `story/next.png` | Same camera, lighting and product; next egg at outlet after removal | Confirm physical behaviour before describing it as a sequence |
| P2 | `fit.png` | Faithful side/end views with editable HTML/SVG measurement labels | Confirmed axis mapping and dimensions |
| P2 | `gallery/empty.png` | Empty holder showing actual construction and loading access | Additional real reference; do not invent concealed internals |
| Optional | `demo.mp4` | Short real-unit clip of a hand taking an egg and the next arriving | Physical sample and recording; outside image generation |

**Minimum new image commitment:** three matched story images, after the image-frame layout is approved. Fit/empty imagery is conditional, not a reason to block the initial desktop redesign. No more generic kitchen scenes, artificial before/after comparisons or additional colour variants are needed.

### Story generation brief

Use built-in image generation. Generate one approved base frame, then use it as the reference/edit target for the remaining two. Target square native outputs around 1600–2000 px if supported; record actual output dimensions and never call an upscaled file native high resolution.

Shared direction: photographic product visualization; white matte plastic, realistic brown eggs, enclosed four-level holder with the reference side windows and single bottom curved chute; warm neutral lighting; full identical product geometry; no writing, logos, dimensions, certification badges or extra tiers. Use a warm neutral background inside a defined image panel against the dark section rather than attempting an imperfect dark-background cutout.

Frame-specific prompts:

- **Ready:** “Show the reference dispenser from a fixed close three-quarter angle, with the bottom chute prominent and a brown egg resting behind its stop lip. Preserve enough upper body to identify the product. No hand.”
- **Take:** “Change only the action: add a natural hand gently lifting the foremost egg from the chute. Preserve camera, crop, lighting, body, windows and every unrelated egg. Do not bend or cover the chute geometry.”
- **Next:** “Return to the identical unobstructed view after the hand has left. Show an egg available at the outlet, consistent with verified reference behaviour. Preserve the rack and background exactly; do not add a new path or mechanism.”

Quality check: match camera, body silhouette, chute, egg scale and light across all three; reject deformed hands, eggs intersecting plastic, geometry drift and a changed number of tiers. If matching fails, use clearly distinct editorial views with honest captions instead of implying a continuous physical animation. AI assets are visualizations, not recorded performance evidence.

### Image delivery and markup

Use existing `next/image`; consult installed Next.js docs before implementation. In this version `priority` is deprecated. Prefer the documented `loading="eager"`/`fetchPriority="high"` pattern for the single hero image, or `preload` when appropriate; do not indiscriminately preload the whole gallery.

Use actual intrinsic dimensions or a stable parent aspect ratio with `fill`. Match `sizes` to the bounded desktop columns. Default to `contain` for product identity views, allowing `cover` only for approved context crops. Any quality setting must be supported by current Next image configuration; do not install an optimizer or change configuration without a demonstrated need.

## 9. Content boundaries

- Remove the dedicated limitations section as requested.
- Shorten repeated motor/gravity/assembly explanations; the image story owns the use explanation.
- Remove “nothing can break”, “nothing can wear out” and unconditional fit assurances. Retain accurate benefits without claiming indestructibility.
- Resolve conflicting dimension labels before prominent placement. Do not silently treat source uncertainty as confirmed measurement.
- Remove internal placeholder labels from the final visual composition once assets are wired.
- Do not introduce marketplace names or branding anywhere in storefront content or assets.
- Do not make shipping, returns, payment, reviews or inventory decisions in this desktop pass.
- Keep product-data source notes in documentation. Public copy should be short and relevant; do not reproduce internal process commentary as a marketing section.

## 10. Proposed file responsibilities

| File | Responsibility/change |
|---|---|
| `src/app/(site)/page.tsx` | Assemble the revised sequence; remove dedicated limitations and detached CTA wrapper |
| `src/app/(site)/layout.tsx` | Support fixed-header layout; retain skip link and main landmark |
| `src/app/globals.css` | Shared viewport, spacing, typography and header tokens; targeted short-height fallback |
| `src/components/landing/SiteHeader.tsx` | Direction-aware visibility and keyboard reveal |
| New `src/components/landing/ViewportSection.tsx` | Server-rendered section wrapper; common safe frame, natural expansion |
| New `src/components/landing/ProductHero.tsx` | Static product-led hero |
| New `src/components/landing/StorageSection.tsx` | Refrigerator context and concise benefits |
| `src/components/landing/MechanismScroll.tsx` | Replace rail rendering with image story while retaining the section integration point |
| `src/components/landing/SizeFit.tsx` | Merge fit and specs; corrected visual and accessible scrollable table panel |
| New `src/components/landing/ScrollTextPanel.tsx` | Shared constrained text region, overflow hint, keyboard focusability and short-height fallback for specs/FAQ |
| New `src/components/landing/ProductGallery.tsx` | Fixed-frame thumbnail and colour selection |
| `src/components/landing/PhotoSlot.tsx` | Stable media framing; contain/cover choice and documented loading props |
| `src/lib/product.ts` | Correct factual naming after verification; wire valid image data and concise content |
| `src/lib/site.ts` | Keep section navigation consistent with new anchors |
| `src/components/landing/SiteFooter.tsx` | Compact footer; concise necessary attribution |
| `RackDemo.tsx`, `RackArt.tsx`, `rack-geometry.ts` | Retire from homepage; delete only after checking for remaining consumers |
| `BenefitStrip.tsx`, `Comparison.tsx` | Remove homepage use once content is consolidated; inspect references before deletion |
| Existing content/photo/setup docs | Update final section order, assets and validation instructions during implementation |

Do not convert the whole page into a client component. Do not modify `StickyBuyBar` for a new mobile design in this phase.

## 11. Implementation plan and review gates

The following work is proposed. This document does not authorize deploying the redesign or completing the commerce flow.

### Task 1 — Establish the shared desktop frame

Files: `globals.css`, `(site)/layout.tsx`, new `ViewportSection.tsx`.

- [ ] Record current git status and baseline desktop screenshots; preserve user changes.
- [ ] Read relevant installed Next.js CSS and server/client guides.
- [ ] Define the 72 px header token, viewport safe padding, content width and typography limits from section 4.
- [ ] Add a common section wrapper that uses `min-height: 100dvh`, symmetric padding, border-box sizing and natural overflow.
- [ ] Prototype hero and one ordinary section using that wrapper before applying it everywhere.
- [ ] Measure content top/bottom clearances at 1280×720 and 1366×768. Adjust content density rather than clipping.

**Gate:** no doubled header offset; one complete hero composition at all target desktop sizes.

### Task 2 — Replace the hero and simplify the page sequence

Files: `page.tsx`, `ProductHero.tsx`, `StorageSection.tsx`, `PhotoSlot.tsx`, `product.ts`.

- [ ] Wire the existing studio and refrigerator images with true dimensions and descriptive alt text.
- [ ] Replace the hero demo with the image/copy composition in section 5.1.
- [ ] Consolidate benefit and comparison content into the storage chapter.
- [ ] Remove the limitations section and unused page imports. Keep useful facts in appropriate data/FAQ locations.
- [ ] Remove the detached CTA wrapper; preserve purchase action destinations.
- [ ] Capture hero and storage chapters at every target desktop size.

**Gate:** visitors see the reference product immediately; no rail simulation or photo-placeholder labels remain in these chapters.

### Task 3 — Build the image story using existing assets first

Files: `MechanismScroll.tsx`, `PhotoSlot.tsx`, `globals.css`.

- [ ] Render the three story image/text steps in ordinary document flow as a readable baseline.
- [ ] Add the bounded two-column desktop stage and 220dvh track.
- [ ] Implement the progress intervals, reversible crossfades, active-step thresholds and step navigation from section 6.
- [ ] Reserve intrinsic space for the longest text and hold media dimensions constant.
- [ ] Add image-ready handling, reduced-motion fallback and short-height/content-overflow fallback.
- [ ] Verify forward/reverse scroll, rapid skipping, step-button focus, direct `#how` navigation and resize mid-sequence.

**Gate:** every step reads clearly inside the safe frame, with no jumping image size, clipped copy, scroll trapping or empty transition frame. Review this composition before generating its final matched assets.

### Task 4 — Produce and integrate the matched story images

Files: `public/images/story/*`, product image manifest/data and photography documentation.

- [ ] Use the approved frame dimensions and approved product reference to create `ready`, then matched `take` and `next` images.
- [ ] Inspect all outputs together for identity/action consistency and save actual dimensions and generation prompts.
- [ ] Integrate accepted images without changing the stage dimensions or opacity schedule.
- [ ] If use-action evidence is insufficient, retain the three existing editorial views and record the exact unresolved source dependency; do not fabricate mechanical proof.

**Gate:** new imagery is visibly more coherent than the existing editorial sequence and does not change the product between steps.

### Task 5 — Rebuild fit/specs, gallery and remaining copy

Files: `SizeFit.tsx`, `ProductGallery.tsx`, `page.tsx`, `product.ts`, `site.ts`, `SiteFooter.tsx`.

- [ ] Reconcile the dimension axes against supplied or measured evidence; keep unconfirmed figures out of prominent claims.
- [ ] Replace the incorrect size drawing with a faithful view and accurate labels when evidence allows.
- [ ] Build the shared scrollable text-panel treatment from section 4; verify keyboard focusability, boundary scroll chaining and short-height fallback.
- [ ] Build the stable fit summary plus scrollable specification table, including confirmed pack contents.
- [ ] Implement one height-capped gallery frame, thumbnail buttons and explicit colour states.
- [ ] Put shortened FAQs, including loading/care, in one scrollable panel inside a 100dvh section. Keep the closing composition compact and preserve intentionally unfinished CTA destinations.
- [ ] Recheck navigation anchors, image alt text, unsupported claims and references to retired components.

**Gate:** fit/gallery/FAQ sections fit their desktop screens; all specification rows and expanded answers are reachable in their designated panels. Keyboard users can enter and leave; short-height fallback removes both the fixed height and internal scroll constraint.

### Task 6 — Implement and tune header reveal

Files: `SiteHeader.tsx`, `globals.css`, `site.ts`.

- [ ] Add scroll-direction accumulation and thresholds from section 7.
- [ ] Add focus/pointer reveal guards, top-of-page visibility and reduced-motion handling.
- [ ] Verify that visibility changes only transform the header, never resize sections or shift story progress.
- [ ] Verify anchor clearance with the header both hidden and visible.

**Gate:** deliberate motion, no jitter and no invisible focused links.

### Task 7 — Final desktop QA and documentation

- [ ] Run `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd lint` and `pnpm.cmd build`; record failures separately from unrelated existing issues.
- [ ] Verify the desktop matrix and interaction cases in section 12 in the actual browser.
- [ ] Inspect image network payloads and confirm only the hero is eagerly prioritised at entry.
- [ ] Update `docs/06-photography-brief.md`, `docs/07-content-and-copy.md`, `docs/10-setup-and-deployment.md`, `docs/12-roadmap.md` and relevant current design docs to reflect the final implementation. Preserve source history rather than overwriting unrelated decisions.
- [ ] Remove unused simulation code only after a reference search confirms it has no other consumers.
- [ ] Stop and verify cleanup of all task-started processes, browsers and listeners. Leave pre-existing/user processes untouched.

**Gate:** report desktop validation separately from deferred mobile design, commerce integration and unresolved physical-product evidence.

## 12. Desktop acceptance criteria

### Visual matrix

Required: 1280×720, 1366×768, 1440×900, 1920×1080. Also check a short 1440×600 window, 125% and 200% browser zoom, reduced motion and keyboard navigation. These are desktop usability checks, not a mobile redesign.

For each major section at normal target sizes:

- No horizontal document overflow greater than 1 px.
- At its composed scroll position, the heading, body, main media, relevant controls and bottom spacing are visible together.
- Content sits within the safe vertical frame; no text is made inaccessible with hidden overflow or line clamps. Specs and FAQ deliberately use one accessible internal text scrollbar each.
- Top and bottom safe padding are equal. Any optical adjustment stays within 16 px and is deliberate, not an accidental grid leftover.
- Full-product views show the top and complete chute. Detail crops are used only where explicitly intended.
- No standalone section remains over a viewport merely because a gallery image stack or long promotional paragraph was left intact.
- Expanded FAQs increase their panel's scrollable content height without changing the outer desktop section height. Specs and FAQ grow with the document only in the specified fallback mode.
- Header reveal causes no content-layout shift and no change to the current story stage.

### Interaction checks

1. Scroll through story with mouse wheel and trackpad, forward and backward. All three images and captions appear at expected intervals.
2. Rapidly scroll from above to below it. The page never traps input or queues animations.
3. Activate all three step buttons by keyboard; focus remains visible and each lands in its hold interval.
4. Enter via `#how` and leave using “Skip to size”. The fixed header does not obscure headings.
5. Delay/block a story image. The last valid image stays visible; text still reads coherently.
6. Change colour and thumbnails. Media frame stays fixed, selected state is clear, and white context images remain accurately labelled.
7. Hide the header by scrolling, then navigate by keyboard. It reveals before focused content can remain invisible.
8. Open the longest FAQ near the bottom of its panel and read all specifications at zoom. Verify scrollbar dragging, keyboard access, forward/reverse boundary scroll chaining and the under-280-px panel-height fallback. No answer has its own nested scrollbar.
9. With reduced motion or insufficient vertical space, story content is in ordinary flow with no pinning requirement.

### Content and scope checks

No inaccurate rail illustration in hero/story, no dedicated limitations chapter, no public photo-slot labels, no inconsistent dimension axes, no invented durability/fit guarantees, no marketplace branding. Purchase destinations may remain unfinished by explicit user direction. No mobile redesign, checkout integration, publishing or deployment is part of this plan.

## 13. Decisions that can proceed versus evidence still needed

**Ready to implement after plan approval:** the new section structure; desktop safe-frame rules; image-based hero; editorial image story; compact gallery; removal of the limitations chapter; reduced repetition; fixed/revealing navbar.

**Needs physical/source evidence before factual publication:** exact footprint axes, loading clearance, capacity guidance and actual dispensing/loading sequence. These do not block building the layout with existing images and appropriately limited copy.

**Intentionally deferred by the user:** mobile design, purchase destinations, checkout and business-policy content. Do not repeatedly reopen those decisions during this desktop pass.

The intended outcome is a calmer product page with complete, balanced desktop compositions and one purposeful scrolling image sequence. It is not a promise that every content block will be exactly one screen at every zoom level, or that visual changes alone establish a high-converting store.
