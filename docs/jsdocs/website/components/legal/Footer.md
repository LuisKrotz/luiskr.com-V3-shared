# `website\components\legal\Footer.tsx`

&lt;legal-footer&gt; — footer strip shared by internals and the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\legal\Footer.tsx`               |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `feedHrefFor`

Locale RSS feed URL — `/feed.xml` for English, `/<loc>/feed.xml`
otherwise; both are firebase rewrites onto the generated meta feeds.

- `@param` locale active locale code
- `@returns` root-relative feed path for that locale

### `feedGlyph`

Inline RSS glyph — decorative (`aria-hidden`, the anchor's visible text
carries the accessible name). Paints in currentColor so it inherits the
link ink in every theme; the arcs carry the wave class that pulses them
outward on hover/focus (internals `_internal.scss`, reduced-motion aware).

### `LegalFooter`

The LegalFooter — footer class.

### (module scope)

Loads the legal-links node when missing (SWR).

### (module scope)

JSX template for the component's shadow DOM.
