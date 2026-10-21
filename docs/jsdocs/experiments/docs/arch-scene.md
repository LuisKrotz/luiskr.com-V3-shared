# `experiments\docs\arch-scene.ts`

Interactive three.js visualization of the docs manifest —

| | |
|---|---|
| **Source** | `src/experiments\docs\arch-scene.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Live scene resources — destroy() frees renderer + listeners.

### `setActive`

Highlights the node matching `path` — the current docs location.
Safe to call before the async graph build lands; the highlight
applies to whatever nodes exist and is re-applied when they arrive.
- `@param` _path Manifest path of the active location ('' = portal root).

### (module scope)

A flattened manifest node with its ring depth and ring angle.

### (module scope)

A dir-name sprite with the depth it answers to (zoom-reveal bucket).

### `layoutNodes`

Flattens the manifest tree into positioned node descriptors: depth sets
the ring radius, sibling order spreads the angle. Recursive per the
self-similar-traversal rule.

### `layoutPositionsJs`

Main-thread twin of the DOCS_SCENE_LAYOUT worker op — the batch
fallback for when the wasm pool is unavailable (tests, worker-less
environments). Ring radius grows with depth; y alternates per ring and
adds a slow sine wave for vertical separation.
- `@param` depths Ring depth per node.
- `@param` angles Ring angle (radians) per node.
- `@returns` Flat xyz triplets in node order.

### `computePositions`

Batch position compute — wasm worker first, local math on failure. The
worker replies with a transferable Float32Array; `structuredClone` of
the plain-object result also survives when transfer is unsupported.
- `@param` placed Flattened tree nodes.
- `@returns` xyz triplets, or null when nothing resolved.

### (module scope)

Builds a dir-name sprite label — a 2d-canvas texture on a THREE.Sprite.
Returns null when 2d canvas is unavailable (happy-dom, exotic runtimes)
so the scene still mounts label-free.
- `@param` name Folder name drawn on the label.
- `@param` ink  Theme ink color resolved from the canvas' computed style.

### (module scope)

Persisted camera pose + rotation-off flag across scene remounts.

### `p`

camera.position xyz

### `t`

controls.target xyz

### `off`

true once the user has taken control — autoRotate stays off.

### `readCamState`

Reads the session-persisted camera pose — null when storage is
unavailable (tests, privacy mode) or the payload is malformed.

### (module scope)

Mounts the architecture scene on `canvas`.
- `@param` canvas   Target canvas.
- `@param` roots    Manifest root buckets (each becomes an inner-ring node).
- `@param` onPick   Called with the manifest path when a node is picked.
- `@param` onLost   Called once when the GL context dies mid-flight so the
- `@returns` Scene handle, or null when WebGL is unavailable.

### (module scope)

Camera-fit numbers for a placed tree — shared by both arms.

### `graphR`

Outer ring radius of the deepest node.

### `camDist`

Eye distance that frames the whole graph with ~20% margin.

### `far`

Far plane — clears the opposite rim at this distance.

### `graphFit`

Fit the camera to the real graph radius — a deep manifest (outer
rings past ~60 units) left the default pose sitting INSIDE the tree,
which rendered nodes as giant blobs instead of a legible radial
map. dist = r/sin(fov/2) with ~20% margin frames the whole graph.
- `@param` placed The flattened placed tree.

### `mountArchSceneThree`

The three.js/WebGL arm of the architecture scene — the original
renderer, kept as the synchronous fallback for every device without
WebGPU (and the `?debug=webGLMode:fallback` probe). Returns null when
no GL context can be acquired; the composite then reports `onLost`.
- `@param` canvas   Target canvas.
- `@param` roots    Manifest root buckets.
- `@param` onPick   Called with the manifest path on a node pick.
- `@param` onLost   Called when the WebGL context is lost mid-flight.
- `@returns` The scene handle, or null when no GL context exists.

### `saveCamState`

Serializes camera pose + interaction flag into sessionStorage.

### `lineGeo`

Edge geometry — assigned inside buildGraph, disposed in destroy().

### `activePath`

Docs path currently highlighted — '' matches the portal-root node.

### `applyActive`

Paints the active-location highlight onto live nodes: the exact path
match pops to SCENE_ACTIVE_OPACITY with a larger pulse scale, and
ancestor dirs on its branch lift to SCENE_ANCESTOR_OPACITY so the
route's lineage reads on the map. Everything else keeps the faint
backdrop alpha stored on userData at build time.

### `buildGraph`

Populates the scene once the (possibly worker-computed) positions
land — meshes, edges, then dir-name labels on top of dir nodes.

### `mountArchScene`

Dual-path mount — the scene3d (rust/WebGPU) engine takes the scene
on capable hardware and the three.js arm remains the fallback for
every other device, exactly like the widget migrations. Capability
order: no `webglAllowed()` (explicit debug fallback / GL block) or
no `navigator.gpu` → straight to the three path, which keeps its
synchronous null contract. With WebGPU present the wasm arm mounts
async; any failure resolves into the three arm inside the same
handle (or `onLost` when GL is also absent).
- `@param` canvas   Target canvas.
- `@param` roots    Manifest root buckets.
- `@param` onPick   Called with the manifest path on a node pick.
- `@param` onLost   Called once when no GPU path can mount — the host
- `@returns` Scene handle, or null only when the synchronous three

### `inner`

Whichever arm is live — filled when the wasm mount resolves.

### `pendingPath`

setActive called before the arm resolves — replayed on mount.

### `disposed`

Teardown while the async mount is in flight.
