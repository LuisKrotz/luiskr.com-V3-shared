# `core\safari\patches\media-figure\image-load.ts`

Safari image-loading overrides for MediaFigure: a

| | |
|---|---|
| **Source** | `src/core\safari\patches\media-figure\image-load.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `safariLoadHighRes`

Safari loadHighRes: requests the Q50 (medium) variant instead of the
uncompressed source — the medium tier is the decode-safe asset for
WebKit's ~4096px image ceiling, so every source (however large the
original) gets a real high-res paint instead of a permanent thumb.
The URL is emission-encoded exactly like load.ts's path — raw
concatenation breaks on bucket keys carrying spaces/non-ASCII, which
Safari resolves to a 404 where Chromium tolerated the literal.

### `bindSafariImageLoad`

Lazy-thumbnail + img-observer wiring for non-hero images: the thumb
defers via loading=lazy and the Q50 swap triggers once the figure
scrolls within ROOT_MARGIN_50 of the viewport.
