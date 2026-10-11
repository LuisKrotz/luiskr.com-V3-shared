[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/safari/patches/media-expanded](../README.md) / patchMediaExpanded

```ts
function patchMediaExpanded(): void;
```

Defined in: core/safari/patches/media-expanded.ts:25

Installs the MediaExpanded patch once the element registers: wraps
`onMounted` to (a) bind click + touchend on every close target —
iOS click synthesis on fixed overlays is unreliable, so touchend with
preventDefault drives the close directly — (b) assign the full-res
`src` straight onto the expanded img (no lazy ladder inside the modal),
and (c) force expanded videos muted/playsinline + play() so autoplay
survives Safari's gesture policy.

## Returns

`void`
