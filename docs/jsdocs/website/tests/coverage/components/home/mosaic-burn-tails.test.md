# `website\tests\coverage\components\home\mosaic-burn-tails.test.js`

Coverage tails for website/components/home/mosaic/burn.ts —

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\home\mosaic-burn-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                |

## Members

### `BURN_CLASSES`

Class-name bundle the raw burn helpers expect — mirrors the production map.

### `armCardBurn`

Partial-applied wrappers — bind the class/selector bundles so tests call with just (host, index).

### `BURN_SEL`

Selector constants for the burn-overlay DOM the assertions query.

### `ITEMS`

Single-card fixture — the burn helpers only need one item to act on.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.
