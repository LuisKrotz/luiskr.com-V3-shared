# `experiments\docs\tests\coverage\docs-tails-scene-pick-scenepath.test.js`

Coverage tails — the scene pick callback's group-prefix

|                |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\docs-tails-scene-pick-scenepath.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                       |

## Members

### `pickCb`

Callback captured from mountArchScene — tests fire onPick manually.

### `mountCalls`

Recorded mountArchScene invocations — tests assert canvas/groups args.

### `flush`

Timer flush — drains queued mount/pick microtasks between actions.
