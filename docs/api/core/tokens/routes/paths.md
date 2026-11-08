# `core\tokens\routes\paths.ts`

Path tokens split by function — public URL routes, Firebase

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\routes\paths.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ROUTE_PATHS`

Frozen public-route map — canonical (English) URL paths. `*_SEGMENT`
variants exist for string-contains matching when the leading slash would
false-positive (e.g. '/portfolio/' vs the bare 'portfolio' segment);
`PORTFOLIO`/`PORTFOLIO_SLASH` duplicate intentionally so call sites
read unambiguously by intent.

### `SEARCH_SEGMENT`

English search-page segment — other locales use their LANG_SLUGS entry.

### `SITEMAP_SEGMENT`

English sitemap-page segment — other locales use their LANG_SLUGS entry.

### `FEED_FILE`

Locale RSS feed file — `/feed.xml` (en) or `/<loc>/feed.xml`; both
are firebase rewrites onto the generated `/meta/…/feed.xml`.

### `FEED_CSS_FILE`

Compiled feed sheet — `/feed.css` rewrites onto `/meta/feed.css`,
which generate-sitemap.js emits from website/sass/feed.scss; every
feed's `type="text/css"` xml-stylesheet PI points here so the raw
XML renders branded instead of as a raw element tree (the CSS PI
survives client-side XSLT's removal from browsers).

### `DB_PATHS`

Frozen db path map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `PROJECTS_SEGMENT`

Segment names inside translations/<locale>/ used by the bootstrap chunks

### `ASSET_PATHS`

Frozen asset path map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `WASM_WIDGETS_PREFIX`

wasm-pack `--target web` widget artifacts — `/wasm/<slug>/`.

### `WASM_DIAGRAM_PREFIX`

`rust/diagram` artifacts — the mermaid-subset SVG engine.

### `ORT_WASM_PREFIX`

ONNX Runtime wasm/glue binaries — `/ort/ort-wasm-…`.

### `ML_MODELS_PREFIX`

Generated ONNX model files — `/models/<slug>.onnx`.

### `EMPTY_CAPTIONS`

Shared empty WebVTT caption track — muted ambient/showcase videos
carry no meaningful audio, so the caption file is intentionally
empty; its presence satisfies caption_track_exists with an honest
"nothing to caption" track.
