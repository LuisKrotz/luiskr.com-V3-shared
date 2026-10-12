[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/particles](../README.md) / drawParticles

```ts
function drawParticles(s, dt, stage, jagAmp): void
```

Defined in: website/components/home/mosaic/burn/particles.ts:114

Advances + draws particles. Burn embers flicker upward on buoyancy and
flecks tumble down; rebuild deposits (dir −1) fall under gravity from
the empty zone above each letter and die the moment they reach the
climbing front — the landing reads as the glyph re-inking itself.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — mutates s.particles, paints on s.ctx.

### dt

`number`

Seconds since the last frame.

### stage

`number`

Global burn stage 0..1 (1 − prog on rebuild).

### jagAmp

`number`

Jagged-edge amplitude in device px.

## Returns

`void`
