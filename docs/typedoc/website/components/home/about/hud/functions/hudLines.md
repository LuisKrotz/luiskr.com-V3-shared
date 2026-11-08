[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/hud](../README.md) / hudLines

```ts
function hudLines(loc): HudLines
```

Defined in: website/components/home/about/hud.ts:71

Formats one location into the four readout lines. The detail line prefers
the altitude record and falls back to the latitude — always a real
coordinate, never chrome filler.

## Parameters

### loc

[`AboutLocation`](../interfaces/AboutLocation.md) \| `undefined`

the location entry

## Returns

[`HudLines`](../interfaces/HudLines.md)

the four HUD line strings
