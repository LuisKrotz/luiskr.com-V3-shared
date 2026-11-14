[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / armPrintCapture

```ts
function armPrintCapture(canvas, repaint): void
```

Defined in: website/components/media/anim-demo/widgets.ts:69

Arms a demo canvas for the print adapter's capture handshake: on
`printcapture` the widget repaints one frame into its GL buffer so the
synchronous toDataURL read that follows has real pixels (the widgets
render with preserveDrawingBuffer:false, so without the repaint the
still would be a transparent blank).

## Parameters

### canvas

`HTMLCanvasElement`

Stage demo canvas.

### repaint

() => `boolean` \| `void`

Zero-arg frame repaint the armed canvas calls per capture —
returning false declines the still (unpainted async mount).

## Returns

`void`
