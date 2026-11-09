# `experiments\star-field\tests\starfield\star-boot.test.js`

StarField boot helpers — loader progress mirroring, engine

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\star-boot.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.        |

## Members

### `setSearch`

Rewrites the URL without navigation — sets debug/query params per test.

### `flush`

Timer flush — drains the engine's queued promises between actions.

### `waitFor`

Poll-until-true wait — async boot stages complete at unbounded times,
so this ticks until pred() or the 8s deadline rejects.

### `makeHost`

Component-host stub — the fields star-boot touches (_engine/_canvasEl/
_sfReady/_updateLoader/$ …) with a real canvas appended to the DOM.
