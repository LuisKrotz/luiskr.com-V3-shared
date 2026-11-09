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

### `makeStage`

A stage element optionally carrying one child tag.

### `PORTFOLIO`

A portfolio row fixture — featured via the explicit flag arm.

### `_localeSeq`

Unique locale per test — loadDemoData caches its promise per locale.
