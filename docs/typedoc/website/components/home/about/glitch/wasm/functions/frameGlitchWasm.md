[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/wasm](../README.md) / frameGlitchWasm

```ts
function frameGlitchWasm(s): void
```

Defined in: website/components/home/about/glitch/wasm.ts:104

One wasm-backend frame — mirrors the 2D `frame()` clock (same 50ms dt
clamp) so the roll-bar sweep pace matches either backend. Pushes the
hover latch per frame (single f32 uniform — cheaper than edge-detecting
it) and drops to the 2D backend if the surface reports itself stale.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Live session with `s.wasm` non-null.

## Returns

`void`
