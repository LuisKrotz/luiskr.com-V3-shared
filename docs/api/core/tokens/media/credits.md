# `core\tokens\media\credits.ts`

Explicit credit vocabulary for third-party dossier media

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\media\credits.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `source`

Human-readable originating agency or collection.

### `host`

Original host the asset is published on.

### `license`

Licence posture as published by the source.

### `licenseUrl`

Canonical page stating the source's licence terms — emitted as
ImageObject/VideoObject `license` + `acquireLicensePage` for credited
assets so the licensable badge lands on the real terms page, never
the site's own legal page (the site's MPL grant does not cover
third-party imagery).

### `MEDIA_CREDIT_LABELS`

Labels for each credit field, kept as tokens so the expansion stays literal-free.

### `MEDIA_CREDIT_SEPARATOR`

Separator between credit fields inside one creditText string.

### `MEDIA_CREDIT_SOURCES`

Registry credit string → source record. Keys match the `credit`
values in experiments/star-field/public/data/<locale>/<body>.json
exactly. NASA imagery is a US government work (public domain under
NASA's media usage guidelines); the Wikimedia-routed entry defers to
the licence on its Commons file page because individual files differ.

### `creditTextFor`

Expands a registry credit into structured creditText — source, original
host, licence and current usage (the dossier page it appears on). Credits
without a source record pass through verbatim so new data never loses its
credit while the map is being extended.

- `@param` credit Raw registry credit string (e.g. 'NASA').
- `@param` subject Display name of the body the asset illustrates.
- `@returns` Structured creditText, or the raw credit when no source record exists.

### `creditLicenseUrlFor`

Resolves the canonical licence-terms URL for a registry credit — the
SOURCE's page (NASA media guidelines, Commons licensing), never the
site's. Returns undefined for credits without a source record so
emitters omit the licence pair rather than misattribute the asset.

- `@param` credit Raw registry credit string (e.g. 'NASA').
- `@returns` Absolute licence URL, or undefined when the credit is unmapped.

### (module scope)

Inputs for the shared media-provenance field bag.

### (module scope)

Absolute licence URL — the locale's legal page for site-owned
assets, the source's terms page for credited third-party assets.
Undefined omits both licence properties.

### (module scope)

Copyright/attribution notice — '© owner' for owned assets, the raw
credit for third-party ones.

### (module scope)

Structured credit line — owner name or `creditTextFor` output.

### `mediaProvenanceFields`

Assembles the Schema.org provenance properties every media entity
(ImageObject/VideoObject) carries — `license` + `acquireLicensePage`
always resolve to the same target so Google Images can flag the asset
as licensable and land the click on the terms page. The property
names are declared once here for every emitter (runtime schema.ts,
share-gallery.ts, build-locale-pages.mjs) so the JSON-LD vocabulary
cannot drift between surfaces.

- `@param` fields Resolved licence URL, notice and credit line.
- `@returns` Field bag to spread into the entity literal.
