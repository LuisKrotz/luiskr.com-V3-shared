# `experiments/star-field/engine/screenshot.ts`

PNG capture for the star-field engine: renders one frame,

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/screenshot.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FILENAME_STEM`

Download filename stem — the timestamp suffix lands at capture time.

### (module scope)

Renders one frame and downloads the canvas as PNG. `toDataURL` throws
on tainted canvases and returns 'data:,' on oversized ones — both fall
back to `toBlob` + an object URL.
- `@param` s Engine state.
