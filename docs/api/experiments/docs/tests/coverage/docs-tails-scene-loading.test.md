# `experiments\docs\tests\coverage\docs-tails-scene-loading.test.js`

Coverage tails for the map-stage loading veil — the

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\docs-tails-scene-loading.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                |

## Members

### `readyCb`

Callback captured from mountArchScene — tests fire onReady manually.

### `lostCb`

Callback captured from mountArchScene — tests fire onLost (context loss).

### `mountReturn`

Handle mountArchScene returns — tests swap to control the live/null path.

### `flush`

Timer flush — mounted scene queues need real timers past microtasks.

### `liveHandle`

Minimal arch-scene handle — every method a jest.fn so tests assert calls.

### `veilOf`

Shadow-DOM lookup for the map-stage loading veil element.
