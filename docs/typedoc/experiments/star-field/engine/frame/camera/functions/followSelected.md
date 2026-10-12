[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/camera](../README.md) / followSelected

```ts
function followSelected(s): void
```

Defined in: experiments/star-field/engine/frame/camera.ts:257

Orbit-follow — keeps the followed anchor pinned at the world origin by
counter-translating `s.world` (the floating origin). Rider-mounted
bodies translate ~16k units/s on the galactic ring; riding them by
translating the camera would push every coordinate to ~6.7M where
float32 quantization (±0.5 units) makes each mesh visibly jitter.
Shifting the world instead of the camera yields identical relative
motion — the user's orbit/zoom offset is preserved because neither
camera nor target moves — while rendered coordinates stay small.
Runs before `updateFly` each tick so the tween's `track()` resolves
inside the pinned frame (select→glide becomes a local move, not a
galactic transit). The controls target snaps to the pin only once no
fly tween owns it, so orbiting still circles the body while the
tween's own target lerp stays free to pan.
Registry ids carry no anchor — they are static shard points — and are
skipped. Runs every tick (not just post-fly) so the repin lands the
same frame a new follow is armed.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
