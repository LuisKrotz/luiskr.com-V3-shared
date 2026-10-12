[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/particles](../README.md) / spawn

```ts
function spawn(s, progress, jagAmp, dt): void
```

Defined in: website/components/home/mosaic/burn/particles.ts:47

Spawns particles along live letter fronts. `rate` is fractional — the
accumulator pattern (spawn whole particles, keep the remainder in
`t`-space implicitly by probabilistic gating) keeps density steady
without a second counter. Emissions come only from columns that
carry glyph ink and whose letter front is mid-flight, so embers pour
off burning edges — never out of the spaces between letters.

Burn sessions (dir +1) emit AT the front with upward velocity — the
classic rising-ember look. Rebuild sessions (dir −1) instead seed the
still-empty zone ABOVE the front and launch downward: deposits rain
top→bottom and land on the climbing edge, knitting the glyphs back.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — pushes into s.particles.

### progress

`number`

Global burn stage 0..1.

### jagAmp

`number`

Jagged-edge amplitude in device px.

### dt

`number`

Seconds since the last frame.

## Returns

`void`
