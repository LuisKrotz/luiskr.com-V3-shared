[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / mediaManifestFailed

```ts
function mediaManifestFailed(): boolean
```

Defined in: core/utils/media/manifest.ts:91

Whether the manifest request settled into failure. Paired with
`mediaManifestReady()` it lets renders tell "manifest still in flight"
(hold the heavy original <img> — the LQIP box paints) from "proven
unmanifested" (emit the original — no variants exist to wait for).

## Returns

`boolean`

true once the fetch rejected; cleared on a later success.
