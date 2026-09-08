# Matched variant images — 2026-09-08

## Status

Twenty PNG assets saved: ten compositions in each of `public/images/product/white/` and `public/images/product/charcoal/`. Matching filenames identify colour pairs. Website components and existing image paths were not changed.

**The requested 2K/UHD resolution is not yet met.** The built-in generator returned the sizes below even when prompted for 2048-pixel or larger output. No artificial upscaling was applied. A user decision is pending between the explicitly authorized CLI/API workflow and local upscaling. Do not describe these files as native 2K.

## Manifest

Each filename exists in both variant folders.

| Filename | Intended use | Actual pixels |
|---|---|---|
| studio.png | Primary product gallery / colour selection | 1254 × 1254 |
| hero.png | Wide hero with space for HTML copy | 1536 × 1024 |
| fridge.png | Refrigerator context / gallery | 1122 × 1402 |
| kitchen.png | Kitchen counter lifestyle | 1536 × 1024 |
| detail.png | Dispensing chute close-up | 1254 × 1254 |
| empty.png | Empty holder / construction overview | 1254 × 1254 |
| loading.png | Hand loading an egg into the top trough | 1254 × 1254 |
| ready.png | Existing scroll-story starting composition | 1254 × 1254 |
| take.png | Existing scroll-story egg pickup composition | 1254 × 1254 |
| next.png | Existing scroll-story following-egg composition | 1254 × 1254 |

The first seven rows form the requested seven distinct gallery/use-case pairs. The last three also provide the missing colour counterparts for the existing story images.

## Sources and checks

White studio, hero, fridge, kitchen, detail and story files are copies of the existing project assets. Charcoal studio is copied from the existing charcoal gallery image. Empty and loading white images are new reference-based generations; the remaining charcoal images are edits of their corresponding white source.

All twenty files were decoded and dimensions checked. Pairs share dimensions and were visually reviewed for composition, product shape and colour. Generative colour edits retain the scene but may introduce small texture, lighting and edge differences; they are not pixel-identical recolours. These are AI product visualizations. In particular, the empty image's internal channels are inferred from the reference, not verified against a physical sample.

## Prompt set

Mode: built-in imagegen, one call per image. Existing white studio image supplies product identity; existing charcoal studio supplies colour when used as a second reference.

### Charcoal counterparts

Use case: precise-object-edit. Image 1 is the edit target. Image 2, where supplied, is the charcoal colour reference only. Change ONLY all white plastic of the egg holder to muted slate charcoal grey, approximately #5A6470. Preserve composition, aspect ratio, camera, silhouette, windows, tiers, chute, eggs and their positions, background, props, lighting and crop. Preserve hands and anatomy where present. Empty holder remains empty. Keep satin plastic highlights realistic. Do not recolour eggs or background. No text, logos, dimensions, added objects or extra parts.

### Empty white holder

Use case: product-mockup. Reference defines the narrow elongated four-level holder, open top trough, exactly three long rounded side windows, two small end windows, bottom curved chute and stop lip. All eggs removed. Elevated three-quarter studio view, full product centred with margins on warm cream seamless backdrop. Show empty top and side windows. White satin plastic, subtle seams, sharp edges, soft daylight and contact shadow. Square, requested 2048 × 2048. No text, branding, dimensions, arrows, added tiers or hardware.

### Loading white holder

Use case: product-mockup. Same product identity. White holder on pale stone kitchen worktop, one adult hand entering from upper left gently lowering a brown egg into a clear empty space at the rear of the partially filled top trough. Lower levels contain eggs and two eggs rest in the chute. Full product, three-quarter side/end view, cream kitchen backdrop, soft daylight, natural hand anatomy. Square, requested 2048 × 2048. No text, logos, added parts or eggs intersecting plastic.

### Resolution attempt (not selected)

Requested 2048 × 2048 square, 3072 × 2048 landscape or 2048 × 2560 portrait masters while preserving exact composition, geometry and props and enhancing photographic detail. Returned sizes remained below 2K. Those attempts remain in the generator output folder and were not substituted into the matched catalogue.

## Next step

Resolve the requested high-resolution export method, verify actual output dimensions, then update this document's status. Website integration remains deferred at the user's request.
