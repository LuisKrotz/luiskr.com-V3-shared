[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/routes/paths](../README.md) / ASSET\_PATHS

```ts
const ASSET_PATHS: Readonly<{
  FLAGS_PREFIX: "/assets/flags/";
  SVG_EXT: ".svg";
}>;
```

Defined in: core/tokens/routes/paths.ts:65

Frozen asset path map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
