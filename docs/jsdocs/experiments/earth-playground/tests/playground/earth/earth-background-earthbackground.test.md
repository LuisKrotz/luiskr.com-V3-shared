# `experiments\earth-playground\tests\playground\earth\earth-background-earthbackground.test.js`

Split from earth-background.test.js — covers the "EarthBackground" describe.

|                |                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\tests\playground\earth\earth-background-earthbackground.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                            |

## Members

### `makeCanvas`

Mounts a fresh <canvas> into the DOM — EarthBackground binds its renderer to it.

### `waitBoot`

400ms settle — the async three.js bootstrap needs real timers past microtasks.
