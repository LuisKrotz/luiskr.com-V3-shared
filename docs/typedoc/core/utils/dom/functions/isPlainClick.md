[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / isPlainClick

```ts
function isPlainClick(e): boolean
```

Defined in: core/utils/dom.ts:192

`isPlainClick` — true only for an unmodified primary activation: left
button, no Ctrl/Meta/Shift/Alt. Nav anchors are real `<a href>` so a
modified or middle click must reach the default action (open in new
tab/window); handlers call this first and bail out before any
preventDefault so the browser keeps native link semantics.
Non-mouse clicks (keyboard Enter → `detail` 0, button −1/undefined on
synthetic dispatches) count as plain — they carry no new-tab intent.

## Parameters

### e

`Event`

The click event.

## Returns

`boolean`

True when the click is a plain primary activation.
