[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / webmIfExists

```ts
function webmIfExists(url): string
```

Defined in: core/utils/media/manifest.ts:159

webm sibling of an .mp4 URL when it exists in the manifest, '' otherwise.
`<video><source>` DOES retry the next source on network failure, so this
gate is belt-and-suspenders for saving a doomed request, not correctness.

## Parameters

### url

`string`

Original .mp4 media URL.

## Returns

`string`
