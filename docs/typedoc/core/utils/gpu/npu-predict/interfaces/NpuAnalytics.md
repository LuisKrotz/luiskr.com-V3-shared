[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/gpu/npu-predict](../README.md) / NpuAnalytics

Defined in: core/utils/gpu/npu-predict.ts:43

HUD-facing predictor metrics.

## Properties

### npuAccelerated

```ts
npuAccelerated: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:45

Whether the WebNN NPU tier is live.

***

### gpuAccelerated

```ts
gpuAccelerated: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:47

Whether the shared GPU tier is live.

***

### wasmAccelerated

```ts
wasmAccelerated: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:49

Whether the WASM worker tier is live (always true — the last resort).

***

### totalPredictions

```ts
totalPredictions: number;
```

Defined in: core/utils/gpu/npu-predict.ts:51

Lifetime prediction count.

***

### successfulPreloads

```ts
successfulPreloads: number;
```

Defined in: core/utils/gpu/npu-predict.ts:53

Successful prefetch injections.

***

### lastPredictionConfidence

```ts
lastPredictionConfidence: number;
```

Defined in: core/utils/gpu/npu-predict.ts:55

Most recent probability, rounded to cents.

***

### avgComputeMs

```ts
avgComputeMs: number;
```

Defined in: core/utils/gpu/npu-predict.ts:57

Exponential-ish running mean of scoring time in ms.
