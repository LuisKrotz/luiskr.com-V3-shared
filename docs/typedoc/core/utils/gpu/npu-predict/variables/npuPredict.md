[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/gpu/npu-predict](../README.md) / npuPredict

```ts
const npuPredict: NPUPredictor;
```

Defined in: core/utils/gpu/npu-predict.ts:358

Shared predictor singleton — pointer tracking, preloaded-target dedup,
and analytics are global state; a second instance would double-listen
pointermove.
