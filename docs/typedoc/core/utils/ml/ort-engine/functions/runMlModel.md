[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/ort-engine](../README.md) / runMlModel

```ts
function runMlModel(slug, feeds, loadModule?): Promise<MlOutputs>
```

Defined in: core/utils/ml/ort-engine.ts:240

Runs one inference pass: wraps each feed in an ORT tensor, executes
the session, and unwraps the outputs into plain Float32Arrays.

## Parameters

### slug

`string`

Model slug — session is lazily created on first use.

### feeds

`Record`\<`string`, [`MlFeed`](../interfaces/MlFeed.md)\>

Input-name → {data,dims} map.

### loadModule?

() => `Promise`\<[`OrtModule`](../interfaces/OrtModule.md)\>

Injectable ORT loader — tests substitute a stub.

## Returns

`Promise`\<[`MlOutputs`](../type-aliases/MlOutputs.md)\>

Output-name → Float32Array, or null on any failure.
