[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/interactions](../README.md) / applyIndexState

```ts
function applyIndexState(host): void
```

Defined in: website/components/home/cardstack/interactions.ts:115

Publishes indexOpen into the DOM without a re-render — the --index-open
class on the section drives the deck dim + panel reveal, the panel's
aria-hidden and the toggle's aria-expanded track the state for AT.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
