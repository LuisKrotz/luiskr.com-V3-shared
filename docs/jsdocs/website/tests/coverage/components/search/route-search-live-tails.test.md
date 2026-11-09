# `website\tests\coverage\components\search\route-search-live-tails.test.js`

Coverage tails for &lt;route-search&gt; — live-driver arms the

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\search\route-search-live-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `state`

Mutable fixture state — the db/worker mocks read these per-call so
tests swap rows and flip the reject arm between cases.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.

### `waitCopy`

Waits until the `fetchFirebaseDb` `.then` has fired — the copy snapshot
resolves through a lazy `import()` chunk whose latency varies under
instrumentation, so a fixed timer misses it. `_applyStrings` only runs
inside that `.then`, making it the reliable readiness signal.

### `mount`

Mounts a <route-search> element and waits for its copy strings to land.

### `input`

Shadow-DOM lookup for the search text input.
