[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / autoplayMusic

```ts
function autoplayMusic(host): void
```

Defined in: experiments/star-field/star/music.ts:185

Mount-time autoplay — skipped under prefers-reduced-motion (the
screen-reader proxy) so AT sessions start silent; anyone can still
press play. The rejection is swallowed for the same autoplay-policy
reason as playMusic.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

## Returns

`void`
