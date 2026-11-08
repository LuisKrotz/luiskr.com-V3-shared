[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/wasm](../README.md) / liveBurnParticles

```ts
function liveBurnParticles(s): number
```

Defined in: core/utils/burn/wasm.ts:149

The loop's settle check for the wasm path — the session idles once
the front is spent AND the crate's last mote died (mirroring the JS
`particles.length === 0` condition).

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session.

## Returns

`number`

Live particle count in the crate's sim.
