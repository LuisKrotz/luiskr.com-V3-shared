[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / armCtx2d

```ts
function armCtx2d(s): boolean
```

Defined in: website/components/home/about/glitch/session.ts:196

Claims the 2D backend on the session canvas and rebuilds the channel
ghosts + scanline tile against the already-measured cover rect. Called
directly when WebGPU is absent and by the wasm arm on mount/upload
failure — the painter pipeline is the permanent fallback.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Live session (geometry already measured).

## Returns

`boolean`

false when the context claim fails — the session is unusable.
