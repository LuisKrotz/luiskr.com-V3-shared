# `core\tests\coverage\canvas\loaders\page-backdrop-tails.test.js`

Coverage tail for the WebGL page backdrop — the facade's

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\loaders\page-backdrop-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.            |

## Members

### `CanvasProto`

happy-dom exposes the canvas constructor on window, not as a bare global.

### `PALETTE`

Fixture palette the computed-style mock serves — rgb() so parseCssColor resolves.

### `useMockGL`

Routes every canvas's webgl getContext to the shared mock (null for other types).

### `usePalette`

Computed-style mock — serves the fixture palette (or a custom map) for custom props.

### `flush`

Flushes a couple of pooled frames.
