# `experiments\docs\arch-scene.ts`

Interactive three.js visualization of the docs manifest —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\arch-scene.ts`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Live scene resources — destroy() frees renderer + listeners.

### `setActive`

Highlights the node matching `path` — the current docs location.
Safe to call before the async graph build lands; the highlight
applies to whatever nodes exist and is re-applied when they arrive.

- `@param` _path Manifest path of the active location ('' = portal root).

### `resize`

Re-fits the renderer + camera to the canvas's current box — called
by the ResizeObserver on column↔dialog moves and any layout shift.

### `setPaused`

Stops/restarts the rAF loop — the host pauses while the map column
is display:none (≤1024) so no GPU frame or CPU wakeup is spent on
an invisible surface. Unpausing re-arms the loop; a resize() right
after re-fits whatever box the canvas re-seated into.

- `@param` _paused True to stop scheduling, false to resume.

### (module scope)

A flattened manifest node with its ring depth and ring angle.

### (module scope)

A dir-name sprite with the depth it answers to (zoom-reveal bucket).

### `a`

Last written alpha — opacity writes and visibility flips are dirty-gated.

### `GLSL_BEGIN_VERTEX`

three.js GLSL anchors the instanced-node materials patch — chunk-include
names are the stable seam inside three's generated programs.

### (module scope)

Instanced-node shader contract — the ambient pulse and the
active-node scale run entirely in the vertex stage so the scene's
~7k nodes cost two draw calls and ZERO per-frame CPU writes:

transformed *= (1 + sin(uTime·SPEED + gl_InstanceID·PHASE) · AMP)
· (1 + aActive · (SCENE_ACTIVE_SCALE − 1))

`aAlpha` carries the per-node opacity (base / ancestor / active),
`aActive` the 0/1 active flag — both are instanced attributes written
only when the highlight path changes, never per frame.

### `patchNodeMaterial`

Patches a node material so the pulse scale and per-instance alpha run
in-shader: `uTime` is the shared clock, `aAlpha`/`aActive` are the
instanced attribute streams the highlight pass rewrites on demand.

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
- `@param` ink Theme ink color resolved from the canvas' computed style.

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

- `@param` canvas Target canvas.
- `@param` roots Manifest root buckets (each becomes an inner-ring node).
- `@param` onPick Called with the manifest path when a node is picked.
- `@param` onLost Called once when the GL context dies mid-flight so the
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

- `@param` canvas Target canvas.
- `@param` roots Manifest root buckets.
- `@param` onPick Called with the manifest path on a node pick.
- `@param` onLost Called when the WebGL context is lost mid-flight.
- `@returns` The scene handle, or null when no GL context exists.

### `saveCamState`

Serializes camera pose + interaction flag into sessionStorage.

### `activePath`

Docs path currently highlighted — '' matches the portal-root node.

### `nodeTargets`

Manifest path → placed world position + ring depth — buildGraph
fills it so the map can glide the camera onto the active location.

### `focusNode`

Focus glide state — the orbit target eases toward the active
node's position and the camera dollies to a depth-scaled distance,
so picking a route re-centers the map on that location.

### `startFocus`

Arms the focus glide for a docs location — '' or an unknown path
falls back to the portal root at origin with the full-graph camera
distance; placed nodes aim at their position with a depth-scaled
dolly. Positions land async (worker) — buildGraph re-arms the focus
for whatever path is active when they arrive.

### `dirMesh`

Node draw calls — every dir sphere renders through ONE InstancedMesh,
every file sphere through another, so the multi-thousand-node graph
costs two draws instead of one call per node (plus the line set and
the revealed labels). Weak GPUs/tablets keep their frame budget.

### `dirPlaced`

placed[] index per instance slot — a raycast instanceId resolves to a node.

### `pickTables`

Mesh → its placed-index table, so a raycast hit maps back to a path.

### `pulseTime`

Shared pulse clock — patched into both node materials' shaders.

### `lineGeo`

Edge geometry — assigned inside buildGraph, disposed in destroy().

### `writeActive`

Rewrites one tier's instanced attributes for the active location:
the exact path match pops to SCENE_ACTIVE_OPACITY with the larger
pulse scale (aActive=1), and ancestor dirs on its branch lift to
SCENE_ANCESTOR_OPACITY so the route's lineage reads on the map.
Everything else keeps the faint backdrop alpha for its tier.

### `buildGraph`

Populates the scene once the (possibly worker-computed) positions
land — meshes, edges, then dir-name labels on top of dir nodes.

### `buildTier`

Builds one instanced tier — shared sphere geometry, one material,
static instance matrices, and the two instanced attribute streams
(alpha / active) the highlight pass owns.

### `pathForHit`

Resolves a raycast hit to a manifest path. Instanced hits carry
`instanceId` — it indexes the tier's placed table; a hit without an
instanceId (older three paths, test doubles) falls back to the
object userData contract the pre-instanced scene used.

### `paintFrame`

One frame: zoom-reveal label pass + renderer.render. Returns false
when the GPU/driver threw — the caller treats it exactly like a
context loss (the host rebuilds on restore).

### `onPrintCapture`

Print-capture answer — the print adapter dispatches `printcapture` on
every canvas before reading it; this scene clears its buffer each frame
(no preserveDrawingBuffer), so a toDataURL read mid-loop would return a
blank. Re-paint once, then hand the PNG back through event.detail.

- `@param` e CustomEvent carrying { dataUrl } — written here on success.

### `paused`

Host-driven pause — true while the map column is display:none. The
loop stops scheduling entirely (no rAF wakeup, no GPU frame); the
flag is also re-checked at tick entry so a pause that lands between
schedule and fire still dead-ends the frame.

### `mountArchScene`

Dual-path mount — the scene3d (rust/WebGPU) engine takes the scene
on capable hardware and the three.js arm remains the fallback for
every other device, exactly like the widget migrations. Capability
order: no `webglAllowed()` (explicit debug fallback / GL block) or
no `navigator.gpu` → straight to the three path, which keeps its
synchronous null contract. With WebGPU present the wasm arm mounts
async; any failure resolves into the three arm inside the same
handle (or `onLost` when GL is also absent).

- `@param` canvas Target canvas.
- `@param` roots Manifest root buckets.
- `@param` onPick Called with the manifest path on a node pick.
- `@param` onLost Called once when no GPU path can mount — the host
- `@returns` Scene handle, or null only when the synchronous three

### `inner`

Whichever arm is live — filled when the wasm mount resolves.

### `pendingPath`

setActive called before the arm resolves — replayed on mount.

### `pendingPaused`

setPaused called before the arm resolves — replayed on mount.

### `disposed`

Teardown while the async mount is in flight.

### `threeMounted`

True once the timeout arm already mounted three.js — a late scene3d
resolution is torn down instead of double-mounting on one canvas.

### `mountTimer`

Deadline guard: scene3d mount chains adapter → device → wasm
artifact → surface configure — any stalled await leaves the canvas
blank forever. Past the bound, the three.js arm mounts on the same
canvas (a canvas bound 'webgpu' earlier by the attempt cannot hand
out webgl — mountScene3d only binds after device+artifact land, so
a timeout here means the canvas is still clean in practice; when it
isn't, the three probe resolves null and onLost hides the section).

### `resize`

Delegates to whichever arm won the mount race (3d or three).

### `setPaused`

Pause/unpause passthrough — a pause that lands before the async
arm resolves is replayed onto `inner` right after mount.
