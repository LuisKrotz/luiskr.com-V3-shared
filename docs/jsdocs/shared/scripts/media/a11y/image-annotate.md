# `shared\scripts\media\a11y\image-annotate.mjs`

Cloud Vision client + longdesc composer for static images.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\image-annotate.mjs`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FEATURES`

Feature bundle — every signal the longdesc text consumes, one call.

### `MAX_LABELS`

Top-N entities each signal contributes to the prose.

### (module scope)

One image annotation call.

- `@param` {string} gsUri `gs://bucket/key` input URI.
- `@returns` {Promise<object>} `responses[0]` of the annotate batch.

### (module scope)

Same annotate, inline `image.content` bytes — the escape hatch for
encodings the gs:// path can't open (arithmetic-coded mozjpeg).

- `@param` {Buffer} bytes Decodable image payload (standard JPEG/PNG).
- `@returns` {Promise<object>} `responses[0]` of the annotate batch.

### `COLOR_NAMES`

Curated RGB→name vocabulary for dominant-color prose — the Vision API
returns raw channels; a fixed naming table keeps descriptions honest
(no "rgb(12,34,56)" noise). Nearest-euclidean pick over ~24 centroids.

### `colorName`

Nearest named color for an RGB triple (squared-euclidean over centroids).

### `cap`

Uppercases the first letter of a sentence fragment.

### `LONGDESC_SCAFFOLDS`

Scaffold sentences of the longdesc — quoted OCR content stays verbatim
(the literal pixels), while these carrier sentences are what each
locale's file actually translates.

### `composeLongdescParts`

Vision `responses[0]` → structured longdesc parts. Each field is one
paragraph of the final document; `ocrText` is the raw on-screen text
(verbatim — never machine-translated) while every other field is an
English scaffold the locale pass localizes. Any signal the API
withheld simply leaves its field empty — no filler.

- `@param` {object} ann `responses[0]` payload.
- `@returns` {{scene:string, elements:string, ocr:string, palette:string, context:string}}

### `renderLongdesc`

Renders the parts into the final plain-text longdesc body — label
line first (already in the file's own locale), then every non-empty
paragraph separated by blank lines, OCR wrapped in quotes last-third.

- `@param` {{label?: string, parts: {scene:string,elements:string,ocr:string,palette:string,context:string}, ocrScaffold?: string}} args
- `@returns` {string} Multi-line plain-text long description.
