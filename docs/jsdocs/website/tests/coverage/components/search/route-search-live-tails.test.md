# `website\tests\coverage\components\search\route-search-live-tails.test.js`

Coverage tails for &lt;route-search&gt; — live-driver arms the

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\search\route-search-live-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `waitCopy`

Waits until the `fetchFirebaseDb` `.then` has fired — the copy snapshot
resolves through a lazy `import()` chunk whose latency varies under
instrumentation, so a fixed timer misses it. `_applyStrings` only runs
inside that `.then`, making it the reliable readiness signal.
