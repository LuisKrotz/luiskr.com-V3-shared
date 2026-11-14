# `shared\scripts\media\a11y\vtt.mjs`

Pure WebVTT synthesis — converts the normalized video

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\vtt.mjs`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `OCR_PREFIX`

The fixed sentence prefix every OCR cue line carries. Exported so
translation memory keys and tests share one literal.

### `MAX_LABELS`

Top-N labels per window — deeper entries rarely survive confidence.

### `MIN_TEXT_CONFIDENCE`

OCR segments below this confidence are too noisy to announce.

### `MAX_LABELS_JOIN`

Labels above this share of a shot merge into the same cue.

### `offsetMs`

`seconds` `"12.5s"`/number/`"0"` → milliseconds — the Video
Intelligence API serializes offsets as `"<sec>s"` strings.

- `@param` {string|number|undefined|null} offset API offset field.
- `@returns` {number} Milliseconds, 0 for missing/zero.

### `vttTime`

Milliseconds → `HH:MM:SS.mmm` WebVTT timestamp.

- `@param` {number} ms Milliseconds (clamped ≥ 0).
- `@returns` {string} WebVTT timestamp.

### `overlapMs`

Overlap length (ms) of two [start,end) windows.

### `sentenceJoin`

Capitalizes the first character of a label list and joins the rest —
Vision entities arrive lowercase, cues read as sentences.

- `@param` {string[]} labels Lowercase entity descriptions.
- `@returns` {string} "Screenshot, user interface, website".

### `cueParts`

One window → cue parts `{visual, ocr}`: `visual` is the sentence-cased
label line (translated per locale), `ocr` the verbatim on-screen text
(never translated — it's quoted pixels). Either may be empty.

- `@param` {{labels: string[], texts: string[]}} window Normalized window.
- `@returns` {{visual: string, ocr: string}}

### `normalizeAnnotation`

Normalized Video Intelligence result → shot windows carrying their
overlapping labels + OCR texts.

Shot boundaries come from `shotAnnotations`; when absent (static
videos sometimes report a single implicit shot) one window spans the
furthest observed offset. Label/text segments attach when they
overlap ≥ MIN_OVERLAP of the window — shot-mode label segments align
to shot bounds anyway, so this mainly guards OCR drift at cuts.

- `@param` {object} ann `annotationResults[0]` of a finished operation.
- `@returns` {{windows: Array<{start:number,end:number,labels:string[],texts:string[]}>, durationMs:number}}

### `synthCues`

Normalized windows → cue parts. Empty windows produce no cue; adjacent
identical `{visual, ocr}` pairs merge into one span (a screen reader
shouldn't re-read the same description shot after shot).

- `@param` {Array<{start:number,end:number,labels:string[],texts:string[]}>} windows
- `@returns` {Array<{start:number,end:number,visual:string,ocr:string}>}

### `renderCue`

Composes one cue's display text from localized parts — the translated
visual line, then the localized OCR scaffold + verbatim text.

- `@param` {{visual:string, ocr:string}} cue Cue parts.
- `@param` {string} ocrScaffold Localized "On-screen text:" prefix.
- `@returns` {string} Cue text ('' when both parts are empty).

### `cuesToVtt`

Cue list → serialized WebVTT payload. A `NOTE` header carries the
human asset label + generation marker (spec's context requirement);
cue payload text is escaped for `-->` so OCR arrows can't corrupt it.

- `@param` {Array<{start:number,end:number,text:string}>} cues
- `@param` {string} [note] Optional NOTE header line (asset label).
- `@returns` {string} Complete `.vtt` file body.
