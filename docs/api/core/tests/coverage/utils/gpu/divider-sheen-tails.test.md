# `core\tests\coverage\utils\gpu\divider-sheen-tails.test.js`

Coverage tail for utils/gpu/divider-sheen.ts — the

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\gpu\divider-sheen-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.       |

## Members

### `mockGpu`

Mutable GPU-mock state — the webgpu-widget mock below reads these per-call.

### `flush`

Short flush — widget mount/event steps settle within ~30ms.

### `widget`

Records the fake widget's setter calls.

### `makeWidget`

Widget harness — records the calls the binding layer forwards.
