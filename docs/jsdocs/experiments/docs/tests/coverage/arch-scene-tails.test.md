# `experiments\docs\tests\coverage\arch-scene-tails.test.js`

Coverage tails for the docs architecture scene — mounts

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\arch-scene-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.        |

## Members

### `instanceAttrs`

Reads the instanced alpha + active flag for a manifest path. Nodes
render as TWO InstancedMesh tiers — dir spheres first, file spheres
second, in scene-add order — and a path's instance slot is the index
it holds inside its own tier (the same partition buildGraph runs).
`placed` overrides the fixture tree — the ViewDocs mounts feed the
section groups, not the local ROOTS.
