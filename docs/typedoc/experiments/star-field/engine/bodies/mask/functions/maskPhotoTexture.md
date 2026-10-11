[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/mask](../README.md) / maskPhotoTexture

```ts
function maskPhotoTexture(
   THREE, 
   tex, 
   options?
): Texture<unknown, TextureEventMap> | undefined;
```

Defined in: experiments/star-field/engine/bodies/mask.ts:54

Composites a loaded photo texture into a square-capped canvas whose
alpha fades to zero past `MASK_INNER` of the half-extent. Aspect ratio
is preserved inside the canvas (letterboxed with transparent space),
so the caller still gets the source's true `w/h` from `photoSize` for
non-square scaling. Returns undefined when canvas/2d is unavailable or
the texture image never resolved (callers fall back to additive).

By default the mask is a smooth radial disc — appropriate for galaxies
and face-on discs. For nebulae, `options.lobes` produces a seeded,
irregular, wispy boundary so each nebula reads as a gas cloud rather
than a flat circular photograph pasted on the sky.

## Parameters

### THREE

`__module`

The three.js module.

### tex

`Texture`

Loaded photo texture (`tex.image` must be set).

### options?

Optional mask shape — `lobes` and `seed` for nebulae.

#### lobes?

`number`

#### seed?

`string`

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture with feathered alpha, or undefined.
