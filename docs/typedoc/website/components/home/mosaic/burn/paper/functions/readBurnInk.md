[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/paper](../README.md) / readBurnInk

```ts
function readBurnInk(): BurnInk
```

Defined in: website/components/home/mosaic/burn/paper.ts:35

Resolves the burn palette from the root CSS custom properties — dark
theme publishes a cyan-blue plasma ramp, light theme an airy
paper-fire ramp. Falls back to the fixed canvas inks when the
properties are absent (older stylesheet, non-themed host).

## Returns

[`BurnInk`](../../types/interfaces/BurnInk.md)

The four-stop combustion ink ramp.
