# `website\components\home\AwardsMentions.tsx`

&lt;awards-mentions&gt; — the legal footer band on home: the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\AwardsMentions.tsx`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `AwardsMentions`

The AwardsMentions — legal footer band class.

### `legalLinks`

Legal-page links for the footer row (see awards/data.ts).

### `_ensureData`

Loads the mentions + legal-links nodes when missing (SWR).

### `_mountDividerSheen`

Re-mounts the divider-sheen WebGPU widgets on the footer's `<hr>`
divider — the node is recreated on every render, so each update
disposes the stale mounts first (canvas + IO + rAF + widget).
Without `navigator.gpu` or under reduced-motion the mount helper
is a no-op and the CSS `::after` sweep stays the render path.

### (module scope)

Lifecycle: releases the divider mounts before the shadow root goes.

### `_bindLinks`

Wires internal links through the SPA router.

### (module scope)

JSX template for the component's shadow DOM.
