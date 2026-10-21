# `website\components\media\expanded\close.ts`

Dismissal sequence for &lt;media-expanded&gt;: the genie warp

| | |
|---|---|
| **Source** | `src/website\components\media\expanded\close.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `teardownExpandedModal`

The modal teardown — runs on genie settle (or immediately on the
reduced-motion/fallback paths). Order matters: the URL is restored
while the dialog still owns the top layer, then `close()` releases
the trap, then scroll + store reset hand the page back.
- `@param` el — the element

### `startExpandedClose`

Starts expanded close.
- `@param` el — the element
