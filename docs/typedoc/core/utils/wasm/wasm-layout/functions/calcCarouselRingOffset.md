[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcCarouselRingOffset

```ts
function calcCarouselRingOffset(
   elapsed, 
   duration, 
   circumference
): number;
```

Defined in: core/utils/wasm/wasm-layout.ts:97

Travel distance along the carousel ring for an elapsed fraction of the
loop duration: (elapsed/duration)·circumference — the stroke-dashoffset
driver for the autoplay progress ring.

## Parameters

### elapsed

`number`

Milliseconds into the current autoplay cycle.

### duration

`number`

Full cycle duration in ms.

### circumference

`number`

Ring's 2πr stroke length in px.

## Returns

`number`

Offset in px along the ring.
