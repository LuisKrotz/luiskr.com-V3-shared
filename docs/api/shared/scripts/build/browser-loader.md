# `shared\scripts\build\browser-loader.js`

Runtime bundle dispatcher, inlined into dist/index.html by

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\browser-loader.js`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `probe`

Evaluates a feature probe; a thrown parse/runtime error = unsupported.

### `supportsModule`

Native ES module support (IE/EdgeHTML and pre-Chrome-61 lack it).

### `supportsImport`

Dynamic import() — Safari ≤11.0 / Edge ≤18 have modules but no import().
Compile-only probe: executing the import could hit CSP script-src, so we
only check that the syntax parses.

### `detectBrowser`

UA identification — the manifest's `browsers` list is ordered
most-specific-first (Samsung Internet / Edge / Opera all claim Chrome;
every modern UA claims Safari). Result is exposed to the app as
`window.__LK_BROWSER` and to stylesheets as `data-browser` /
`data-browser-major` on <html> so engine quirks never get re-sniffed.

### `applyBrowserHints`

Applies the detected engine's quirks: datasets for CSS hooks plus the
`__LK_BROWSER` hint bag the runtime consults (webgpu:false skips a
doomed WebGPU init, lowGpu lets renderers start at reduced scale).

### `pickTier`

Picks the newest tier whose probes all pass.

### `neededPolyfills`

Collects polyfills whose guard APIs are missing, in declared order.

### `loadScript`

Injects a classic script; calls back when it has executed.

### `loadPolyfills`

Chains polyfill scripts so each executes before the next is fetched.

### `injectCss`

Appends the tier stylesheet to <head>.

### `showFallback`

Graceful notice — reached by engines that fail every tier probe
(below the es2022 floor: pre-iOS 16, legacy Edge, IE).

### `boot`

Boots the selected tier after its polyfills have executed.
