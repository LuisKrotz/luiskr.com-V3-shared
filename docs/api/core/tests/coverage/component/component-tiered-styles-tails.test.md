# `core\tests\coverage\component\component-tiered-styles-tails.test.js`

Coverage tails for the `?tiers` adoption path in

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\component\component-tiered-styles-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                 |

## Members

### `BASE_CSS`

Fixture sheets — base/mobile/desktop tiers exercise the tier-merge arms.

### `tiered`

A TieredStyles module whose loaders resolve synchronously-queueable css.

### `TAG`

Test-only custom-element tag names — guarded-define keeps re-runs safe.

### `flush`

Zero-ms flush — connected-callback renders drain within one macrotask.
