# `website\views\legal\Legal.tsx`

&lt;view-legal&gt; — the legal-page route (privacy policy, GDPR,

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\legal\Legal.tsx`                     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ViewLegal`

The ViewLegal — legal class.

### (module scope)

Lifecycle: kicks off document loading.

### `onRouteParamChange`

Router hook — swapping between legal pages reloads the document without remounting.

### (module scope)

Lifecycle: cleans up listeners.

### (module scope)

Reloads when the locale changes.

### `loadData`

Fetches the legal document node (privacy-policy | gdpr | terms-of-use | license)
for the current locale. `wait` defers the DOM write — used after a
route swap so the old document's fade-out finishes before the new
skeleton→content swap (prevents a flash of loading state). SWR: the
callback fires immediately on cache hit AND on network revalidation.

### (module scope)

JSX template — two states: loaded renders the document's sections
(CMS HTML paragraphs via dangerouslySetInnerHTML — trusted content,
sanitized at write time in the CMS); loading renders 3 skeleton
sections mirroring the real title+paragraph geometry so the swap is
seamless. Text-only route: no media fetches at all.

### `drawPlan`

Ordered reveal plan for the TITLE cascade — one running cursor over
h1 + section h2s so titles still draw in reading order. Paragraphs
render as plain HTML instead of draw-text elements: the parked
article already painted this text, and a draw-text upgrade re-hides
every char (opacity-0 spans) then re-cascades — a long legal doc was
un-painting seconds of already-visible body text at mount (SI), on
top of ~50 shadow-root upgrades (TBT). Plain paragraphs paint once
and stay painted.
