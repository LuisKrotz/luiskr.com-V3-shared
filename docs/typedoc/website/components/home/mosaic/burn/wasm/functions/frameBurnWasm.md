[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/wasm](../README.md) / frameBurnWasm

```ts
function frameBurnWasm(s, stage, jagAmp, dt): void
```

Defined in: website/components/home/mosaic/burn/wasm.ts:133

Per-frame wasm arm — pushes direction, stage + jagged amplitude and
ticks the sim once. `set_dir` clears live particles inside the crate
(a flip restarts the mote stream), so it is only forwarded when the
session's dir actually changed.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session.

### stage

`number`

Global burn stage 0..1 (climbs in both directions).

### jagAmp

`number`

Jagged-edge amplitude in device px.

### dt

`number`

Seconds since the previous frame.

## Returns

`void`
