[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcEaseOutCubic

```ts
function calcEaseOutCubic(t): number;
```

Defined in: core/utils/wasm/wasm-layout.ts:126

easeOutCubic easing — 1−(1−t)³: fast start, decelerating stop. Used for
menu/carousel transitions where motion should settle, not bounce.

## Parameters

### t

`number`

Progress fraction 0–1.

## Returns

`number`

Eased progress 0–1.
