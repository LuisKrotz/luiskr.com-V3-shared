[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / toggleMusicPlay

```ts
function toggleMusicPlay(host): void
```

Defined in: experiments/star-field/star/music.ts:152

Play/pause toggle for the transport row — starts the current track
when paused (same swallowed autoplay rejection as playMusic) and
pauses when playing. The play/pause event listeners own the state
repaint, so this only drives the element.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

## Returns

`void`
