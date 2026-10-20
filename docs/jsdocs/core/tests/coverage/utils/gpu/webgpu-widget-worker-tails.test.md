# `core/tests/coverage/utils/gpu/webgpu-widget-worker-tails.test.js`

Coverage tail for the render-worker route in

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/core/tests/coverage/utils/gpu/webgpu-widget-worker-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.              |

## Members

### `FakeWorker`

Scripted worker double — `responder` maps a posted message to the
reply the real worker would emit (posted asynchronously, like the
real thread).

### `flush`

Waits for pending worker-ack microtasks + the 0ms reply timers.
