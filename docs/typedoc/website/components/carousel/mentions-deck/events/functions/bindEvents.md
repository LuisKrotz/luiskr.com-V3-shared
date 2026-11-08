[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: website/components/carousel/mentions-deck/events.ts:76

Binds every listener the deck needs — shadowRoot delegation covers
re-renders (nodes swap per _updateDom, listeners don't); the pointer
stream is deck-gated so the dots and heading can't drag the strip.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
