# `experiments/star-field/engine/registry.ts`

Deep-catalog registry — the addressable index over the

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/registry.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `REGISTRY_ID_RE`

Registry id grammar — `<kind>-<zero-padded global rank>`.

### `INDEX_DIR`

Shard path template pieces — `index/<kind>-<NNN>.json`.

### (module scope)

Manifest shape for `index/manifest.json` — per-kind record counts
and the shard file list so the directory can show totals before any
shard has been fetched.

### `total`

Total records across all kinds (139,563).

### `shardSize`

Records per shard file (1,000).

### `kinds`

Per-kind stats: count + ordered shard filenames.

### (module scope)

One catalogued record inside a shard — field keys are short on
purpose (the 14 MB index would double with long names): `n` display
name/designation, `m` apparent magnitude, `d` heliocentric distance
in light-years, `s` spectral class, `c` constellation/catalog name,
`h` host star (exoplanets), `t` object type code (DSOs), `r`
redshift, `y2` discovery year (exoplanets), `x/y/z` heliocentric
light-years, `i` registry id.

### `_manifest`

Cached manifest promise — one fetch per session.

### `_shards`

Resolved shard cache — `index/<kind>-NNN.json` → parsed records.

### `isRegistryId`

Type predicate — distinguishes the 139k registry ids from the 66
authored catalog slugs so selection/deep-link code can route each
path without a lookup table.
- `@param` id Candidate body id.
- `@returns` True for `star-NNNNNN`/`exoplanet-NNNNNN`/`dso-NNNNNN`.

### `parseRegistryId`

Splits a registry id into its kind and global rank — the two numbers
the shard math needs (`shard = rank ÷ shardSize`, `slot = rank mod
shardSize`). Returns null on malformed ids.
- `@param` id Registry id (`star-000042`).
- `@returns` `{ kind, rank }` or null.

### `ensureRegistryManifest`

Fetches the registry manifest once per session — the directory needs
it for the per-kind counts and shard lists; selection paths don't
(ids self-decode to their shard).
- `@returns` The parsed manifest, or null on fetch/parse failure.

### `loadRegistryShard`

Fetches (or returns the cached promise for) one 1,000-record shard —
shards are the lazy-load unit so browsing the catalogue never pulls
the full 14 MB index up front.
- `@param` kind Record kind (`star`/`exoplanet`/`dso`).
- `@param` shardIx Zero-based shard index.
- `@returns` The parsed record array, or null on failure.

### (module scope)

Resolves a registry id to its full record — pure shard arithmetic
(`shard = rank ÷ 1000`, `slot = rank mod 1000`), one fetch worst
case, cache-hit best case. Out-of-range ids resolve null so stale
links degrade silently to the overview chart.
- `@param` id Registry id (`star-000042`).
- `@returns` The record, or null when unknown/unreachable.

### (module scope)

Streams registry shards for a kind in order — the directory's
incremental "load more" path; yields each parsed shard so callers can
append results as they land without holding 120k records at once.
- `@param` kind Record kind to stream.

### (module scope)

Incremental registry search — pulls shards sequentially and collects
records whose display name or catalogue designation contains the
query (case-folded), stopping at `limit` matches so a "vega" search
resolves in one shard while still scaling to the full catalogue.
- `@param` query Substring to match (empty returns nothing).
- `@param` limit Match cap (default 200).
- `@returns` Matching records in shard order (brightest/alphabetical).

### `registryWorldPos`

World-space position of a registry record — delegates to the shared
`sfGalacticVec` Cartesian path so fly-to lands exactly on the
rendered cloud point: records carry heliocentric galactic xyz, the
cloud mounts on the Sun's pivot at the scene origin, and the same
three-tier distance compression + disc tilt apply.
- `@param` s Engine state (for the Milky Way disc tilt).
- `@param` rec The registry record.
- `@returns` `{x,y,z}` world position, or null without a scene.
