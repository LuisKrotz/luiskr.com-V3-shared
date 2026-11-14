# `shared\build\css-classes.mjs`

Width-class registry — the single build-side source for the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\css-classes.mjs`                      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `WIDTH_CLASSES`

Ordered narrow → wide. Order is load-bearing: cumulative sheets are built
by walking this list and matchMedia gates are evaluated wide → narrow.

### `WIDTH_CLASS_NAMES`

Class names in ascending order — used for manifest + file naming.

### `classForMinWidth`

Maps a pure `min-width` breakpoint (px) to the class that owns it. Values
below the smallest gate still land in `mobile` — the narrowest class is
also the base vehicle for watch-size viewports.

- `@param` {number} px min-width breakpoint in px.
- `@returns` {string} the owning class name.

### `lightningcssTargets`

Lightningcss `targets` translation shared by the emit path and the ?tiers
vite plugin. Vite's cssTarget is an esbuild-style string (`es2022`,
`chrome120`, `esnext`); lightningcss wants `{engine: version<<16}`.

- `@param` {string|undefined} cssTarget vite `build.cssTarget` value.
- `@returns` {object|undefined} lightningcss targets map, or undefined for esnext.
