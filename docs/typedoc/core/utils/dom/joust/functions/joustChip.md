[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/dom/joust](../README.md) / joustChip

```ts
function joustChip(chip, pointerInitiated?): boolean
```

Defined in: core/utils/dom/joust.ts:132

The joust gate for a chip element — returns `true` when the chip's
action should fire, `false` when this tap was consumed to pour the
label. `chip` may be the `joust` root itself or any descendant
(icon, label span, canvas) — the root resolves through `closest`.
`pointerInitiated` distinguishes physical taps from scripted calls:
pass `false` for keyboard, programmatic or test activations, which
always fire single-shot.

## Parameters

### chip

`Element` \| `null` \| `undefined`

Element the activation landed on (or null — no chip → fire).

### pointerInitiated?

`boolean` = `true`

True for real pointer presses.

## Returns

`boolean`

True = run the action; false = the click jousted the label open.
