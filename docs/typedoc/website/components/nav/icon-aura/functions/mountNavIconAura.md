[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/icon-aura](../README.md) / mountNavIconAura

```ts
function mountNavIconAura(host): RingFillSession | null
```

Defined in: website/components/nav/icon-aura.ts:34

Mounts the ring-fill aura over the strip chips — one instanced
WebGPU canvas on the strip container, two tiles (search + gear).
Pointer enter/leave on each chip drives `setProgress` so the comet
tail sweeps the hovered chip's perimeter. Returns null silently when
WebGPU is off — the static SVG trails stay the visible cue.

## Parameters

### host

`HTMLElement` & [`NavIconAuraHost`](../interfaces/NavIconAuraHost.md)

the AppNav element

## Returns

\| [`RingFillSession`](../../../../../core/utils/gpu/ring-fill/interfaces/RingFillSession.md)
\| `null`

the live aura session, or null
