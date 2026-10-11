# `experiments/star-field/engine/bootstrap.ts`

Async scene assembly for the star-field engine. Loads

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bootstrap.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Collects every texture URL the catalog + skybox needs and loads them in
parallel — progress reports per completed file so the loader bar climbs
smoothly across the ~14 fetches. A single failed texture resolves as
undefined (the body falls back to its procedural color) rather than
sinking the whole boot.
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
