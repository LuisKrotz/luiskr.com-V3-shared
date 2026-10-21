# `experiments\star-field\star\dossier.ts`

Lazy dossier loader for star-field bodies — fetches

| | |
|---|---|
| **Source** | `src/experiments\star-field\star\dossier.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_cache`

In-flight + resolved dossier cache — `locale:id` → dossier (or promise).

### (module scope)

Locale body-name table — `byId` feeds the navigator rows, hover
tooltips and the URL segment; `bySlug` (each name run through the
shared `slugify` — NFD-fold, lowercase, `-` runs) resolves translated
deep-link segments back to the canonical catalog id.

### `byId`

Canonical body id → localized display name.

### `bySlug`

`slugify(localized name)` → canonical body id.

### `_namesCache`

In-flight + resolved names cache — locale → parsed name table.

### `dossierLocale`

Legacy locale aliases — pt/hrx/tli URLs map onto the modern codes
whose dossier folders hold the translations.
- `@param` locale Active locale code (may be null/undefined).
- `@returns` The dossier folder code to fetch.

### `fetchJson`

One dossier GET — resolves null on HTTP/parse failure (the panel
falls back to the catalog name) rather than throwing.
- `@param` url Dossier URL under `SF_DATA_BASE`.
- `@param` id Body id for diagnostics.
- `@returns` The parsed dossier or null.

### `buildNames`

Builds the names table from a parsed `names.json` payload — forward
map verbatim, reverse map keyed by each name's `slugify` output so a
localized route segment (`…/via-lactea`) resolves to its catalog id.
Slug collisions keep the first id — dossier names are unique within a
locale by contract, but a degenerate duplicate must not clobber the
catalog body that legitimately owns the segment.
- `@param` raw Parsed `{ id: name }` object.
- `@returns` The paired lookup maps.

### `fetchNamesJson`

One names-file GET — resolves null on HTTP/parse failure (the UI
falls back to catalog names + raw ids) rather than throwing.
- `@param` url Names-file URL under `SF_DATA_BASE`.
- `@param` code Locale folder for diagnostics.
- `@returns` The parsed `{ id: name }` map or null.

### `fetchBodyNames`

Fetches the locale's body-name table — `data/<locale>/names.json`,
with the canonical English file as fallback. One ~6 KB document per
locale, cached per locale code: the navigator renders localized rows
and the router reads/writes translated body segments without pulling
all 143 dossier files.
- `@param` locale Active locale code — defaults to the store's current.
- `@returns` The names table, or null when both fetches fail.

### `registryDist`

Distance label for a registry record — light-years under a million,
"Mly" above, so far-field NGC galaxies read "52 Mly" instead of
"52 000 000 ly". Units are universal abbreviations (no translation).
- `@param` ly Heliocentric distance in light-years.
- `@returns` Formatted distance string.

### `synthRegistryDossier`

Synthesizes a dossier-shaped view for one registry record — the
139k-object catalog can't ship per-object prose files, so the panel
shows the real catalogue fields (designation, magnitude, distance,
spectral/type, coordinates, provenance) under the locale's label
set. `history` carries the dataset description; `meta` signs the
acquisition date so the provenance contract matches authored files.
- `@param` rec The decoded shard record.
- `@param` kind Registry kind (`star`/`exoplanet`/`dso`).
- `@param` t Locale label map (pages/star-field node + English defaults).
- `@returns` A renderable SFDossier.

### `fetchDossier`

Fetches one locale dossier JSON — `data/<locale>/<id>.json`, with the
canonical English file as fallback so a not-yet-translated body still
shows real data instead of an empty panel. Registry ids skip the JSON
path entirely: their record comes from the sharded catalogue index
and the panel is synthesized with the locale's field labels.
- `@param` id Body id matching `public/data/<locale>/<id>.json`, or a
- `@param` locale Active locale code — defaults to the store's current.
- `@param` labels Optional label map for registry synthesis (component's
- `@returns` The parsed dossier or null on fetch/parse failure.

### `applyDossierLocale`

Re-derives the panel dossier for the current locale — called on store
locale changes so the open panel swaps language; cached files resolve
instantly, new locales fetch just the one body's file.
- `@param` c The StarField component.

### `loadDossier`

Selection path — marks the panel loading, prefetches, then assigns the
resolved dossier only when the selection is still current (a fast
second select must not have a slow first response overwrite it).
- `@param` c The StarField component.
- `@param` id Selected body id.

### `prefetchDossier`

Approach path — warms the cache without touching the panel; the select
path later resolves instantly from `_cache`.
- `@param` id Approached body id.
