# `experiments/star-field/star/render.tsx`

JSX for StarField's render() — boot loader overlay (same

| | |
|---|---|
| **Source** | `src/experiments/star-field/star/render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_DEFAULTS`

English snapshot for the pages/star-field node — pre-fetch labels.

### `NAV_PANEL_ID`

Stable aria-controls id for the navigator drawer.

### `renderFacts`

Renders the dossier facts list — one row per {label,value} pair. A
 malformed dossier payload renders the rest of the panel instead of
 crashing the whole view.

### `mediaUrl`

Resolves a dossier media `src` — absolute http(s) URLs (remote NASA /
Commons streams) pass through untouched; relative paths join under the
module's public-asset root (`/experiments/star-field/media/…`).
- `@param` src Media entry src from the dossier JSON.
- `@returns` The URL to hand to img/video/audio elements.

### `renderMedia`

Renders the dossier media gallery — images as captioned figures,
videos with `preload="none"` so the heavy MP4s stream only on play,
audio the same way (the real lazy-load contract for the multi-MB
NASA recordings). Every asset keeps its NASA/ESA credit line.

### `renderSections`

Renders the dossier's named prose sections — deep-history bodies carry
titled subsections (formation, exploration, geology…) between the
summary paragraph and the media gallery.

### `renderSignature`

Renders the provenance signature — acquisition and translation ISO
dates from the dossier `meta` block, so readers can audit when the
data was pulled and this locale's text produced.

### `RegistryRow`

One registry directory row — a real focusable button per catalogued
object (the keyboard/AT path into all 139k bodies): display name,
kind badge and distance from the shard record, selecting flies the
camera to the rendered point and opens the synthesized dossier.
- `@param` host The StarField component.
- `@param` rec The registry record.
- `@param` t Locale label map.

### `renderStarField`

Renders the StarField view.
- `@param` host The StarField component.
