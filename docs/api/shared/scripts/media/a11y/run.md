# `shared\scripts\media\a11y\run.mjs`

Media accessibility pipeline — generates co-located

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\run.mjs`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CACHE_DIR`

Annotation-result cache — `--skip-annotate` reruns compose without re-billing.

### `cdnUrl`

Public CDN object URL — anonymous GET; the bucket is world-readable.

### `DRY_DIR`

`--dry` output tree — full artifact mirror for review.

### `LOG_PATH`

Persistent per-key status log — same convention as media-convert-log.json.

### `META_DIR`

Where the runtime's /meta/media-manifest.json artifact is persisted.

### `WATCH_MS`

`--watch <seconds>` interval (0 = single pass).

### `cacheFile`

Content-hash cache path for one stem's annotation result.

### `loadAnnCache`

Loads a cached annotation (null on miss).

### `saveAnnCache`

Persists an annotation result for --skip-annotate reruns.

### `localizeAll`

Translates the unique English segments for one asset across every
output locale — returns `{locale → Map<enSegment, localized>}` so
cue/part reassembly is pure lookups.

- `@param` {string[]} segments Unique English segments.
- `@returns` {Promise<Map<string, Map<string, string>>>}

### `processVideo`

Video job: annotate → normalize → cues → 16-locale .vtt payloads →
uploads. `rec.labels[locale]` seeds each file's NOTE header in its own
language (the CMS labels are already human-localized).

### `fetchObjectBytes`

Downloads one bucket object over the public CDN URL.

- `@param` {string} key MEDIA_PREFIX-relative object key.
- `@returns` {Promise<Buffer>} Raw object bytes.

### `transcodeJpeg`

ImageMagick transcode — arithmetic-coded mozjpeg output is a real JPEG
every consumer reads but Vision's gs:// path rejects as "Bad image
data". `magick` re-encodes to baseline Huffman; the 1600px cap keeps
content-annotate payloads modest while preserving legibility.

- `@param` {Buffer} bytes Source image bytes.
- `@returns` {Promise<Buffer>} Standard baseline-JPEG bytes.

### `annotateImageWithFallback`

gs:// annotate with progressive fallbacks — the q50 mozjpeg sibling
covers Vision's 20MB cap; a local magick transcode + inline-content
annotate covers arithmetic-coded JPEGs Vision can't open at all.

- `@param` {object} rec Inventory record.
- `@param` {string} gsUri Primary `gs://` source.
- `@param` {Set<string>|null} manifest Bucket key set.
- `@returns` {Promise<object>} `responses[0]`.

### `processImage`

Image job: annotate → structured parts → 16-locale .txt payloads →
uploads. Each locale's own CMS label heads its file; the scaffold
sentences translate; the quoted OCR string stays verbatim.

### `emitFile`

Writes one artifact — `--dry` mirrors it under reports/a11y-out/;
otherwise uploads to the sibling key (manifest-listed keys skip).

### `processOne`

One inventory record end-to-end; returns the report row.

### `complete`

Whether every required sibling already exists (skip without --force).

### `sweep`

One full sweep — fetch manifest, process every gap, merge the
status log + report. Returns the report object for the caller.

### `main`

Entry — one sweep, or `--watch` re-sweeps forever. Translations +
dialect tables fetch once per process (the corpus is build-stable);
each pass re-fetches the manifest so newly uploaded media is the only
work that ever repeats.
