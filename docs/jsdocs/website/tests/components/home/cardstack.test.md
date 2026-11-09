# `website\tests\components\home\cardstack.test.js`

&lt;card-stack&gt; — the stacked featured-project deck: fan

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\tests\components\home\cardstack.test.js`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ITEMS`

Four-card fixture — enough for stacked/fan tier assertions.

### `SELS`

Selector bundle for the card/active/dot/thumb elements under assertion.

### `FAN_TIER`

A desktop fan tier + the stacked phone tier — deterministic geometry
references for the pure-math assertions (mounted decks pick their
own tier from the happy-dom viewport).

### `pointerEvt`

Synthetic pointer-event factory — pointerId/button/coords/timestamp
with per-test overrides and an optional target for delegation tests.

### `mountDeck`

Mounts a CardStack preloaded with ITEMS and waits for the cards to render.

### `deckEl`

Shadow-DOM lookup for the deck container element.
