# `experiments/star-field/engine/bodies/mask.ts`

Photo-texture edge feathering for deep-sky billboards.

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/mask.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `photoSize`

Returns the intrinsic pixel size of a loaded texture — `image` may be
an HTMLImageElement (`naturalWidth`) or any frame source carrying
`width`/`height`; both collapse to 0 when unset (teardown mid-load).
- `@param` tex Source texture.
- `@returns` `[width, height]` in source pixels.

### `maskPhotoTexture`

Composites a loaded photo texture into a square-capped canvas whose
alpha fades to zero past `MASK_INNER` of the half-extent. Aspect ratio
is preserved inside the canvas (letterboxed with transparent space),
so the caller still gets the source's true `w/h` from `photoSize` for
non-square scaling. Returns undefined when canvas/2d is unavailable or
the texture image never resolved (callers fall back to additive).

By default the mask is a smooth radial disc — appropriate for galaxies
and face-on discs. For nebulae, `options.lobes` produces a seeded,
irregular, wispy boundary so each nebula reads as a gas cloud rather
than a flat circular photograph pasted on the sky.
- `@param` THREE The three.js module.
- `@param` tex Loaded photo texture (`tex.image` must be set).
- `@param` options Optional mask shape — `lobes` and `seed` for nebulae.
- `@returns` A CanvasTexture with feathered alpha, or undefined.

### `radialMask`

Radial alpha ramp: full opacity inside MASK_INNER·half-extent, smooth
fade to transparent at the inscribed circle's edge. The corner
letterbox stays untouched (already transparent). Using destination-in
keeps RGB data but zeroes alpha outward.

### `irregularMask`

Wispy nebula mask — a seeded union of overlapping soft radial lobes
so the photograph dissolves with irregular cloud-like edges instead of
a perfect circle. Each nebula gets a deterministic shape from its id.
