[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/theme/theme](../README.md) / THEME

```ts
const THEME: Readonly<{
  DARK: "dark";
  LIGHT: "light";
  SYSTEM: "system";
}>;
```

Defined in: core/tokens/theme/theme.ts:13

Frozen theme theme map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
