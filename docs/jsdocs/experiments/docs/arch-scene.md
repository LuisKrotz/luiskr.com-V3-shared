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

A flattened manifest node with its depth, sibling slot and parent.

### `sib`

Index among this node's siblings (0-based) — the Fibonacci slot.

### `sibCount`

Sibling count sharing the same parent — sizes the sphere fan.

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

### `glyphVertexPreamble`

Wireframe-glyph shader contract — the procedural-directory reference's
per-node motion and per-kind ink run entirely in the vertex/fragment
stages so ~7k glyph instances cost one draw call per tier and ZERO
per-frame CPU writes:

p = rotY(uTime·SPIN + aSpin) · position — node self-yaw
p *= aScale — orbit-proportional glyph
p *= (1 + sin(uTime·PULSE + i·0.7)·AMP) — ambient pulse
· (1 + aActive·(SCENE_ACTIVE_SCALE − 1)) — active pop
off = aOffset + (0, sin(uTime·BOB + aPhase)·BAMP, 0)
result = p + off — bob + place

`aColor` carries the file's icon-pack ink (dir accent for folders and
+N aggregates); `aAlpha`/`aActive` are the highlight-pass streams —
all instanced, written only when the graph or highlight changes.

### `edgeVertexPreamble`

Edge shader contract — each endpoint vertex carries its node's bob
phase in `aPhase`, so the parent→child link endpoints ride the exact
same sine the glyph centers do and links stay glued while the
network floats. No per-frame CPU rewrites of edge buffers.

### `patchGlyphMaterial`

Patches a node material so the pulse scale and per-instance alpha run
in-shader: `uTime` is the shared clock, `aAlpha`/`aActive` are the
instanced attribute streams the highlight pass rewrites on demand.

### `patchEdgeMaterial`

Patches the edge material with the shared clock so link endpoints
bob in phase with their node glyphs.

### `subtreeWeight`

Subtree node count — the balloon-layout weight. Recursive per the
self-similar-traversal rule; each node's weight is computed once, at
the level that allocates its parent's sector.

- `@param` node Manifest node whose subtree is weighed.
- `@returns` Total nodes in the subtree, self included (min 1).

### `layoutNodes`

Flattens the manifest tree into positioned node descriptors: depth sets
the ring radius, sibling order spreads the angle. Sectors split
proportionally to subtree weight (balloon-tree), not sibling count —
a 300-file branch gets the angular room its leaf count needs while a
single-file branch takes a thin slice; equal splits are what packed
dense subtrees into unreadable blobs. Recursive per the
self-similar-traversal rule.

### `clusterRadii`

Subtree-extent cluster packing — the hairball fix. The orbit radius at
which node `i`'s children fan around it must clear the whole bounding
sphere of the FATTEST child subtree, not just a sibling-count chord:
two siblings MIN_SEP apart each carrying a descendant cloud of radius
`ext` need their centers ≥ 2·ext + MIN_SEP units apart or the clouds
interpenetrate and weld into the glued mess the old sep-only radii
produced.

Runs as a bottom-up pass (reverse `placed` order — `layoutNodes`
always emits parents before children, so reversed iteration resolves
every child before its parent):

ext[i] = leaf → glyph radius
= inner → cluster[i] + max(ext over children)
cluster[i] = max(
SCENE_MIN_ORBIT, // lone-child floor
(2·maxChildExt + MIN_SEP) / (2·sin(π/kids)), // sibling clear
glyphRadius(i) + maxChildExt + MIN_SEP // glyph clears cloud
)

