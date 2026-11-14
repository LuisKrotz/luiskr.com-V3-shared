[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/genie](../README.md) / genieLeave

```ts
function genieLeave(component, done, classes?): void
```

Defined in: core/utils/motion/genie.ts:114

Plays the collapse-back-to-origin animation, then runs done() so the
caller can finish unmounting. Instant (done() immediately) under reduced
motion or when the backdrop isn't in the DOM.

## Parameters

### component

`GenieHost`

host exposing the shadow-scoped `$` helper

### done

() => `void`

callback run once the collapse has finished (or instantly)

### classes?

[`GenieClasses`](../interfaces/GenieClasses.md) = `PREF_GENIE_CLASSES`

class contract — defaults to the preferences dialog set

## Returns

`void`
