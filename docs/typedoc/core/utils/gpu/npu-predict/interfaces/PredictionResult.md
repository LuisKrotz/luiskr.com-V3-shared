[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/gpu/npu-predict](../README.md) / PredictionResult

Defined in: core/utils/gpu/npu-predict.ts:31

Outcome of one likelihood prediction.

## Properties

### probability

```ts
probability: number;
```

Defined in: core/utils/gpu/npu-predict.ts:33

Estimated navigation probability 0–1.

***

### preloaded?

```ts
optional preloaded?: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:35

true when the target was already prefetched.

***

### npuAccelerated?

```ts
optional npuAccelerated?: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:37

Which tier scored it — WebNN NPU.

***

### gpuAccelerated?

```ts
optional gpuAccelerated?: boolean;
```

Defined in: core/utils/gpu/npu-predict.ts:39

Which tier scored it — shared GPU.