The sibling-clear term is the ring bound `chord = 2R·sin(π/n)` solved
for R — conservative for the Fibonacci sphere (whose uniform spread
beats the ring's worst-case chord), and `ext[0]` ends up the exact
bounding radius of the whole graph for the camera fit.

- `@param` parents Parent index per node (-1 = root).
- `@param` dirs 1 for directory nodes, 0 for file leaves.
- `@returns` `{ cluster, ext }` — child-orbit radius and subtree bounding

### `layoutPositionsJs`

Hierarchical-sphere layout — the procedural-directory reference's
model: every node's children orbit it on a Fibonacci sphere
(phi = acos(1 − 2·(s+0.5)/n), theta = s·golden-angle) at the
parent's cluster radius. Cluster radii come from `clusterRadii` —
the reference's shrink-ratio orbits with a sibling-glyph clearance
floor, so icons keep ≥SCENE_MIN_SEP of wireframe clear space while
subtree clouds compress geometrically (the hairball fix: strict
non-interpenetration grows exponentially and is unreadable past a
few hundred nodes).
Runs iteratively: `layoutNodes` always emits a parent before
its children, so `placed`-order evaluation sees resolved parents.

- `@param` parents Parent index per node (-1 = root).
- `@param` sibs Sibling slot per node.
- `@param` sibCounts Sibling count per node.
- `@param` dirs 1 for directory nodes, 0 for file leaves.
- `@returns` `{ xyz, scale }` — position triplets and the proportional

### `computePositions`

Batch position compute — wasm worker first, local math on failure. The
worker replies with a transferable Float32Array; `structuredClone` of
the plain-object result also survives when transfer is unsupported.

- `@param` placed Flattened tree nodes.
- `@returns` xyz triplets, or null when nothing resolved.

### `dirWireVerts`

Wireframe folder glyph — the procedural-directory reference shape:
a front panel (top edge slightly lower, the open-mouth read), a
taller back panel, a tab on the back's top-left, and the depth
connectors that make it read as a 3D box from any orbit angle.
Pure vertex math — no textures, no imported geometry. Scaled to
SCENE_DIR_RADIUS. Exported: the scene3d arm ribbons the same verts.

- `@returns` Flat xyz pairs — segment list for LINES drawing.

### `fileWireVerts`

Wireframe document glyph — folded-corner page outline + inner fold
diagonal + three text-rule lines (the reference file shape). Scaled
to SCENE_FILE_RADIUS·1.3 so leaf glyphs read smaller than folders
(the container/item size ratio of the reference). Exported: the
scene3d arm ribbons the same verts.

- `@returns` Flat xyz pairs — segment list for LINES drawing.

### `wireBound`

Bounding radius of a wire segment list — the invisible pick-sphere
radius (wire glyphs have no triangle surface to raycast, so picking
runs against instanced spheres sized to the glyph's exact bound).
Exported: the scene3d arm sizes its JS-side pick spheres from the
same bound.

- `@param` verts Flat xyz pairs.

### `probeIconInks`

Per-kind ink probe — the map colors file nodes with the EXACT ink
the treeview icon pack paints that extension's glyph, sampled off
`docs-tree-icon docs-tree-icon--<kind>` probe elements parked inside
the portal's shadow root (icon SCSS is shadow-scoped; probes must
live inside it for --icon-ink to resolve). `hidden` keeps the probe
invisible — custom properties still compute. Returns null entries
for unparseable/no-stylesheet environments (tests) — callers fall
back to the dir accent ink.

- `@param` host Element inside the .docs shadow tree (canvas's parent).
- `@param` kinds Distinct icon kinds to sample.

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

### `countSceneSubtree`

Counts a node's whole subtree — the `+N` on a depth-capped dir's
aggregate leaf. Recursive per the self-similar-traversal rule.

- `@param` node Subtree root.
- `@returns` Total descendant count.

### `placeRoots`

The manifest buckets hang off a synthetic center node — the portal
root level IS the tree root, so the scene reads as one rooted graph
(center = "In-depth project docs", ring 1 = the four buckets, …).
Buckets are { root, label, children } — mapped to dir nodes here so
they carry a real path (pickable + highlightable) and a real label.
File leaves are capped per dir (capSceneLeaves) so giant coverage
dirs don't weld into combs. Shared by the three.js and scene3d arms.

- `@param` roots Manifest root buckets.
- `@returns` The flattened placed tree.

### `resolveScenePath`

Resolves an active docsPath to a placed node — the exact match, or
when the scene caps ('+N' aggregates, depth budget) folded the path
away, the nearest visible ancestor (longest string-prefix + deepest
match wins). Returns -1 for ''/unresolvable paths so the focus falls
back to the portal root. Shared by both arms.

- `@param` placed Flattened placed tree.
- `@param` path Active docsPath.
- `@returns` placed index of the node to light/focus, or -1.

### (module scope)

Camera-fit numbers for a placed tree — shared by both arms.

### `graphR`

Outer ring radius of the deepest node.

### `camDist`

Eye distance that frames the whole graph with ~20% margin.

### `far`

Far plane — clears the opposite rim at this distance.

### `graphFit`

Fit the camera to the real graph radius — the sphere layout spreads
clusters along parent orbits, so the bound is the longest orbit
chain: distance(node) = orbit(parent→node) + distance(parent),
accumulated down each branch. dist = r/sin(fov/2) with ~20% margin
frames the whole graph.

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

Node draw calls — the procedural-directory look: every directory
renders the wireframe folder glyph, every file the folded-page
glyph, each through ONE instanced LineSegments draw so the
multi-thousand-node graph costs two draw calls (plus the edge set
and revealed labels). Picking runs against invisible instanced
spheres — wire lines have no surface to raycast and three's line
raycast has no instancing path; the pick tier shares the highlight
attribute buffers with the glyph geometry.

### `dirGlyph`

The instanced wireframe glyph draws — disposed with the scene.

### `dirPlaced`

placed[] index per instance slot — a raycast instanceId resolves to a node.

### `pickTables`

Mesh → its placed-index table, so a raycast hit maps back to a path.

### `pulseTime`

Shared pulse clock — patched into both node materials' shaders.

### `lineGeo`

Edge geometry + material — assigned inside buildGraph, disposed in destroy().

### `writeActive`

Rewrites one tier's instanced attributes for the active location:
the exact path match pops to SCENE_ACTIVE_OPACITY with the larger
pulse scale (aActive=1), and ancestor dirs on its branch lift to
SCENE_ANCESTOR_OPACITY so the route's lineage reads on the map.
Everything else keeps the faint backdrop alpha for its tier.
Ancestry walks the placed parent chain — section-group paths
('group/…') aren't string prefixes of their members' manifest
paths, so path-prefix matching can't see them.

### `buildGraph`

Populates the scene once the (possibly worker-computed) positions
land — meshes, edges, then dir-name labels on top of dir nodes.
`scale` carries each node's orbit-proportional glyph factor.

### `buildTier`

Builds one instanced tier — the wireframe glyph as a single
instanced LineSegments draw (aOffset/aColor/aPhase/aSpin +
aAlpha/aActive drive the vertex shader) plus the invisible
instanced pick sphere. The pick geometry SHARES the alpha/active
attribute objects with the glyph geometry, so the highlight pass
keeps writing one buffer both visuals read.

- `@param` verts Wire segment list (flat xyz pairs).
- `@param` baseOpacity Resting alpha for the tier.
- `@param` idxs placed[] indexes in this tier.
- `@param` rgbOf Per-node ink resolver (icon-pack palette).
- `@returns` {glyph, pick} — draw object + pick mesh.

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
