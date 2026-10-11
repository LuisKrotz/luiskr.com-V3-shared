[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/boot](../README.md) / updateSpaceLoader

```ts
function updateSpaceLoader(
   c, 
   msg, 
   pct
): void;
```

Defined in: experiments/earth-playground/space/boot.ts:29

Mirrors an engine progress event into the loader overlay — message,
rounded percent text, and the bar's width style. All three nodes are
optional-chained so a partial loader render can't throw mid-boot.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

### msg

`string`

Stage message from the engine ('loading textures', …).

### pct

`number`

Progress 0–100.

## Returns

`void`
