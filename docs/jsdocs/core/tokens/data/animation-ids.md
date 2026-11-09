# `core\tokens\data\animation-ids.ts`

Animation registry — one stable id per distinct animated

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\data\animation-ids.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `BURGER_BUTTON`

Nav burger → ✕ liquid morph widget (WebGL/canvas + CSS lines fallback).

### `NAV_MENU_BACKGROUND`

Fullscreen nav backdrop — fbm contour field (GPU worker canvas + CSS plasma).

### `NAV_MENU`

Nav menu overlay — items staggered rise/fade entrance (CSS keyframes).

### `NAV_FLAG`

Locale flag — waving canvas flag + pop-in entrance (canvas + CSS).

### `SWITCH_SLIDER`

Preference switch — liquid thumb slide (WebGL/canvas + CSS).

### `THEME_SLIDER`

Theme toggle — orbital day/night slide (WebGL/canvas + CSS).

### `CLOSE_BUTTON`

Modal close ✕ — liquid fill + rotating strokes (WebGL/canvas).

### `SKELETON`

Loading skeleton — morphing glyph cells + traveling shimmer (canvas + CSS).

### `INTRO_LOADER`

Boot intro loader — counter-rotating rings + progress (CSS).

### `SITE_TOAST`

Notification toast — slide/fade entrance + exit (CSS).

### `MOSAIC_BURN`

Card-stack project-name letter combustion → rebuild (Rust/WASM particles + 2D raster).

### `MEDIA_PROGRESSIVE`

Media figure — low→high-quality morph on progressive load (canvas + WASM decode + CSS).

### `GLITCH_PORTRAIT`

About portrait — VHS glitch corruption passes (WebGL/canvas).

### `DIVIDER_SHEEN`

Footer divider — hairline with traveling light band (canvas).

### `TEXT_DRAW`

Section titles/links — per-character pen-stroke write-on (instanced canvas + CSS).

### `RING_SHEEN`

Tile border — traveling ring sheen loop (canvas).

### `CORNER_BRACKETS`

Action buttons — corner brackets expand on hover (canvas).

### `SCENE_3D`

Star-field / earth playground — full 3D scene (three.js WebGL/WebGPU).

### `GENIE_MODAL`

Expand modal — genie liquid warp + vapor particles open/close (WebGPU/Rust + 2D + CSS).

### `CAROUSEL`

Awards carousel — momentum scroll, progress fill, autoplay dash (scroll + CSS + JS).

### `ABOUT_TEXT`

About paragraphs — character-by-character reveal on scroll (JS-sequenced spans).

### `RELATED_TILE`

Related project tiles — hover lift/zoom spring + border sheen (CSS linear() springs).

### `BODY_GLOW`

Document ambient glow — slow radial drift behind content (CSS).

### `PROGRESS_BAR`

Route progress bar — scaleX crawl to ~70% while a navigation is in flight, then sweep-to-100 + fade (CSS transitions).

### `CARD_STACK`

Home project deck — deal-through card fan: drag/flick physics, inward
rotateY faces, GL quadratic bend, hero scale boost (JS poses + three.js).

### `ABOUT_MESH`

About portrait halo — polar dot lattice displaced by a traveling
radial wave + precessing guide lines (2D canvas rAF).

### `NAV_ICON_AURA`

Nav strip chips — comet-tail ring-fill sweeping the search/gear chip
outlines on hover (WebGPU ring-fill + CSS trail fallback).

### `VIEW_TRANSITION`

Route change — #view-outlet cross-fade between outgoing/incoming
views (JS class swap + CSS opacity transition).

### `ROUTE_SEARCH`

Route-search field — loading state: spinning submit glyph + bouncing
found-dots while the scoring dispatch is in flight (CSS).

### `CUSTOM_CAROUSEL`

Project-page carousels — autoplay progress dash, momentum scroll,
arrow nav (JS + CSS — distinct surface from the awards carousel).

### `MENTIONS_DECK`

Contact mentions deck — swipeable stacked cards, drag-to-dismiss,
autoplay cycle (JS gestures + CSS keyframes).

### `EXPAND_MODAL_LOADING`

Expanded-media lightbox loading — shimmer wash + spinner while the
full-size asset decodes (CSS).

### `FOOTER_FEED_WAVE`

Awards footer feed — opacity wave rippling across the source-feed
link row (CSS keyframes).

### `ANIMATION_DESC_ID_PREFIX`

Long-description node id prefix — the helper injects one
`<span id="lk-anim-desc-<id>">` per animation id into each shadow
root / document that hosts a described element, and points the
element's `aria-describedby`/`longdesc` at it.

### `ANIMATION_DOCS`

Frozen animation-id → docs-manifest node path map — one in-depth docs
page per animation record so the /animations listing deep-links into
the docs portal (api reference with signatures + comments, or the
module source for document-level CSS surfaces). Values are manifest
`node.path` strings (`<root>/<rel>`) as served by the docs portal —
`docs/…` roots address generated api/architecture pages under
shared/docs, module roots (`core/…`) address live source files.
Consumers prefix with ROUTE_PATHS.DOCS. Keys reuse ANIMATION_IDS
members directly so the file stays import-free (the static locale-page
generator loads it under plain-node type stripping) and no id string
is retyped (zero-hardcoding).

### `ANIMATION_DOCS_FALLBACK`

Docs path for animation records missing from ANIMATION_DOCS — the
animations deep-dive README dir, which the docs portal auto-opens
into its index page.
