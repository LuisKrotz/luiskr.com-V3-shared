[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / initMediaManifest

```ts
function initMediaManifest(): Promise<void>
```

Defined in: core/utils/media/manifest.ts:45

Fetches the bucket key manifest once; resolves immediately on repeat
calls. Fire-and-forget at boot — renders that happen before it lands
simply emit no <source>, which is the safe path.

## Returns

`Promise`\<`void`\>
