# `website\tests\coverage\pages\home-parallax-tails.test.js`

Coverage tails for views/home/parallax.ts — the desktop

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\pages\home-parallax-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.        |

## Members

### `flush`

Generous flush — the view's render + data queues need real timers.

### `stubFrames`

Pending-rAF queue — frame delivery stays deterministic per test.

### `run`

Deliver every queued frame once.

### `makeMql`

Minimal MediaQueryList — captured change listeners fire gate re-evals.

### `fire`

Trip the change listeners as a media-query crossing would.

### `stubMatchMedia`

Route matchMedia calls to the supplied per-query mqls.

### `stubRO`

ResizeObserver record — captured callbacks + observed targets.

### `makeView`

View double — element resolution + scoped-listener capture for the
arms a real view can't reach (post-detach fires, missing els).

### `fire`

Invoke every captured listener bound for `event`.

### `makeEl`

Element double — inline-var writes land in `vars`; rect is mutable.

### `expectVar`

Expected inline var value for an amplitude at a given progress.
