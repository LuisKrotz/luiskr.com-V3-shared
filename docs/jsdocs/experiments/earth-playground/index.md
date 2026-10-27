# `experiments\earth-playground\index.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\index.ts`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Earth Playground module barrel.

The `earth-playground` experiment module provides the
WebGPU/Three.js Earth scene and the space-playground editor surface.
Self-contained: imports resolve through the core module, never website or CMS.
Re-export-only file.
