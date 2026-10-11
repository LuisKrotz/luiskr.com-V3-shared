[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/selectors/skeleton](../README.md) / SKELETON\_SELECTORS

```ts
const SKELETON_SELECTORS: Readonly<{
  SKELETON_ANY: "[class*=\"skeleton-\"]:not(.skeleton-layer):not(.has-skeleton-layer)";
  SKELETON_TEXT_LIKE: "[class*=\"skeleton--para\"], [class*=\"skeleton--title\"], [class*=\"skeleton-about-\"], [class*=\"skeleton--footer\"], [class*=\"skeleton--section\"]";
}>;
```

Defined in: core/tokens/selectors/skeleton.ts:14

Frozen skeleton selector map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
