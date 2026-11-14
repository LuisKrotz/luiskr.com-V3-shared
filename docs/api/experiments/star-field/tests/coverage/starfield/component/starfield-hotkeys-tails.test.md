# `experiments\star-field\tests\coverage\starfield\component\starfield-hotkeys-tails.test.js`

Coverage tails for &lt;view-star-field&gt; printable-key

|                |                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\component\starfield-hotkeys-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                         |

## Members

### `dbData`

RTDB payload the fetchFirebaseDb mock serves — minimal fields the view renders.

### `mount`

Mounts a <view-star-field> element and pins a null shadowRoot.activeElement
stub — happy-dom throws on the getter when nothing holds focus.

### `settle`

60ms settle — deferred names-table/_updateDom timers must drain before detach.

### `unmount`

Async unmount — settles deferred timers first, then tears down + detaches.

### `press`

Dispatches a synthetic keydown into the element's shadow root —
cancelable:true so preventDefault works; modifiers are patched on
after construction since happy-dom's polyfill only copies key fields.
