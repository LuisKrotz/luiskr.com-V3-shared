# `core\tests\coverage\utils\wasm\nav-glyph-tails.test.js`

Coverage tail for utils/wasm/nav-glyph.ts — the nav glyph

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\utils\wasm\nav-glyph-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.    |

## Members

### `COLORS`

Two neon palette vars — enough to cover the multi-color arm.

### `makeHost`

Builds an icon-like host inside a chip button, with the glyph canvas in its
shadow root (or without one when `withCanvas` is false).

- `@param` withCanvas whether the shadow root carries the glyph canvas
- `@param` inChip whether the host sits inside a <button>
- `@returns` the host element
