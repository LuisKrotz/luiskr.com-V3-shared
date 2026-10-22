# `core\utils\ml\frame-time.ts`

ML-driven adaptive render quality for the WebGL/three.js

| | |
|---|---|
| **Source** | `src/core\utils\ml\frame-time.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Injectable inference signature — tests substitute without a session.

### `FrameTimePredictor`

Rolling frame-time → quality predictor. One instance per render
surface — the suggested quality is consumed as a pixel-ratio scale.

### (module scope)

Circular window of the last FRAMETIME_HISTORY frame times (ms/100).

### (module scope)

Ring cursor into `_window`.

### (module scope)

Frames recorded so far — throttles inference to INFER_EVERY.

### (module scope)

Inference in flight — prevents a second dispatch while one runs.

### (module scope)

Suggested resolution scale in [QUALITY_MIN, 1]. Starts at 1 — the
engine renders full quality until the model proves it can't hold.

### (module scope)

Called synchronously whenever `_quality` changes — consumers re-apply pixel ratio.

### (module scope)

Latched once destroyed — record() keeps measuring but never re-arms inference.

### (module scope)

Inference implementation — injectable for tests.

### `constructor`

- `@param` onQuality Optional callback fired on each quality transition —
- `@param` run Injectable model runner — defaults to the ORT engine.

### `quality`

Current suggested quality — read by the resize/pixel-ratio path.

### `record`

Records one frame's wall time and, every INFER_EVERY frames, kicks
an async inference. Never awaits — the rAF tick stays synchronous;
the predicted quality lands whenever the EP answers.
- `@param` ms The frame's duration in milliseconds.

### (module scope)

One inference pass: feeds the window (oldest→newest order via the
ring cursor) plus the current quality level, then moves `_quality`
one step toward the budget — down when the model predicts the next
frame overruns, up when it sees headroom.

### `destroy`

Releases the callback and blocks further inference dispatch — the
dynamic `import('onnxruntime-web/…')` inside the engine would fire
into a torn-down Jest/browser context otherwise. Any already-
in-flight call still resolves; its result is ignored with the
callback gone.
