# `website\tests\coverage\components\media\media-figure-domsized-tails.test.js`

Coverage tails for figure/load.ts's display-sized DOM

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\media-figure-domsized-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                           |

## Members

### `stubBitmapEnv`

Stubs the bitmap pipeline globals; returns the mutable refs plus the
restore function. Each test tweaks the stubs before driving a publish.

### `publish`

Drives one probe confirm through loadHighRes with a stubbed Image
carrying the given natural dims, then flushes the async src assign.
