# `core/tokens/data/animation-ids.ts`

Animation registry — one stable id per distinct animated

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/data/animation-ids.ts`                   |
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

Mosaic title letter combustion → rebuild (Rust/WASM particles + 2D raster).

### `MOSAIC_TILE`

Mosaic tile — spring displacement + traveling border sheen (JS spring + canvas).

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

### `NOTE_DOT`

Internals note marker — soft pulse (CSS).

### `BODY_GLOW`

Document ambient glow — slow radial drift behind content (CSS).

### `PROGRESS_BAR`

Route progress bar — scaleX crawl to ~70% while a navigation is in flight, then sweep-to-100 + fade (CSS transitions).

### `ANIMATION_DESC_ID_PREFIX`

Long-description node id prefix — the helper injects one
`<span id="lk-anim-desc-<id>">` per animation id into each shadow
root / document that hosts a described element, and points the
element's `aria-describedby`/`longdesc` at it.
