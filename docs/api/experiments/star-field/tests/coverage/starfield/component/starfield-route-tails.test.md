# `experiments\star-field\tests\coverage\starfield\component\starfield-route-tails.test.js`

Coverage tails for &lt;view-star-field&gt; route/deep-link

|                |                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\component\starfield-route-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                       |

## Members

### `flush`

Timer flush — drains the engine's queued promises between actions.

### `mount`

Mounts a <view-star-field> element into the body and returns it.

### `unmount`

Runs the element's teardown then removes it from the DOM — full unmount.

### `waitFor`

Poll-until-true wait — async engine stages complete at unbounded
times, so this ticks every 15ms until pred() or the 10s deadline.

### `SF_ROUTE`

Star-field route record — router.currentRoute stub for route tests.
