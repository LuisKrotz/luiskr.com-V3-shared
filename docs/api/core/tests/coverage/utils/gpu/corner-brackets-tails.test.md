# `core\tests\coverage\utils\gpu\corner-brackets-tails.test.js`

Coverage tail for utils/gpu/corner-brackets.ts — the

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\gpu\corner-brackets-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.         |

## Members

### `mockGpu`

Mutable GPU-mock state — the webgpu-widget mock below reads these per-call,
so tests steer capability/mount-result/call-count/latency branches.

### `flush`

Short flush — widget mount/event steps settle within ~30ms.

### `widget`

The recording fake widget.

### `makeWidget`

Widget harness — records hover/arm/color/resize/frame calls so tests
can assert the bindings the init layer wired through.

### `SPEC`

Widget spec passed to the factory — mirrors the production call shape.
