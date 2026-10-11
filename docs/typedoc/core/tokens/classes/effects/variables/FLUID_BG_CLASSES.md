[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/effects](../README.md) / FLUID\_BG\_CLASSES

```ts
const FLUID_BG_CLASSES: Readonly<{
  FLUID_BG: "fluid-background";
  FLUID_BG_CANVAS: "fluid-background-canvas";
}>;
```

Defined in: core/tokens/classes/effects.ts:14

Frozen fluid bg class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
