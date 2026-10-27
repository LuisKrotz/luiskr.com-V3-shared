[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-scroll](../README.md) / WasmScrollOptions

Defined in: core/utils/wasm/wasm-scroll.ts:21

Options bag for [wasmSmoothScroll](../functions/wasmSmoothScroll.md).

## Properties

### container?

```ts
optional container?:
  | string
  | Window
  | Element;
```

Defined in: core/utils/wasm/wasm-scroll.ts:23

Scroll container — selector (pierces shadow DOM), element, or window.

---

### element?

```ts
optional element?: string | Element;
```

Defined in: core/utils/wasm/wasm-scroll.ts:25

Target element — selector or element.

---

### scrollTo?

```ts
optional scrollTo?:
  | number
  | {
  y?: number;
  top?: number;
};
```

Defined in: core/utils/wasm/wasm-scroll.ts:27

Numeric offset or {y}/{top} shape.

---

### offset?

```ts
optional offset?: number;
```

Defined in: core/utils/wasm/wasm-scroll.ts:29

Extra px offset applied to the target.

---

### duration?

```ts
optional duration?: number;
```

Defined in: core/utils/wasm/wasm-scroll.ts:31

Animation length in ms (default 600).

---

### updateHistory?

```ts
optional updateHistory?: boolean;
```

Defined in: core/utils/wasm/wasm-scroll.ts:33

Replace the URL hash on arrival.
