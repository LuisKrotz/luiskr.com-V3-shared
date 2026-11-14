# `core\tests\coverage\utils\gpu\ring-fill-tails.test.js`

Coverage tail for utils/gpu/ring-fill.ts — the

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\gpu\ring-fill-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.   |

## Members

### `mockGpu`

Mutable GPU-mock state — the webgpu-widget mock below reads these per-call,
so tests steer capability/mount-result/call-count/latency branches.

### `flush`

Short flush — widget mount/event steps settle within ~30ms.

### `widget`

The recording fake widget.

### `makeWidget`

Widget harness — records the calls the binding layer forwards.
