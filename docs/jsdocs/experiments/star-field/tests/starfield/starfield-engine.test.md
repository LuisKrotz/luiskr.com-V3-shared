# `experiments\star-field\tests\starfield\starfield-engine.test.js`

StarFieldEngine facade — init() always resolves (success,

|                |                                                                       |
| -------------- | --------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\starfield-engine.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.               |

## Members

### `setSearch`

Rewrites the URL without navigation — sets debug/query params per test.

### `flush`

Timer flush — drains the engine's queued promises between actions.

### `makeCanvas`

Mounts a fresh <canvas> into the DOM — the engine binds its renderer to it.
