[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop/loop](../README.md) / renderFrame

```ts
function renderFrame(host, staticTime?): void
```

Defined in: core/utils/canvas/loaders/page-backdrop/loop.ts:121

Draws the lobe field. `staticTime` renders one settled pose (reduced
motion); otherwise the field clock advances by the clamped frame
delta so a backgrounded tab resumes without a jump. A theme flip
mid-loop resamples the palette; dirty flags gate the uploads.

## Parameters

### host

[`PageBackdropWebGL`](../../../page-backdrop-webgl/classes/PageBackdropWebGL.md)

the backdrop instance to draw

### staticTime?

`number` \| `null`

fixed field time for a single static frame

## Returns

`void`
