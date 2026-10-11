[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fly](../README.md) / startFly

```ts
function startFly(
   s, 
   worldPos, 
   offset, 
   done?
): void;
```

Defined in: experiments/star-field/engine/fly.ts:28

Arms a fly-to tween: destination is `offset` units along the current
camera→body direction (or straight above when the camera is too close
to define a direction), target is the body world position.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### worldPos

Body center in world space {x,y,z}.

#### x

`number`

#### y

`number`

#### z

`number`

### offset

`number`

Standoff distance — scaled per body so giants frame wide.

### done?

() => `void`

Optional completion callback.

## Returns

`void`
