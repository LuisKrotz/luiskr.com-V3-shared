# `website\tests\coverage\components\media\expanded-genie-tails.test.js`

Coverage for website/components/media/expanded/genie.ts +

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\expanded-genie-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                    |

## Members

### `gpuEnabled`

Mutable flag — whether the WebGPU widget layer is opted-in.

### `bridgeResult`

Mutable bridge result — mountWebGpuWidget resolves with this.

### `bridgeRejects`

Mutable flag — mountWebGpuWidget rejects instead of resolving.

### `bridgeHold`

Deferred bridge gate — when set, mountWebGpuWidget awaits it first.

### `lastWidget`

The last widget the bridge handed out — setter calls recorded.

### `fetchNull`

Mutable flag — the media cache resolves a falsy url (push early-return).

### `decodeCalls`

Recorded decodeMediaInSeparateThread calls (url, w, h).

### `decodeRejects`

Mutable flag — the wasm decode pool rejects instead of resolving.

### `makeWidget`

Fake wasm widget — records the crate setter calls for assertions.

### `mock2D`

A counting 2D-context stub — every method is a no-op, canvas backref.

### `rafQueue`

Manual rAF queue — the spring clock steps only when tests pump it.

### `flushAsync`

Flush pending microtasks — the reject path crosses extra awaits.
