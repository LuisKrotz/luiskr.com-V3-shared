# `core\tests\coverage\utils\gpu\ring-fill-live-tails.test.js`

Coverage tails for utils/gpu/ring-fill.ts — the live

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\gpu\ring-fill-live-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `widget`

Fake wasm widget — jest fns record every forwarded session call.

### `handle`

Mount-handle the widget mock returns — canvas/widget/destroy surface.

### `TILES`

Glyph-id token the nav-glyph tile spec keys on.

### `makeHost`

Host + two tiles (one square → circle shape arm, one wide → rrect arm).

### `flush`

Generous flush — live-session rAF steps need real timers.
