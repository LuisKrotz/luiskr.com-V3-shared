[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/mask](../README.md) / photoSize

```ts
function photoSize(tex): [number, number];
```

Defined in: experiments/star-field/engine/bodies/mask.ts:30

Returns the intrinsic pixel size of a loaded texture — `image` may be
an HTMLImageElement (`naturalWidth`) or any frame source carrying
`width`/`height`; both collapse to 0 when unset (teardown mid-load).

## Parameters

### tex

`Texture`

Source texture.

## Returns

\[`number`, `number`\]

`[width, height]` in source pixels.
