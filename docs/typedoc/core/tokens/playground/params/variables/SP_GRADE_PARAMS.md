[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/playground/params](../README.md) / SP\_GRADE\_PARAMS

```ts
const SP_GRADE_PARAMS: Readonly<{
  CONTRAST: "contrast";
  SATURATION: "saturation";
  BLACK_LEVEL: "black-level";
}>;
```

Defined in: core/tokens/playground/params.ts:57

Frozen sp grade parameter map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
