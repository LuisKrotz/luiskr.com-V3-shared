# `experiments\earth-playground\space\schema.ts`

Runtime JSON-LD parity for the Earth Playground route —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\space\schema.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_pageName`

Route meta title minus the BASE_TITLE affixes — the same page-name
derivation buildRouteJsonLd applies, so the emitted WebPage/WebApplication
names match the document title.

- `@param` title The route's meta title.
- `@returns` The bare page name.

### `emitSpaceJsonLd`

Emits the Earth Playground graph — route base + WebApplication whose
`featureList` enumerates every control group's localized label, every
control's localized label and every group action, mirroring the
build-time entity so the post-hydration graph keeps parity with the
served document (and the canvas-rendered panel stays crawler-legible).

- `@param` c The view — translations supply the localized labels.
