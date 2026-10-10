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
alpha fades radially to zero past `MASK_INNER` of the half-extent —
the drawn frame becomes a soft-edged disc of imagery. Aspect ratio is
preserved inside the canvas (letterboxed with transparent space), so
the caller still gets the source's true `w/h` from `photoSize` for
non-square scaling. Returns undefined when canvas/2d is unavailable
or the texture image never resolved (callers fall back to additive).
- `@param` THREE The three.js module.
- `@param` tex Loaded photo texture (`tex.image` must be set).
- `@returns` A CanvasTexture with feathered alpha, or undefined.
