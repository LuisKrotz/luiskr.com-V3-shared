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

### `renderStarField`

Renders the StarField view.
- `@param` host The StarField component.
