# `website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-projection-tails.test.js`

Split from sizing-tails.test.js — covers the "custom-carousel sizing measureFit projection tails" describe.

|                |                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-projection-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                                                  |

## Members

### `stubEl`

Fresh element stub — measureFit only reads the fields below.

### `OVERHEAD_DESKTOP`

Per-item overhead ≥1024: item padding + side margins + gap token.

### `OVERHEAD_TABLET`

Per-item overhead below 1024: side margins have not kicked in yet.
