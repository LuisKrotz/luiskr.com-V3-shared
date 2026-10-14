# `core/safari/patches/carousel-media.ts`

Carousel-hosted media overrides for iOS/Safari — WebKit

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/safari/patches/carousel-media.ts`               |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `isCarouselHosted`

Whether a media-figure is hosted inside a carousel — the figure's
shadow root is owned by the slide, so the _element's_ root node is the
carousel's own shadow tree and `host` is the carousel element.

- `@param` el The media-figure element being mounted.
- `@returns` true when the figure lives inside <custom-carousel> or

### `eagerizeCarouselFigure`

Eager image path for carousel-hosted figures: flip the thumbnail to
loading="eager" (lazy never fires for iOS WebKit inside the scrolled
track) and kick the Q50 high-res swap immediately instead of waiting
on the IntersectionObserver Safari silently drops.

- `@param` el The carousel-hosted media-figure.

### `eagerizeShadowImages`

Wraps a carousel element's _updateDom so every <img> painted into its
own shadow root — custom-carousel's mirrored pattern backdrops and
awards-carousel's lazy slide images — is forced to eager loading on
every re-render. Figures inside the slides are handled per-mount via
eagerizeCarouselFigure().

- `@param` tag Custom-element tag name to wrap.

### `patchCarouselMedia`

Installs the eager-image wrap on both carousel elements — see
eagerizeShadowImages for the mechanics.
