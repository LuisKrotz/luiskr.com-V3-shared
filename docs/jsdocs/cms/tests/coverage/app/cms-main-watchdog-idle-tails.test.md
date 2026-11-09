# `cms\tests\coverage\app\cms-main-watchdog-idle-tails.test.js`

Coverage tails for cms/main.ts — the boot watchdog's armed

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/cms\tests\coverage\app\cms-main-watchdog-idle-tails.test.js` |
| **UX surface** | Admin bundle — editors for every database node.                   |

## Members

### `dropStaleServiceWorkers`

Spy stand-in — the mock factory closes over this so tests assert calls.

### `root`

Boot mount point — main.ts requires an existing #cms-root element to mount into.
