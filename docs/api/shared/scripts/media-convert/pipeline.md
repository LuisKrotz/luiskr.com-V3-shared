# `shared/scripts/media-convert/pipeline.js`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/media-convert/pipeline.js`                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

Media conversion pipeline — mirrors the manual scripts in tasks/:

images (any format) →
{base}-mozjpg-uncompressed.jpg (q100 — tasks/image/100)
{base}-mozjpg-50.jpg (q50 — tasks/image/50)
{base}-mozjpg-75.jpg (q75 — tasks/image/75)
{base}-mozjpg3-MSSIM-tuned-kodak.jpg (q25 + blur — tasks/image/25)

videos (any format) →
{base}.mp4 (h264, tasks/video/transform.sh)
{base}.mp4-scaledown-2x.mp4 (h264, iw/2 — iw/4 for ≥4K)
{base}.mp4.jpg (first-frame poster)
{base}.mp4.jpg-thumb.jpg (q25 + blur thumb)
{base}.mp4-scaledown-2x.mp4.jpg (poster of the scaled video)
{base}.mp4-scaledown-2x.mp4.jpg-thumb.jpg

Tool preference per the original scripts: ImageMagick `convert` + mozjpeg
`cjpeg` when installed, ffmpeg fallback otherwise (always available).

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

tasks/image/* — four mozjpeg variants of any source image.

### (module scope)

tasks/video/* — normalize, scale-down, posters and thumbs.
