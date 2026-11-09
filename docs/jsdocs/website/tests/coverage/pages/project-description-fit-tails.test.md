# `website\tests\coverage\pages\project-description-fit-tails.test.js`

Coverage tails for views/project/layout.ts — the

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\pages\project-description-fit-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                  |

## Members

### `ORIG_RO`

Originals captured for restore — ResizeObserver/getComputedStyle/fonts are stubbed per test.

### `DESC`

Class-name aliases for the description block's size-tier classes.

### `descBlock`

Builds a detached description block holding `count` paragraphs.

- `@param` count — number of .internal-description-text <p> children

### `stubView`

Stub view — fitDescriptionSizes only reads the fields below.

### `stubMeasure`

Pins a paragraph's rendered height + computed line-height.
