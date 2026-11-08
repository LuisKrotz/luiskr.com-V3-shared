# `core\tests\coverage\utils\wasm\nav-glyph-runtime-tails.test.js`

Coverage tail for utils/wasm/nav-glyph.ts — the live

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\wasm\nav-glyph-runtime-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.            |

## Members

### `fakeCtx`

Spy-backed 2d context — every call the painter makes.

### `makeHost`

Host inside a chip button with a stub-canvas in its shadow root.

### `fakeGlue`

Injected glue module — { default(): {memory}, GlyphFx }: the pool
buffer lives in a real ArrayBuffer so the painter reads alpha/size/hue
exactly as it would from wasm records.

### `mountIsolated`

Fresh module instance + injected glue → mountNavGlyph under test.
