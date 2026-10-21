# `shared\build\jsx-in-js.mjs`

| | |
|---|---|
| **Source** | `src/shared\build\jsx-in-js.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SHARED_ESBUILD`

The esbuild options every pipeline shares: classic JSX transform with the
`h` pragma, scoped to the authored module dirs. `jsx: 'transform'` is
required for the esbuild→oxc config bridge to map jsxFactory/jsxFragment
onto pragma/pragmaFrag — without it the mapping is skipped and .tsx would
fall back to the automatic runtime.
