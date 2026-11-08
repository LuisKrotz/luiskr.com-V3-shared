[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/mount](../README.md) / handleVideoKeydown

```ts
function handleVideoKeydown(c, vid, event): void
```

Defined in: website/components/media/figure/mount.ts:60

Applies the video's keyboard toggle contract when autoplay is disabled
by preference but the viewer deliberately activates the control.

## Parameters

### c

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

Media figure that owns the video.

### vid

`HTMLVideoElement`

Video element whose source and playback state change.

### event

`Event`

Keyboard event from the video control.

## Returns

`void`

Nothing; handled keys update playback and cancel their default.
