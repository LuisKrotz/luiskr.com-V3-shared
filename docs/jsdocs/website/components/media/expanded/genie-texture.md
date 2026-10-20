# `website/components/media/expanded/genie-texture.ts`

Sheet-texture composer for the expand-modal genie warp —

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/website/components/media/expanded/genie-texture.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.  |

## Members

### (module scope)

The composited modal surface the strip-warp backends sample.
Coordinates of `mediaBox`/`clipBox` are content-local CSS px — the
texture ctx carries the dpr/scale transform, so every stamp (bake
and per-frame restamp alike) draws in CSS px.

### `tex`

The baked texture canvas — null means "no surface", the warp ghosts.

### `ctx`

The texture's 2D context — the live restamp writes into it.

### `media`

Primary restamp source — the modal's media item. A <video> restamps
every frame (live frames); an undecoded <img> restamps once on
decode then drops. Null when the item is already baked and static.

### `back`

Standby restamp source — the video's poster primed as an off-DOM
Image; fills the media box until the video reports real pixels.
Drops after its first stamp.

### `mediaBox`

Content-local CSS-px box the media item occupies (contain-fit inside).

### `clipBox`

Content-local CSS-px clip — the figure's rounded rect.

### `clipRadius`

The figure's corner radius (CSS px) applied to the restamp clip.

### `dimsOf`

Intrinsic pixel dims of a drawable — naturalWidth for images, videoWidth for video.

### `posterSource`

An off-DOM Image primed with a video's poster — drawImage on an
undecoded <video> paints nothing, but the poster URL is already in
the browser cache (the figure card showed it), so the detached Image
decodes within a frame or two and the restamp loop adopts it.

- `@param` el The media element — `poster` only exists on <video>.
- `@returns` The primed image, or null when no poster is set.

### `fitContain`

Contain-fits a source into a box — mirrors the media item's
`object-fit: scale-down` so the baked frame lands exactly where the
letterboxed pixels live (not stretched across the item's box). The
`, 1)` in the scale is the scale-down half of the contract: a source
smaller than its box draws at natural size, never upscaled — the same
guarantee the modal's CSS gives the live element.
Writes into `out` (a scratch rect — no allocation per call).

- `@param` sw Source pixel width.
- `@param` sh Source pixel height.
- `@param` box The item's content-local box.
- `@param` out Scratch rect receiving the fitted draw box.

### `stampFigure`

Stamps the media figure: the figure's background + rounded-corner
clip, the placeholder layer, then the media item contain-fitted.
Returns the geometry the renderer needs for per-frame restamps
(the item's box, the figure clip, the corner radius) — all
content-local CSS px.

- `@param` ctx The texture context.
- `@param` content The modal content root.
- `@param` ox Content-local origin x.
- `@param` oy Content-local origin y.
- `@param` out Scratch rect for fit math (reused per call).
- `@returns` The figure geometry, or null when the figure is absent.

### `buildGenieSheet`

Bakes the bounded modal card into an offscreen canvas — the sheet
the genie funnel warps. The extent is the media-figure rect (the
"window" — reference-faithful): its opaque frame, rounded clip,
placeholder and media item, all figure-local. The fullscreen glass
veil and viewport chrome stay out of the texture and fade under
`.expand-modal-genie-veil` while the funnel flies. One layout pass
(batched rect + style reads), one canvas, ~a dozen draw calls; the
result is a stable texture so the per-frame work stays a pure strip
resample. The texture long edge caps at GENIE_WARP.TEX_MAX_PX —
enough sharpness for a 700ms warp without an unbounded framebuffer.

- `@param` content The modal content root (the figure lives inside it).
- `@param` dpr The overlay's device-pixel cap (already clamped).
- `@returns` The sheet record, or null when the card has no box or the
