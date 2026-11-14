# `website\tests\coverage\components\media\anim-demo-wrapup-tails.test.js`

Coverage tails for media/anim-demo — the print-side

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\anim-demo-wrapup-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                      |

## Members

### `fakeGl`

A no-op WebGL stand-in: every method resolves a truthy stub so shader
program builds succeed, every enum reads as a number, and the draw
calls each repaint() issues sink harmlessly. The widget believes it
owns a live surface — which is exactly the readiness contract the
armed capture handshake gates on.

### `fake2d`

A no-op Canvas2D stand-in — the flag's shared-renderer blit target.

### `makeStage`

Stage carrying `n` canvases whose getContext answers the fakes.

### `armedCanvas`

Arms the stage's first canvas for a capture assertion.

### `capture`

Dispatches the print capture handshake on a canvas.

### `seedFlagRenderer`

Seeds the shared flag renderer's live-surface fields — acquire() then
returns it without re-probing and drawFlag paints through the stub GL.
