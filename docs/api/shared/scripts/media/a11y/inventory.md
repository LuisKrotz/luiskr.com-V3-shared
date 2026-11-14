# `shared\scripts\media\a11y\inventory.mjs`

Media inventory for the a11y pipeline — walks the public

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\inventory.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LOCAL_DB`

Local DB snapshot used when the live RTDB fetch fails.

### `DB_URL`

Public read endpoint — `translations` is `.read: true` for all.

### (module scope)

Fetches the full translations tree — live RTDB first, repo snapshot as
the offline fallback so the pipeline still runs without network DB.

- `@returns` {Promise<object>} `translations` object keyed by locale.

### `harvest`

Recursively harvests media items `{src,isVideo,label}` under a node —
every project cover + section media row anywhere in the tree counts as
a site asset. `folder` propagates down so nested media rows resolve
against their project's bucket prefix.

- `@param` {*} node Subtree to walk.
- `@param` {string} folder Active bucket folder prefix.
- `@param` {(item: object, folder: string) => void} emit Item sink.

### `collectMedia`

Collects the deduplicated media inventory across every locale —
`{key, isVideo, folder, src, labels}` where `labels[locale]` is that
language's own human-written caption (empty string when the locale
leaves the item unlabelled).

- `@param` {object} translations `translations` tree keyed by locale.
- `@returns` {Map<string, {key: string, isVideo: boolean, folder: string, src: string, labels: Record<string,string>}>}

### `analysisSource`

gs:// URI + best analysis key for an inventory record — videos annotate
the full `.mp4`; images annotate the uncompressed mozjpeg pass when the
manifest lists it, else the bare `.jpg` original.

- `@param` {object} rec Inventory record.
- `@param` {Set<string>|null} manifest Bucket key set (relative to MEDIA_PREFIX).
- `@returns` {{gsUri: string, key: string}} gs:// URI + prefix-relative key.
