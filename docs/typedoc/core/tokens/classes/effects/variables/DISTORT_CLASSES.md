[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/effects](../README.md) / DISTORT\_CLASSES

```ts
const DISTORT_CLASSES: Readonly<{
  IMAGE_DISTORT: "image-distort";
  IMAGE_DISTORT_CANVAS: "image-distort-canvas";
}>;
```

Defined in: core/tokens/classes/effects.ts:36

Frozen distort class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
