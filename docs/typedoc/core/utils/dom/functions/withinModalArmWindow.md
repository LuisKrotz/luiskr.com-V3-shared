[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / withinModalArmWindow

```ts
function withinModalArmWindow(openedAt, now?): boolean
```

Defined in: core/utils/dom.ts:98

Whether `now` still falls inside a just-mounted overlay's input-arm
window. Dialogs and the menu mount synchronously during the opening
gesture's dispatch, so a residual press from that same gesture — the
second click of an in-place double-click, or a mouseup retargeted onto
freshly mounted controls — lands inside the overlay and fires whatever
happens to sit under the cursor (a language option, the dismiss
backdrop). Capture-phase guards consult this before letting pointer
input through; a non-positive `openedAt` disarms the window entirely.

## Parameters

### openedAt

`number`

`performance.now()` sampled on the open transition.

### now?

`number` = `...`

Sample time — defaults to the shared time-origin clock.

## Returns

`boolean`

True while pointer input inside the overlay should be swallowed.
