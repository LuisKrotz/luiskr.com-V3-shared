[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/camera](../README.md) / SF\_TIP

```ts
const SF_TIP: Readonly<{
  EDGE_PAD: 56
}>
```

Defined in: core/tokens/starfield/params/camera.ts:84

Hover/hint tooltip projection — the navigator's position hint clamps
the picked body's projected marker inside the canvas edge when the
object sits off-screen or behind the camera, so hovering a catalog row
locates it at any zoom level. EDGE_PAD is the canvas-space inset (px)
that keeps the marker dot and its label readable on the frame edge.
