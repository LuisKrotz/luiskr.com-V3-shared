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

pdfs →
{base}.png (all pages merged vertically)
{base}-thumb.png (page 1, ≤512px, natural orientation)

Tool preference per the original scripts: ImageMagick `convert` + mozjpeg
`cjpeg` when installed, ffmpeg fallback otherwise (always available).
WebP/WebM are always ffmpeg (libwebp / libvpx-vp9) — light compression,
and an output that lands >= its input is discarded so the jpg/mp4
original remains the served variant. PDFs rasterize through poppler's
`pdftoppm` (ffmpeg cannot read PDFs) and merge through ImageMagick
`-append` — both binaries must be on PATH for the pdf branch.

### `run`

`run` — promise wrapper around spawn for one-shot tool calls:
stderr is buffered so a non-zero exit surfaces its tail in the
rejection (ffmpeg progress lives on stderr).

### `probeVideo`

`probeVideo` — ffprobe summary of the first video stream:
codec, pixel width and pix_fmt (the three facts the convertVideo
branch conditions on). csv=p=0 gives a clean comma row.

### `hasTool`

Probes whether a CLI tool exists by running `cmd -version`. Every tool
accepts -version — probing it works on all platforms and avoids POSIX
`which` (Windows has no `which`; `where` is cmd-only and its exit code
is unreliable through spawn). On win32 `convert` resolves to Microsoft's
built-in filesystem converter, which fails -version → reported absent
and ImageMagick's `magick` entrypoint is used instead.

### `refreshWindowsPath`

Merges the persisted Machine+User PATH from the Windows registry into
process.env.PATH. winget/choco persist PATH updates to the registry on
install, but a terminal (or IDE) spawned before the install keeps the
stale snapshot — every spawn below inherits this process env, so
refreshing here makes just-installed tools (ffmpeg, gcloud, …)
discoverable within the same setup run. No-op off win32 and when
PowerShell is unavailable.

### (module scope)

`detectTools` — probes the host's media binaries once and caches
the map: which of ffmpeg/ffprobe/convert/cjpeg/magick answered
-version, plus poppler's pdftoppm (its version flag is -v). `force`
re-runs the probe (post-install refresh).

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

### (module scope)

PDF recipe — poppler's `pdftoppm` renders every page at PDF_DPI into a
scratch dir, ImageMagick `-append` merges them into one tall strip
(the single-PNG deliverable), and page 1 shrinks into the portrait-
natural thumbnail. Both binaries are required: ffmpeg cannot parse
PDFs and has no multi-image append. Page renders live in a mkdtemp
workspace outside out/ so intermediates never reach the ZIP — the
finally removes them on success AND failure.

### (module scope)

`convertFile` — the pipeline's entry point: requires ffmpeg (every
path falls back to it), then dispatches on extension to the image,
video or pdf recipe. Unsupported types throw — the job runner records
the error per file.

### `isSupported`

The job runner's litter filter — same predicate the API uses to skip
non-media files inside uploaded folders.
