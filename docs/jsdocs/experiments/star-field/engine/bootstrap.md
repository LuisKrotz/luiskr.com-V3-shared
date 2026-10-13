# `experiments/star-field/engine/bootstrap.ts`

Async scene assembly for the star-field engine. Loads

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bootstrap.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `catalogTextureUrls`

Collects every texture URL a catalog slice + the skybox needs — all
six body texture slots plus each companion satellite's own photo
(`sat.texture`), so an authored companion map preloads with its
host's and `makeSatellites` never lands the not-in-map fallback for
a real file. Exported so the satellite arm is unit-testable on a
fixture slice — the live catalog's own scan happens inside
`bootstrapStarField` where no fixture can inject a textured sat.

- `@param` defs Catalog entries to scan.
- `@returns` The deduplicated URL set (skybox included).

### (module scope)

Loads `catalogTextureUrls(SF_CATALOG)` in parallel — progress reports
per completed file so the loader bar climbs smoothly across the ~14
fetches. A single failed texture resolves as undefined (the body
falls back to its procedural color) rather than sinking the whole
boot.

- `@returns` URL → texture map (missing textures absent).

### (module scope)

Pre-compiles shader programs so the first visible frame doesn't hitch
on JIT — failures are non-fatal (the renderer recompiles lazily).

### (module scope)

Bootstraps the star-field engine — full sequence: three import →
renderer probe → scene/camera/controls → texture parallel load →
body graph → picking → resize → shader warmup → first frame → ready.
Silent bailouts (webglAllowed, probe failure, dispose mid-boot) leave
`s.failed`/partial state for init() to flag.

- `@param` s Engine state.
