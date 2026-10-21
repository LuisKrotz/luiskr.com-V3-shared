[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/scroll-spring](../README.md) / cancelSpringScroll

```ts
function cancelSpringScroll(track, animClass): void
```

Defined in: core/utils/motion/scroll-spring.ts:169

Cancels a live spring — user-input takeover (wheel/touch): the track
stays wherever the spring left it and mandatory snap re-engages from
the lifted class. The caller's onSettle is dropped — a cancelled nav
must not fire its teleport.

## Parameters

### track

`Element`

The scrolling element.

### animClass

`string`

The modifier class to lift.

## Returns

`void`
