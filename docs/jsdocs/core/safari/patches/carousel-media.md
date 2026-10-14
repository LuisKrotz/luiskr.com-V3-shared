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
on the IntersectionObserver Safari silently drops. The `$` call is
optional-chained because the retroactive pass can encounter
not-yet-upgraded media-figure elements.

- `@param` el The carousel-hosted media-figure.

### `eagerizeShadowTree`

Eager pass over one carousel's shadow tree: flips every painted <img>
to loading="eager" (custom-carousel's mirrored pattern backdrops and
awards-carousel's lazy slide images alike) and eagerly arms every
media-figure inside — covering figures that mounted before the
MediaFigure onMounted patch could observe them. safariLoadHighRes
early-returns once isLoaded, so repeat passes on re-render are cheap
nudges, not duplicate loads.

- `@param` host The carousel element whose shadow tree is scanned.

### `eagerizeShadowImages`

Wraps a carousel element's _updateDom so every <img> painted into its
own shadow root is forced to eager loading on every re-render.
Elements already in the DOM upgrade synchronously inside the
customElements.define() call — before this whenDefined() microtask
installs the wrap — so a shadow-piercing retroactive pass (deep*
queries cross the nested view shadow roots) flips anything painted
in that window. Figures mounted later are handled per-mount via
eagerizeCarouselFigure() inside the MediaFigure onMounted patch.

- `@param` tag Custom-element tag name to wrap.

### `patchCarouselMedia`

Installs the eager-image wrap on both carousel elements — see
eagerizeShadowImages for the mechanics.
