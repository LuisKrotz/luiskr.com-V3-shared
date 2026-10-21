[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / liveImg

```ts
function liveImg(wrap): HTMLImageElement | null
```

Defined in: website/components/home/about/glitch/session.ts:97

The live decoded portrait, if the current DOM node is usable —
duck-typed because instanceof HTMLImageElement isn't reliable across
realms (happy-dom exposes the class only on the window it created).

## Parameters

### wrap

`HTMLElement`

## Returns

`HTMLImageElement` \| `null`
