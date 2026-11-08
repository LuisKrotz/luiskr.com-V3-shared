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
