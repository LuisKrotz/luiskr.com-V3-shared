[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/fx](../README.md) / drawSplitBase

```ts
function drawSplitBase(s): void
```

Defined in: website/components/home/about/glitch/fx.ts:226

Chromatic aberration — replaces the base draw on split frames. The red
and cyan channel canvases are complementary: (R,0,0)+(0,G,B) sums back
to the exact source under 'lighter', so compositing them at opposing
offsets reproduces the portrait WITH the CRT fringe. Drawing them over
an already-composited base would double the exposure (2×R,2×G,2×B →
white blowout) — so this is the frame's base, never an overlay.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

## Returns

`void`
