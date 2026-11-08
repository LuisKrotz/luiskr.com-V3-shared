# `website\tests\coverage\components\media\anim-demo-canvas2d-tails.test.js`

Coverage tails for website/components/media/anim-demo/canvas2d.ts —

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\media\anim-demo-canvas2d-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `recording2d`

Recording 2D context — every method a no-op, property writes absorbed;
`drawImage`/`fillRect` calls are counted so tests can assert the paint
actually ran (or was skipped) without a real canvas backend.

### `pump`

Runs every queued frame once; each pump re-arms the next callback.

### `makeStage`

A stage element carrying the demo canvas the drivers resolve.
