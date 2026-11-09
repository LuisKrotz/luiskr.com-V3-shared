# `experiments\earth-playground\tests\playground\space\space-playground-spaceplayground.test.js`

Split from space-playground.test.js — covers the "SpacePlayground" describe.

|                |                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\tests\playground\space\space-playground-spaceplayground.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                            |

## Members

### `dbData`

RTDB payload the fetchFirebaseDb mock serves — minimal fields the view renders.

### `mount`

Mounts a <view-space-playground> element into the body and returns it.

### `waitBoot`

Poll-until-rendered wait — the engine boot is multi-stage async, so this
ticks every 30ms until the settings panel appears in the shadow root or the
8s deadline rejects (fail-fast rather than hanging the suite).

### `origGetContext`

Saved canvas.getContext — beforeEach captures it so tests can stub WebGL failures.

### `_flush`

Timer flush — lets queued microtasks/rAF work drain between actions.

### `_unmount`

Runs the element's teardown then removes it from the DOM — full unmount.
