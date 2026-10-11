# `experiments/star-field/engine/renderer-setup.ts`

Renderer creation for the star-field engine — same contract

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/renderer-setup.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Builds + initializes the renderer on `s`. Returns false when the GPU
path is disallowed so bootstrap can bail into the CSS fallback; a WebGPU
init throw clones the canvas (a canvas that failed context creation is
poisoned) and retries with `forceWebGL`.
- `@param` s Engine state bag.
- `@param` WebGPURenderer The three/webgpu renderer class.
- `@returns` Whether a live renderer was attached.
