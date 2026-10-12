[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fill-worker](../README.md) / fillField

```ts
function fillField(action, base, count, fixedLen): Promise<SFFill | null>
```

Defined in: experiments/star-field/engine/fill-worker.ts:63

Dispatches one buffer fill to the worker pool, chunked by index range
for true multi-threading. `base` carries the job's constant payload —
seed, geometry params and the p-token map the worker mirrors — plus
`count` records split into ≤MAX_CHUNKS equal ranges. Replies merge in
order into one pair of typed arrays; any failed chunk (null reply,
malformed length) voids the whole result so the caller falls back to
the identical local fill rather than mixing partial buffers.

## Parameters

### action

`string`

WASM_ACTIONS message type the worker dispatches on.

### base

`Record`\<`string`, `unknown`\>

Constant job payload shared by every chunk.

### count

`number`

Total record count to fill across chunks.

### fixedLen

`boolean`

When true every chunk must return exactly its range
length (spiral/elliptical fills); false allows compacted results
(belt/deep-field).

## Returns

`Promise`\<[`SFFill`](../interfaces/SFFill.md) \| `null`\>

Merged fill buffers, or null on any failure → JS fallback.
