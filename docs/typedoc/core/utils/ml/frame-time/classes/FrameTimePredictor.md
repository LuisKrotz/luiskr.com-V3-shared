[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/frame-time](../README.md) / FrameTimePredictor

Defined in: core/utils/ml/frame-time.ts:34

Rolling frame-time → quality predictor. One instance per render
surface — the suggested quality is consumed as a pixel-ratio scale.

## Constructors

### Constructor

```ts
new FrameTimePredictor(onQuality?, run?): FrameTimePredictor;
```

Defined in: core/utils/ml/frame-time.ts:60

#### Parameters

##### onQuality?

((`_q`) => `void`) \| `null`

Optional callback fired on each quality transition —
engines use it to re-apply `setPixelRatio` without polling.

##### run?

`RunModel` = `runMlModel`

Injectable model runner — defaults to the ORT engine.

#### Returns

`FrameTimePredictor`

## Accessors

### quality

#### Get Signature

```ts
get quality(): number;
```

Defined in: core/utils/ml/frame-time.ts:66

Current suggested quality — read by the resize/pixel-ratio path.

##### Returns

`number`

## Methods

### record()

```ts
record(ms): void;
```

Defined in: core/utils/ml/frame-time.ts:76

Records one frame's wall time and, every INFER_EVERY frames, kicks
an async inference. Never awaits — the rAF tick stays synchronous;
the predicted quality lands whenever the EP answers.

#### Parameters

##### ms

`number`

The frame's duration in milliseconds.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/ml/frame-time.ts:138

Releases the callback and blocks further inference dispatch — the
dynamic `import('onnxruntime-web/…')` inside the engine would fire
into a torn-down Jest/browser context otherwise. Any already-
in-flight call still resolves; its result is ignored with the
callback gone.

#### Returns

`void`
