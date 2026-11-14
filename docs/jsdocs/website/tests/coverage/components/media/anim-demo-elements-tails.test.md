# `website\tests\coverage\components\media\anim-demo-elements-tails.test.js`

Coverage tails for website/components/media/anim-demo/elements.ts

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\media\anim-demo-elements-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `snap`

Controllable snapshot — exists() + val() per fetch call.

### `fetchImpl`

The fetch mock — re-seeded per test via _queue.

### `_sceneResult`

Scene mount result — re-seeded per test to drive ok/null/reject arms.

### `_fake2d`

A no-throw 2D-context stub — happy-dom canvases have no real 2D backend;
the stub stands in so the genie warp driver exercises its attach/frame
paths exactly as it would on a real canvas.

### `makeGenieStage`

A staged mini lightbox — the real expand-modal classes the sheet bake
and veil query resolve on, plus the origin card the funnel flies to.

- `@returns` The stage carrying content + media figure + origin card.

### `makeStage`

A stage element optionally carrying one child tag.

### `PORTFOLIO`

A portfolio row fixture — featured via the explicit flag arm.

### `_localeSeq`

Unique locale per test — loadDemoData caches its promise per locale.
