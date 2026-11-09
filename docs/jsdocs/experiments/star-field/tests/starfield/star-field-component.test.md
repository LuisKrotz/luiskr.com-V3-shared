# `experiments\star-field\tests\starfield\star-field-component.test.js`

Full lifecycle for the real &lt;view-star-field&gt; element —

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\star-field-component.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                   |

## Members

### `dbData`

RTDB payload the fetchFirebaseDb mock serves — minimal fields the view renders.

### `setSearch`

Rewrites the URL without navigation — sets ?star / ?dossier params per test.

### `mount`

Mounts a <view-star-field> element into the body and returns it.

### `waitFor`

Poll-until-true wait — async engine stages complete at unbounded
times, so this ticks every 30ms until pred() or the 10s deadline.

### `unmount`

Runs the element's teardown then removes it from the DOM — full unmount.
