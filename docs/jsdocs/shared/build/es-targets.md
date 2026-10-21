# `shared\build\es-targets.mjs`

The multi-engine build matrix: every ES tier the site ships,

| | |
|---|---|
| **Source** | `src/shared\build\es-targets.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `POLYFILLS`

Polyfill groups — each loads ONLY when its runtime guard fails.

### `POLYFILL_ORDER`

Load order — core shims first, they may be prerequisites of later groups.

### (module scope)

Browser identification + per-engine quirks. Order is significant: UA
strings nest (Samsung Internet and Edge both claim Chrome, every modern
UA claims Safari), so the most specific brands must match first.

`quirks` are runtime hints inlined into `window.__LK_BROWSER` by the
loader — consumers (WebGL/WebGPU capability checks, viewport math) read
them instead of re-sniffing. `webgpu:false` marks engines where
`navigator.gpu` is absent or flag-gated so the app skips a doomed init
attempt and goes straight to the WebGL path; `lowGpu` marks engines that
ship mostly on mid-range SoCs, where the renderers can drop resolution
scale up-front instead of probing into thermal throttling.
