[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/nav-glyph](../README.md) / mountNavGlyph

```ts
function mountNavGlyph(host, kind, colorProps): Promise<NavGlyphSession | null>
```

Defined in: core/utils/wasm/nav-glyph.ts:74

Mounts the animated glyph on an icon element: finds its canvas in the
shadow root, wakes the emitter on the owning chip's pointer/focus, and
paints the wasm particle records each frame in the two palette colors read
from the icon's own computed neon tokens.

## Parameters

### host

`HTMLElement`

the <nav-*-icon> element that owns the canvas

### kind

`number`

NAV_GLYPH.KIND_STREAK or NAV_GLYPH.KIND_SWOOSH

### colorProps

\[`string`, `string`\]

the two --nav-neon-* custom properties to paint with

## Returns

`Promise`\<[`NavGlyphSession`](../interfaces/NavGlyphSession.md) \| `null`\>

a session handle, or null when wasm, the canvas or reduced motion rule it out
