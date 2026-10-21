# `experiments\star-field\engine\fill-worker.ts`

Multi-threaded fill dispatcher — the star-field's heavy

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\fill-worker.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Merged fill result — flat interleaved buffers the caller writes into
geometry attributes (`pos` xyz triplets, `col` rgb triplets). Chunks
that compact variable-length output (belt rejection sampling, the
deep-field sentinel drop) return `kept` — the merged buffers are
sliced to the true point count by the caller via `count`.

### `kept`

Live vertex count after in-chunk compaction (≤ requested count).

### (module scope)

Worker reply envelope shape — results carry typed arrays (transferred).

### (module scope)

Dispatches one buffer fill to the worker pool, chunked by index range
for true multi-threading. `base` carries the job's constant payload —
seed, geometry params and the p-token map the worker mirrors — plus
`count` records split into ≤MAX_CHUNKS equal ranges. Replies merge in
order into one pair of typed arrays; any failed chunk (null reply,
malformed length) voids the whole result so the caller falls back to
the identical local fill rather than mixing partial buffers.
- `@param` action WASM_ACTIONS message type the worker dispatches on.
- `@param` base Constant job payload shared by every chunk.
- `@param` count Total record count to fill across chunks.
- `@param` fixedLen When true every chunk must return exactly its range
- `@returns` Merged fill buffers, or null on any failure → JS fallback.
