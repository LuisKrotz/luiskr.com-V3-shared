[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / parseInk

```ts
function parseInk(css): [number, number, number]
```

Defined in: experiments/docs/arch-scene-3d.ts:106

Parses a CSS color string into 0-1 rgb channels — the engine takes
raw f32 triplets where the three path passed a `THREE.Color`.
Handles rgb()/rgba() and #rgb/#rrggbb (what `getComputedStyle`
emits); anything else falls back to white — unreachable in real
browsers, which always resolve `color` to an rgb() serialization.

## Parameters

### css

`string`

Computed color string.

## Returns

\[`number`, `number`, `number`\]

[r, g, b] in 0-1.
