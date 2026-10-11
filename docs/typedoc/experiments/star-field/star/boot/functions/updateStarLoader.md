[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/boot](../README.md) / updateStarLoader

```ts
function updateStarLoader(
   c, 
   msg, 
   pct
): void;
```

Defined in: experiments/star-field/star/boot.ts:42

Mirrors an engine progress event into the loader overlay — message,
rounded percent text, and the bar fill width. Nodes are optional-chained
so a partial render can't throw mid-boot.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField element.

### msg

`string`

Stage message.

### pct

`number`

Progress 0–100.

## Returns

`void`
