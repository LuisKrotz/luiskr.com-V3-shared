# `experiments\star-field\tests\coverage\starfield\component\starfield-component-tails.test.js`

Coverage tails for &lt;view-star-field&gt; — the rare component

|                |                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\component\starfield-component-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                           |

## Members

### `dbData`

RTDB payload the fetchFirebaseDb mock serves — minimal fields the view renders.

### `mount`

Mounts a <view-star-field> element into the body and returns it.

### `unmount`

Runs the element's teardown then removes it from the DOM — full unmount.

### `esc`

Dispatches a synthetic Escape keydown — the nav-close hotkey.
