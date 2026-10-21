[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / observeResize

```ts
function observeResize(s, wrap): ResizeObserver | null
```

Defined in: website/components/home/about/glitch/session.ts:76

Watches the picture wrapper for geometry changes: the session's device-px
canvas is pinned to `width:100%`, so it must be re-rastered whenever the
CSS box moves (resize, grid reflow, sibling expand) — otherwise the stale
raster stretches into a zoomed/cropped portrait. Skips no-op callbacks.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Live glitch session (rebuilds cover crop + channel ghosts).

### wrap

`HTMLElement`

The wrapper element to observe.

## Returns

`ResizeObserver` \| `null`

The armed observer, or null where RO isn't available.
