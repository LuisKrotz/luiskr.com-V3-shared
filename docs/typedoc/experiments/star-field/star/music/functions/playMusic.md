[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / playMusic

```ts
function playMusic(host, index): void
```

Defined in: experiments/star-field/star/music.ts:110

Selects and plays a playlist track — retargets src only when it
actually changed (a re-tap on the loaded track just resumes), then
re-renders so the list repaints its active row. Playback rejection
(autoplay policy before a user gesture) is swallowed — the native
controls stay available to press play.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

### index

`number`

Track index into SF_MUSIC_TRACKS.

## Returns

`void`
