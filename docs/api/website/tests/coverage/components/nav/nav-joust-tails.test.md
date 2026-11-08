# `website\tests\coverage\components\nav\nav-joust-tails.test.js`

Coverage tails for the joust gate wiring in

|                |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\nav\nav-joust-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.             |

## Members

### `stubMatchMedia`

Mirrors the setup.js matchMedia mock shape with a switchable `matches`.

### `makeChip`

A joust-rooted button chip hosting a `joust-label` span.

### `pointerClick`

Dispatches a real pointer click so `e.currentTarget` + `detail` are live.

### `menuHost`

Minimal NavMenuHost surface for toggleNavMenu/openNavMenu.
