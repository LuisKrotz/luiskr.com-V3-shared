[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/safari/patches/carousel](../README.md) / patchCarousel

```ts
function patchCarousel(): void;
```

Defined in: core/safari/patches/carousel.ts:18

Installs the carousel patch once <custom-carousel> registers: neuters
`_measureFit` (iOS layout thrash — reading fit metrics mid-layout
forces synchronous reflow on every slide) and wraps `_renderInitial`
to inject the safari-carousel stylesheet into the shadow root.

## Returns

`void`
