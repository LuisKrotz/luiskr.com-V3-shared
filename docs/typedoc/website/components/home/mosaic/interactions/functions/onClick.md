[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/interactions](../README.md) / onClick

```ts
function onClick(host, item, i, e?): void
```

Defined in: website/components/home/mosaic/interactions.ts:163

Card activation. Desktop: straight to the project route. Touch:
first tap expands the details (records bottomH so the wall reflows),
second tap on the SAME card navigates — the two-tap pattern gives
touch users the hover preview desktop users get for free.
Keyboard/NVDA/Narrator activation synthesizes a click with `detail`
=== 0 (no pointer coordinates) — it must navigate outright, never
queue as a "first tap". 'ontouchstart' in window is true for every
touchscreen laptop, so without this gate Enter only expanded the
card and screen readers announced "no action".

## Parameters

### host

[`HomeMosaic`](../../../HomeMosaic/classes/HomeMosaic.md)

### item

[`MosaicItem`](../../pack/interfaces/MosaicItem.md)

### i

`number`

### e?

`Event`

## Returns

`void`
