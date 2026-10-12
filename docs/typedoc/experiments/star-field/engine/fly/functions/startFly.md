[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fly](../README.md) / startFly

```ts
function startFly(s, track, offset, done?): void
```

Defined in: experiments/star-field/engine/fly.ts:30

Arms a fly-to tween: destination is `offset` units along the current
camera→body direction (or straight above when the camera is too close
to define a direction), target tracks the body's live world position.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### track

() =>
\| \{
`x`: `number`;
`y`: `number`;
`z`: `number`;
\}
\| `null`

Body world-position getter — re-resolved per frame so a
moving (rider-mounted) anchor can't leave the camera landing on a
stale spot; null return freezes the last destination.

### offset

`number`

Standoff distance — scaled per body so giants frame wide.

### done?

() => `void`

Optional completion callback.

## Returns

`void`
