# `core\tests\coverage\utils\wasm\nav-glyph-plain-tails.test.js`

Coverage tails for core/utils/wasm/nav-glyph.ts — the

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\utils\wasm\nav-glyph-plain-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.          |

## Members

### `COLORS`

Two metal palette vars — enough to cover the multi-color arm.

### `makeHost`

Host with a shadow root + canvas whose getContext returns `ctxResult`.

### `GlyphFx`

Minimal `GlyphHandle` — wasm record buffer backed by a real ArrayBuffer.

### `glue`

Fake wasm-bindgen glue — the loader's dynamic-import returns this.
