[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-scroll](../README.md) / WasmScrollOptions

Defined in: core/utils/wasm/wasm-scroll.ts:20

Options bag for [wasmSmoothScroll](../functions/wasmSmoothScroll.md).

## Properties

### container?

```ts
optional container?: 
  | string
  | Window
  | Element;
```

Defined in: core/utils/wasm/wasm-scroll.ts:22

Scroll container — selector (pierces shadow DOM), element, or window.

***

### element?

```ts
optional element?: string | Element;
```

Defined in: core/utils/wasm/wasm-scroll.ts:24

Target element — selector or element.

***

### scrollTo?

```ts
optional scrollTo?: 
  | number
  | {
  y?: number;
  top?: number;
};
```

Defined in: core/utils/wasm/wasm-scroll.ts:26

Numeric offset or {y}/{top} shape.

***

### offset?

```ts
optional offset?: number;
```

Defined in: core/utils/wasm/wasm-scroll.ts:28

Extra px offset applied to the target.

***

### duration?

```ts
optional duration?: number;
```

Defined in: core/utils/wasm/wasm-scroll.ts:30

Animation length in ms (default 600).

***

### updateHistory?

```ts
optional updateHistory?: boolean;
```

Defined in: core/utils/wasm/wasm-scroll.ts:32

Replace the URL hash on arrival.
