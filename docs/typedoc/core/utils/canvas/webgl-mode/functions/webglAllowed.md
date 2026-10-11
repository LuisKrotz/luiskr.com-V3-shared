[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/webgl-mode](../README.md) / webglAllowed

```ts
function webglAllowed(): boolean;
```

Defined in: core/utils/canvas/webgl-mode.ts:58

Whether WebGL is currently preferred. Explicit debug fallback and the
user's reduced-motion mode both select the CSS/Canvas2D path; disabling
reduced motion makes the next interaction-driven retry eligible again.

## Returns

`boolean`
