# `website\tests\components\media\anim-demo.test.js`

Covers website/components/media/AnimDemo.js + its

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\tests\components\media\anim-demo.test.js`  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_fake2d`

A no-throw 2D-context stub — happy-dom canvases have no real 2D backend;
this stub stands in so the 2D approximation drivers exercise their draw
paths exactly as they would on a real canvas.
