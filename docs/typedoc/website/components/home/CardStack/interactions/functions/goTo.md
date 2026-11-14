[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/interactions](../README.md) / goTo

```ts
function goTo(host, idx): void
```

Defined in: website/components/home/cardstack/interactions.ts:56

Moves the fan's virtual front to `idx` — ring-normalized, so out-of-range
indices wrap like the carousel's clone loop does. The pose write runs
with CSS transitions enabled (the --dragging class is absent outside a
live gesture) so every card glides along the fan curve to its new slot.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

### idx

`number`

Target deck index — wraps via modulo.

## Returns

`void`
