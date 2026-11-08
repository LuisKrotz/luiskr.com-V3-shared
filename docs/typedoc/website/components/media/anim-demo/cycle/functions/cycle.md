[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/cycle](../README.md) / cycle

```ts
function cycle(ms, steps, immediate?): () => void
```

Defined in: website/components/media/anim-demo/cycle.ts:43

Repeating step sequencer — runs `steps[i % steps.length]` every `ms`,
advancing i so a demo walks an open→hold→close→hold choreography.
Skips scheduling entirely under reduced motion (the staged widget's
own reduced path paints its settled frame; the steps would only snap
states nobody should watch move).

## Parameters

### ms

`number`

Interval between steps.

### steps

() => `void`[]

Ordered step callbacks — each performs one state change.

### immediate?

`boolean` = `false`

Run step 0 at mount instead of waiting a beat —
demos whose idle state is hidden (menu closed, toast absent,
dialog left) must land their visible state synchronously or the
stage reads as an empty box for the first dwell.

## Returns

Teardown clearing the interval.

() => `void`
