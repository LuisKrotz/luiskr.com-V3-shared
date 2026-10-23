# `core\tests\utils\motion\frame.test.js`

Shared frame scheduler (`utils/motion/frame.ts`) — pump

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\utils\motion\frame.test.js`               |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `armed`

The armed pump callback captured from the stubbed rAF (null = idle).

### `flushFrame`

Fires one frame: invokes the armed pump once with `ts` (the callback
is consumed before invocation, mirroring the native handle).

- `@param` {number} [ts] The frame timestamp handed to every callback.
