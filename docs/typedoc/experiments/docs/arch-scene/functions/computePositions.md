[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / computePositions

```ts
function computePositions(placed): Promise<{
  xyz: Float32Array
  scale: Float32Array
}>
```

Defined in: experiments/docs/arch-scene.ts:481

Batch position compute — wasm worker first, local math on failure. The
worker replies with a transferable Float32Array; `structuredClone` of
the plain-object result also survives when transfer is unsupported.

## Parameters

### placed

[`PlacedNode`](../interfaces/PlacedNode.md)[]

Flattened tree nodes.

## Returns

`Promise`\<\{
`xyz`: `Float32Array`;
`scale`: `Float32Array`;
\}\>

xyz triplets, or null when nothing resolved.
