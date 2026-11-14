[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/expand-spring](../README.md) / cancelExpandSpring

```ts
function cancelExpandSpring(el): void
```

Defined in: core/utils/motion/expand-spring.ts:186

Cancels a live expansion — the element stays wherever the spring left
it and the caller's onSettle is dropped (a cancelled open must not
commit `hidden`). Used on disconnect so no frames outlive the node.

## Parameters

### el

`HTMLElement`

The element whose spring should die.

## Returns

`void`
