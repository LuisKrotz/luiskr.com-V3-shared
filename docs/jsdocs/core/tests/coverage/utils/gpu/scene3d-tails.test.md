# `core\tests\coverage\utils\gpu\scene3d-tails.test.js`

Coverage tail for utils/gpu/scene3d.ts — the JS facade

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\gpu\scene3d-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `mockGpu`

Mutable GPU/decode mock state — the module mocks below read these
per-call so tests steer capability/device/decode branches.

### `makeSurface`

Records surface calls on a fake Surface3d.
