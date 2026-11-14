[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/ui-text](../README.md) / versionStamp

```ts
function versionStamp(): string
```

Defined in: core/locale/ui-text.ts:152

Release stamp for the site footers — the Vite-baked app version and
build identifier read from `import.meta.env` (dev serves the committed
.env; `yarn build` stamps it via shared/scripts/build/stamp-version.mjs;
Jest maps `import.meta.env` onto the test-populated `__VITE_ENV__`).
The stamp exists only when BOTH halves are present — a half-set env
(one var without the other) collapses to '' so the footers hide the
line instead of whispering a malformed value.

## Returns

`string`

e.g. 'v5.0.0 / build rc-1.0.0', or '' when the env is unset.
