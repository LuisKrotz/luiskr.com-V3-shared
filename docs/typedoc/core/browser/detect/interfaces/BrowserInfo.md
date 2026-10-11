[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/browser/detect](../README.md) / BrowserInfo

Defined in: core/browser/detect.ts:29

Resolved engine identity — name, marketing major version, quirks.

## Extends

- [`BrowserQuirks`](../../browsers/interfaces/BrowserQuirks.md)

## Properties

### webgpu?

```ts
optional webgpu?: boolean;
```

Defined in: core/browser/browsers.ts:17

navigator.gpu absent/flag-gated — the app skips the WebGPU init path.

#### Inherited from

[`BrowserQuirks`](../../browsers/interfaces/BrowserQuirks.md).[`webgpu`](../../browsers/interfaces/BrowserQuirks.md#webgpu)

***

### lowGpu?

```ts
optional lowGpu?: boolean;
```

Defined in: core/browser/browsers.ts:19

Mostly mid-range SoCs — renderers may start at reduced resolution scale.

#### Inherited from

[`BrowserQuirks`](../../browsers/interfaces/BrowserQuirks.md).[`lowGpu`](../../browsers/interfaces/BrowserQuirks.md#lowgpu)

***

### name

```ts
name: string;
```

Defined in: core/browser/detect.ts:30

***

### major

```ts
major: number;
```

Defined in: core/browser/detect.ts:31
