[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/wasm](../README.md) / pushBurnSession

```ts
function pushBurnSession(s): void
```

Defined in: website/components/home/mosaic/burn/wasm.ts:99

Pushes the session's static tables into a freshly mounted widget —
begin() creates the sim (dir + paper origin + deterministic seed),
then letters/ink/colors land once. Called from the mount callback
after the artifact's init has resolved.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session.

## Returns

`void`
