[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/wasm](../README.md) / tryWasmBurn

```ts
function tryWasmBurn(s): void
```

Defined in: website/components/home/mosaic/burn/wasm.ts:164

Attempts the wasm mount: creates the stacked particle canvas (same
class/box as the paper canvas — it paints above it by DOM order) and
mounts the burn artifact on it with MANUAL drive — this module keeps
the session's own RAF loop, so the bridge only initializes the
surface. On any failure the 2D particle path simply keeps running.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — must already be laid out (syncPaper ran).

## Returns

`void`
