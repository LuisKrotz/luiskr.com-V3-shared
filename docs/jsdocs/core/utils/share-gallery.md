# `core\utils\share-gallery.ts`

Runtime playground share-capture rotation. The build

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\share-gallery.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DEFAULT_IMAGE`

The shell's card image — restored when a rotation is cancelled.

### `syncSeq`

Monotonic guard — a newer nav (or cancel) invalidates in-flight syncs.

### `appliedImage`

The capture currently bound into the image metas, if any.

### (module scope)

Per-set manifest fetch state — each share manifest caches its URL list and in-flight promise independently.

### `urls`

Manifest payload cache — null until the first fetch resolves.

### `promise`

In-flight manifest fetch — coalesced so concurrent syncs share one request.

### `setStates`

Manifest states keyed by manifest URL — one cache per share set.

### `stateOf`

The fetch state for one manifest URL — created lazily so a set's cache
only exists once one of its routes has been visited.

- `@param` manifestUrl site-served share manifest URL
- `@returns` that set's mutable state cell

### `setShareImageMetas`

Writes `url` into the three card-image metas (itemprop, og, twitter).

### `loadShareImages`

Loads one share manifest once — resolves its URL list, caches it for
the session, and resets the in-flight promise so a failure retries on
the next playground navigation instead of poisoning the cache.

- `@param` manifestUrl site-served share manifest URL
- `@returns` resolved share-image URLs (empty when unavailable)

### `pickShareImage`

Uniformly random pick from the share set — every sync draws fresh so
repeated fetches/navigations surface different card captures.

- `@param` urls candidate URLs
- `@returns` one random URL

### `shareGalleryEntity`

ImageObject ItemList covering the whole share set — mirrors the
build-time share entities emitted into the static playground
pages so the runtime graph carries the same crawlable gallery.

- `@param` pageUrl canonical page URL the entities belong to
- `@param` name localized gallery label
- `@param` urls the full share set
- `@param` bcp BCP-47 tag for inLanguage
- `@returns` ItemList JSON-LD entity

### `syncShare`

Rotates one playground's share surface: draws a random capture from
`manifestUrl`'s set into the image metas, then re-emits the route's
JSON-LD as baseGraph(image) + the gallery ItemList. Abandoned silently
when a newer navigation (or a cancel) landed while the manifest fetch
was in flight, and when the manifest lists no captures.

- `@param` to resolved route descriptor (title/lang feed the graph)
- `@param` canonicalUrl canonical URL for the page + entity @ids
- `@param` baseGraphOf route-graph builder — receives the picked image so
- `@param` manifestUrl site-served share manifest URL for this route's set

### `syncEarthShare`

Earth Playground share sync — binds the generic rotation to the earth
set's manifest.

- `@param` to resolved route descriptor
- `@param` canonicalUrl canonical page URL
- `@param` baseGraphOf route-graph builder

### `syncStarShare`

Star Field share sync — binds the generic rotation to the star set's
manifest.

- `@param` to resolved route descriptor
- `@param` canonicalUrl canonical page URL
- `@param` baseGraphOf route-graph builder

### `cancelShare`

Cancels the share surface — bumps the sync sequence so an in-flight
manifest fetch can never land on a newer route, and restores the
default card image only when a rotation actually applied one (a direct
landing on a media page keeps its emitted og:image).

### `resetShareGallery`

Test/state reset — clears the manifest caches, pick state and sequence
guard so suites exercise loadShareImages branches in isolation without
jest.resetModules (which would discard recorded istanbul hits).
