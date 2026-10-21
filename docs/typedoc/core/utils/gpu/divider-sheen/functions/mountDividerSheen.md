[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/divider-sheen](../README.md) / mountDividerSheen

```ts
function mountDividerSheen(hr, canvasClass): () => void
```

Defined in: core/utils/gpu/divider-sheen.ts:185

Mounts the divider-sheen widget over an `<hr>` divider. Returns a
disposer that releases the widget, the overlay canvas, the IO, and
the rAF — call it from the host component's `onDestroy` (and call
again on re-render: `_updateDom` swaps the `<hr>` node, so the old
mount's canvas + observer must go with it).

## Parameters

### hr

`HTMLElement`

The divider element (`aria-hidden` already — the canvas
is decorative paint on top of it).

### canvasClass

`string`

The overlay canvas's class token — the
stylesheet's `:has()` gate keys on it to hide the `<hr>` paint.

## Returns

Teardown function; safe to call more than once.

() => `void`
