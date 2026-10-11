[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/playground/gui-post](../README.md) / SP\_CHROMATIC\_DEFAULTS

```ts
const SP_CHROMATIC_DEFAULTS: Readonly<{
  ENABLED: false;
  STRENGTH: 0.25;
  SCALE: 0.5;
}>;
```

Defined in: core/tokens/playground/gui-post.ts:73

Frozen sp chromatic map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
