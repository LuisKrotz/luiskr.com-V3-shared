# `website\tests\coverage\components\media\expanded-genie-texture-tails.test.js`

Coverage for website/components/media/expanded/genie-texture.ts —

|                |                                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\expanded-genie-texture-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                            |

## Members

### `mock2D`

A counting 2D-context stub — every method is a no-op, records calls.

### `rectOf`

Converts {x,y,w,h} fixture rects into the DOMRect shape the code reads.

### `CONTENT_RECT`

Modal-content rect — the genie texture samples this box as its frame.

### `makeContent`

A modal-content stub — content root with a real rect, children added per test.

### `addFigure`

Appends a figure + media item to the content stub with stubbed rects.
