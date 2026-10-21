[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/loop](../README.md) / teardownBurn

```ts
function teardownBurn(s): void
```

Defined in: website/components/home/mosaic/burn/loop.ts:24

Final session teardown — restores the DOM title's ink, drops the burn
canvas + rewrite slot, and detaches the session from its card. Runs
when a reversed (rebuild) pass reaches progress 0; the pristine raster
painted that frame is pixel-identical to the restored DOM text, so the
handoff is seamless.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The finished session — torn down in place.

## Returns

`void`
