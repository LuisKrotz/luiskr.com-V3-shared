[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/docs](../README.md) / DOCS\_LOADER\_PCT

```ts
const DOCS_LOADER_PCT: Readonly<{
  MANIFEST: 25;
  SCENE: 60;
  FILE: 80;
  READY: 100;
}>;
```

Defined in: core/tokens/strings/docs.ts:72

Staged boot-loader progress marks — the manifest is inlined at build
time so real fetch percentages don't exist; discrete stage numbers
keep the bar honest (manifest scanned → scene mounted → file fetched
→ portal usable).
