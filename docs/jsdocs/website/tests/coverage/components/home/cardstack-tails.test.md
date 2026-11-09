# `website\tests\coverage\components\home\cardstack-tails.test.js`

Coverage tails for &lt;card-stack&gt;: manifest-loaded media

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\home\cardstack-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.              |

## Members

### `item`

Card-item factory — unique link/image/label per index, overrides merge in.

### `SELS`

Selector bundle for the card/dot/highlight elements under assertion.

### `FAN_TIER`

A desktop fan tier + the stacked phone tier — deterministic geometry
references (mounted decks pick their own tier from the happy-dom
viewport).

### `evt`

Synthetic pointer-event factory — pointerId/button/coords/timestamp
with per-test overrides and an optional target for delegation tests.

### `cleanups`

Teardown registry — mounts push cleanup fns; afterEach drains them.

### `mountItems`

Mounts a CardStack preloaded with `items` and waits for the cards to render.

### `deckEl`

Shadow-DOM lookup for the deck container element.
