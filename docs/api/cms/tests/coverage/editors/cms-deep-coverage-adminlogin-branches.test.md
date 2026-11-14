# `cms\tests\coverage\editors\cms-deep-coverage-adminlogin-branches.test.js`

Split from cms-deep-coverage.test.js — covers the "AdminLogin branches" describe.

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/cms\tests\coverage\editors\cms-deep-coverage-adminlogin-branches.test.js` |
| **UX surface** | Admin bundle — editors for every database node.                                |

## Members

### `authCallbacks`

Auth-state callbacks captured by the onAuthChange mock — tests fire them.

### `setCalls`

Recorded {path, value} pairs the set() mock observed — write assertions.

### `removeCalls`

Recorded paths the remove() mock observed — delete assertions.

### `defaultVal`

Fallback snapshot payload when no registered route matches the path.

### `snapOf`

RTDB snapshot stub — exists()/val() matching the SDK's DataSnapshot.

### `mount`

Mounts a custom element by tag into document.body and returns it.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.

### `alerts`

Recorded alert() messages — the alert stub pushes here.

### `confirms`

Queued confirm() return values — the confirm stub shift()s them.

### `_fire`

Sets a value on a shadow-DOM node then dispatches the event — one-call form fill.
