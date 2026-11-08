[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / resolveProjectMedia

```ts
function resolveProjectMedia(
  project,
  mediaSlug?
): {
  media: ProjectMediaNode
  urls: MediaUrls
} | null
```

Defined in: core/utils/schema.ts:764

Resolves a media deep-link slug to its sections descriptor plus the
resolved CDN URLs — the same document-order slugging
generateProjectSchema and the emitted /<p>/<media> pages use, so the
runtime head sync can answer "which asset does this URL name" without
duplicating the slug walk.

## Parameters

### project

`ProjectSchemaSource` \| `null`

Localized project translation node.

### mediaSlug?

`string`

Deep-link segment from the route params.

## Returns

\| \{
`media`: `ProjectMediaNode`;
`urls`: [`MediaUrls`](../../media/interfaces/MediaUrls.md);
\}
\| `null`

The matched media node + URLs, or null when unresolvable.
