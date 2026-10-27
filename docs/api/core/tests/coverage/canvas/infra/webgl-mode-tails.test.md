# `core\tests\coverage\canvas\infra\webgl-mode-tails.test.js`

Coverage tails for utils/canvas/webgl-mode.ts — the

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\infra\webgl-mode-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.       |

## Members

### `canvas`

Fresh detached canvas element.

### `withCtx`

Canvas whose getContext hands `ctx` back for the webgl mode only.

### `lostCtx`

Context stub — `isContextLost` reads `lost`, getExtension hands `loseExt`.

### `revivableCtx`

Restorable context — restoreContext() flips the lost flag off.
