[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / nextMusic

```ts
function nextMusic(host): void
```

Defined in: experiments/star-field/star/music.ts:132

Advances to the next playlist track, wrapping to the first after the
last — bound once to the element's `ended` event so the playlist
chains without extra wiring, and reused by the next transport button.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

## Returns

`void`
