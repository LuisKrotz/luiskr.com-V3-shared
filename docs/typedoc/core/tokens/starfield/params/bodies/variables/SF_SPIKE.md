[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_SPIKE

```ts
const SF_SPIKE: Readonly<{
  SPIKE_SCALE: 4.6
  SPIKE_OPACITY: 0.45
  SPIKE_RAYS: 6
  SPIKE_ROT2: 0.25
  SPIKE_LEN2: 0.55
  SPIKE_THIN: 0.05
  SPIKE_CORE: 0.09
  SPIKE_JITTER: 0.12
}>
```

Defined in: core/tokens/starfield/params/bodies.ts:332

Diffraction-spike starburst — the telescope-optics cross that rides
bright stars. Spikes are soft elliptical gradients (never stroked
lines), seeded-rotated per star so no two crosses align. Kept as its
own bag since the sprite is a separate layer from halo + corona.
