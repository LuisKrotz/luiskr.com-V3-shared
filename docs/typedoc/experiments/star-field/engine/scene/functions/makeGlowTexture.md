[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scene](../README.md) / makeGlowTexture

```ts
function makeGlowTexture(THREE): Texture<unknown, TextureEventMap> | undefined;
```

Defined in: experiments/star-field/engine/scene.ts:27

Creates the shared soft radial-gradient texture used by every glow
billboard (nebulae, galaxy cores, star halos). A 128px canvas with a
white-center → transparent-edge gradient; the material's `color`
channel tints it per body so one texture serves all hues. Returns
undefined when the 2d context is unavailable (headless probes) —
callers fall back to untextured materials.

## Parameters

### THREE

`__module`

The three.js module.

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture or undefined.
