[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/ort-engine](../README.md) / OrtModule

Defined in: core/utils/ml/ort-engine.ts:41

Minimal ORT module surface — the parts of `onnxruntime-web` in use.

## Properties

### InferenceSession

```ts
InferenceSession: object
```

Defined in: core/utils/ml/ort-engine.ts:43

Session factory.

#### create

```ts
create: (_uri, _opts) => Promise<OrtSessionLike>
```

##### Parameters

###### \_uri

`string`

###### \_opts

###### executionProviders

`string`[]

###### graphOptimizationLevel

`string`

##### Returns

`Promise`\<`OrtSessionLike`\>

---

### Tensor

```ts
Tensor: (_type, _data, _dims) => unknown
```

Defined in: core/utils/ml/ort-engine.ts:50

Tensor constructor — (type, data, dims).

#### Parameters

##### \_type

`string`

##### \_data

`Float32Array`

##### \_dims

`number`[]

#### Returns

`unknown`

---

### env

```ts
env: object
```

Defined in: core/utils/ml/ort-engine.ts:52

Runtime env — wasmPaths points ORT at `/ort/`.

#### wasm

```ts
wasm: object
```

##### wasm.wasmPaths

```ts
wasmPaths: string
```

##### wasm.numThreads

```ts
numThreads: number
```

#### logLevel

```ts
logLevel: string
```
