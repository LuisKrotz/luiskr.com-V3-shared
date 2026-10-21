[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/wasm](../README.md) / pushGlitchRect

```ts
function pushGlitchRect(s): void
```

Defined in: website/components/home/about/glitch/wasm.ts:30

Pushes the session's cover-fit rect into the widget — device px, the
same rect the 2D painters draw through, so frag→uv mapping reproduces
`object-fit: cover` + `object-position` exactly.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Live session with a mounted widget + measured rect.

## Returns

`void`
