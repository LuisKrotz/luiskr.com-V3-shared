[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/browser/browsers](../README.md) / BrowserQuirks

Defined in: core/browser/browsers.ts:15

Quirk hints the loader stamps on `window.__LK_BROWSER`.

## Extended by

- [`BrowserInfo`](../../detect/interfaces/BrowserInfo.md)

## Properties

### webgpu?

```ts
optional webgpu?: boolean;
```

Defined in: core/browser/browsers.ts:17

navigator.gpu absent/flag-gated — the app skips the WebGPU init path.

***

### lowGpu?

```ts
optional lowGpu?: boolean;
```

Defined in: core/browser/browsers.ts:19

Mostly mid-range SoCs — renderers may start at reduced resolution scale.
