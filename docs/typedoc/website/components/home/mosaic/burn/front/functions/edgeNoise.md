[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/front](../README.md) / edgeNoise

```ts
function edgeNoise(x, ph): number
```

Defined in: website/components/home/mosaic/burn/front.ts:16

Deterministic smooth edge noise — three detuned sines read as an
organic flame line rather than static noise. `ph` (seconds) animates
the jag so the burn boundary itself licks sideways as it descends.

## Parameters

### x

`number`

Paper-space column the jag is sampled at (device px).

### ph

`number`

Animation phase — the session clock in seconds.

## Returns

`number`
