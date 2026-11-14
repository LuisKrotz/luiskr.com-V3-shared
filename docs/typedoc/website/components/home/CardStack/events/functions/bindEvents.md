[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: website/components/home/cardstack/events.ts:169

Binds every listener the deck needs — shadowRoot delegation covers
re-renders (nodes swap per _updateDom, listeners don't); the pointer
stream is deck-gated so the index panel and chrome can't drag the fan.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
