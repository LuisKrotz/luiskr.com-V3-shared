# `core/tests/coverage/utils/gpu/webgpu-widget-env-tails.test.js`

Coverage tail for utils/gpu/webgpu-widget.ts arms that

|                |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| **Source**     | `src/core/tests/coverage/utils/gpu/webgpu-widget-env-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.           |

## Members

### `FakeWorker`

Scripted worker double — `responder` maps a posted message to its
reply; null means silence (dead-realm path).

### `flush`

Waits for worker-ack microtasks + the 0ms reply timers.

### `transferableCanvas`

Canvas double whose transferToOffscreen yields a stub offscreen.

### `deadLoader`

Artifact loader that always rejects — drives every in-page fallback.
