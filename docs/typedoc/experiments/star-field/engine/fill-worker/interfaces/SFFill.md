[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fill-worker](../README.md) / SFFill

Defined in: experiments/star-field/engine/fill-worker.ts:31

Merged fill result — flat interleaved buffers the caller writes into
geometry attributes (`pos` xyz triplets, `col` rgb triplets). Chunks
that compact variable-length output (belt rejection sampling, the
deep-field sentinel drop) return `kept` — the merged buffers are
sliced to the true point count by the caller via `count`.

## Properties

### pos

```ts
pos: Float32Array
```

Defined in: experiments/star-field/engine/fill-worker.ts:32

---

### col

```ts
col: Float32Array
```

Defined in: experiments/star-field/engine/fill-worker.ts:33

---

### kept

```ts
kept: number
```

Defined in: experiments/star-field/engine/fill-worker.ts:35

Live vertex count after in-chunk compaction (≤ requested count).
