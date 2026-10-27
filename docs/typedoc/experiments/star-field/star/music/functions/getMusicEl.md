[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / getMusicEl

```ts
function getMusicEl(host): HTMLAudioElement
```

Defined in: experiments/star-field/star/music.ts:54

The persistent playlist element — created once with the native
controls (play/seek/volume stay the browser's accessible interface),
the `nodownload` controls list, the `ended` auto-advance binding and
the play/pause state mirrors that keep the transport row's icons
truthful. Re-inserted by mountMusic() after every render rebuild
because the .sf-music card is JSX and gets replaced wholesale.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

## Returns

`HTMLAudioElement`

The shared <audio> element bound to the playlist.
