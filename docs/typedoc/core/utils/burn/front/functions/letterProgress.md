[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/front](../README.md) / letterProgress

```ts
function letterProgress(L, progress): number
```

Defined in: core/utils/burn/front.ts:32

A letter's own burn progress — global progress scaled by the letter's
speed, shifted by its ignition delay. Letters ignite at different
moments and race at different rates, so one glyph can be ash while a
neighbour is untouched.

## Parameters

### L

[`LetterBurn`](../../types/interfaces/LetterBurn.md)

The letter's burn unit (speed multiplier + ignition delay).

### progress

`number`

Global burn stage 0..1.

## Returns

`number`
