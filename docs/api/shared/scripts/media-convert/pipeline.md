# `shared\scripts\media-convert\pipeline.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media-convert\pipeline.js`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Media conversion pipeline — mirrors the manual scripts in tasks/:

images (any format) →
{base}-mozjpg-uncompressed.jpg (q100 — tasks/image/100)
{base}-mozjpg-50.jpg (q50 — tasks/image/50)
{base}-mozjpg-75.jpg (q75 — tasks/image/75)
{base}-mozjpg3-MSSIM-tuned-kodak.jpg (q25 + blur — tasks/image/25) + a .webp sibling of every .jpg above (the runtime's if-exists
<source>/preload chain prefers them when present)

videos (any format) →
{base}.mp4 (h264, tasks/video/transform.sh)
{base}.webm (vp9+opus — first <source>)
{base}.mp4-scaledown-2x.mp4 (h264, iw/2 — iw/4 for ≥4K)
{base}.mp4-scaledown-2x.webm (vp9+opus scaled)
{base}.mp4.jpg (first-frame poster)
{base}.mp4.jpg-thumb.jpg (q25 + blur thumb)
{base}.mp4-scaledown-2x.mp4.jpg (poster of the scaled video)
{base}.mp4-scaledown-2x.mp4.jpg-thumb.jpg

Tool preference per the original scripts: ImageMagick `convert` + mozjpeg
`cjpeg` when installed, ffmpeg fallback otherwise (always available).
WebP/WebM are always ffmpeg (libwebp / libvpx-vp9) — light compression,
and an output that lands >= its input is discarded so the jpg/mp4
original remains the served variant.

### `refreshWindowsPath`

Merges the persisted Machine+User PATH from the Windows registry into
process.env.PATH. winget/choco persist PATH updates to the registry on
install, but a terminal (or IDE) spawned before the install keeps the
stale snapshot — every spawn below inherits this process env, so
refreshing here makes just-installed tools (ffmpeg, gcloud, …)
discoverable within the same setup run. No-op off win32 and when
PowerShell is unavailable.

### `imgMagick`

ImageMagick invocation for the platform: `magick convert …` is the
modern entrypoint on every OS and the only correct one on Windows —
where bare `convert` is Microsoft's filesystem tool, never ImageMagick.

- `@param` t Tool map from detectTools().
- `@param` args Arguments for the `convert` subcommand.
- `@returns` {Promise<void>} resolves when the conversion exits 0.

### `imOk`

True when an ImageMagick binary is usable on this platform.

### (module scope)

Single JPEG encode honoring the task scripts' tools when present.

### (module scope)

Single WebP encode — libwebp picture preset, quality 90 (light).

### (module scope)

Single WebM encode — VP9+Opus, crf 30 with row-mt multithreading.

### (module scope)

Emits a compressed sibling only when it actually compresses — a webp/webm
output that lands >= its source is deleted so the jpg/mp4 remains the
variant the runtime serves ("leave them as they are" for non-compressible
assets). Returns the kept basename or null.

### (module scope)

tasks/image/* — four mozjpeg variants + webp siblings of any source image.

### (module scope)

tasks/video/* — normalize, scale-down, posters and thumbs.
