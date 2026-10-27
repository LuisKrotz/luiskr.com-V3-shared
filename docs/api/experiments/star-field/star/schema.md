# `experiments\star-field\star\schema.ts`

Runtime JSON-LD parity for the star-field route — the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\star\schema.ts`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_pageName`

Route meta title minus the BASE_TITLE affixes — the same page-name
derivation buildRouteJsonLd applies, so emitted WebPage names match
the document title.

- `@param` route The current star-field route descriptor.
- `@returns` The bare page name.

### `_onStarRoute`

Guards emit calls — never writes a star-field graph after navigating away.

### `_datasets`

DataCatalog datasets from the resolved registry manifest — per-kind
Dataset (manifest + every shard JSON as DataDownload) plus the packed
deep-field binary, mirroring the build-time entity.

- `@param` c The view (translations supply the localized labels).
- `@param` indexUrl Absolute star-field index URL — dataset @id bases.
- `@param` manifest The registry manifest (kinds → counts + shard files).
- `@returns` Prepared dataset descriptors for generateStarIndexSchema().

### `emitStarIndexJsonLd`

Emits the index graph — route base + authored-body ItemList +
registry DataCatalog. The item names prefer the loaded locale table
and fall back to the authored catalog names; the manifest fetch is
the registry's own lazy promise so the graph arrives whenever the
catalog data does, at zero extra network cost once cached.

- `@param` c The view.

### `emitStarBodyJsonLd`

Emits the body dossier graph — route base + Article/Thing — once the
dossier JSON has resolved for the selected body. The canonical URL
always carries the raw catalog id (the emitted static page), never
the localized slug the address bar may show.

- `@param` c The view.
- `@param` id The selected catalog/registry id.
- `@param` dossier The resolved dossier payload (may be null on failure).
