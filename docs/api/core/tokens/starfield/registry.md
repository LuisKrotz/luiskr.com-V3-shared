# `core\tokens\starfield\registry.ts`

Deep-catalog registry vocabulary — the shard-directory

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\registry.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SF_REGISTRY_MANIFEST`

Manifest filename inside the index dir — record totals + per-kind shard lists.

### (module scope)

One registry kind — `kind` is both the shard filename stem and the
record id prefix (`star-000042`); `labelKey`/`aboutKey` are
`pages/star-field` translation keys for the localized label/blurb and
`credit` names the source archive the kind is drawn from.

### `kind`

Shard filename stem + record id prefix.

### `labelKey`

`pages/star-field` key holding the localized registry label.

### `aboutKey`

`pages/star-field` key holding the localized provenance blurb.

### `credit`

Source catalogue the records derive from.

### `SF_REGISTRY_KINDS`

Registry kinds in directory order — HYG stars, NASA exoplanets,
OpenNGC deep-sky objects. Sole declaration site for the kind→label
wiring shared by the runtime navigator, the prerendered index page
and the replica/JSON-LD emitters.

### `SF_REGISTRY_FIELDS`

Abbreviated shard-record field dictionary per kind — the single-letter
JSON keys each record carries (mirrors `SFRegistryRecord` in
engine/registry.ts). Emitted to robots so the packed shard vocabulary
is self-describing.
