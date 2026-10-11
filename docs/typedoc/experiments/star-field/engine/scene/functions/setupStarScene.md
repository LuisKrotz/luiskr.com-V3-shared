[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scene](../README.md) / setupStarScene

```ts
function setupStarScene(
   s, 
   THREE, 
   skyTex
): void;
```

Defined in: experiments/star-field/engine/scene.ts:91

Wraps the scene in the milky-way skybox — a big inverted sphere whose
inside surface carries the 8k equirect star panorama — plus the light
rig: a dim ambient floor so night sides aren't pure black, and a point
light at the origin standing in for the Sun.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### THREE

`__module`

The three.js module.

### skyTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

The loaded skybox texture (undefined → geometry skipped).

## Returns

`void`
