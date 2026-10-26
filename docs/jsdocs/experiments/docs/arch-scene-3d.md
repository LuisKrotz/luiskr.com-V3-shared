# `experiments\docs\arch-scene-3d.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\arch-scene-3d.ts`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

A pickable node: engine ids + the JS-side state the arms animate.

### `node`

Engine node id (set_position/set_scale/set_euler target).

### `mat`

Fill material id — `set_color` writes the live opacity.

### `seamMat`

Seam material id — the knockout strokes' material; the highlight
pass writes the same alpha to it so fills and seams fade together.

### `x`

World position — picking ray sphere-test center.

### `radius`

Sphere radius for hit tests (pulse widened).

### `depth`

Ring depth — the focus-glide dolly distance input.

### `path`

Manifest path — onPick payload + highlight key.

### `pi`

placed[] index — the parent chain walk for ancestor highlights.

### `baseOpacity`

Resting opacity (dir/file token).

### `activeScale`

Active-highlight scale multiplier applied in the pulse write.

### `rgb`

Per-kind ink rgb — restored by the highlight pass; the glyph
palette is per-node now, not one global ink.

### `phase`

Bob phase — decorrelated per node (golden-angle hash).

### (module scope)

A dir label: sprite node + material + the zoom-reveal bucket.

### `node`

Engine sprite node.

### `mat`

Sprite material — per-frame `set_color` alpha is the fade.

### `depth`

Ring depth — the reveal threshold input.

### `a`

Last written alpha — dirty-gated so idle frames write nothing.

### `parseInk`

Parses a CSS color string into 0-1 rgb channels — the engine takes
raw f32 triplets where the three path passed a `THREE.Color`.
Handles rgb()/rgba() and #rgb/#rrggbb (what `getComputedStyle`
emits); anything else falls back to white — unreachable in real
browsers, which always resolve `color` to an rgb() serialization.

- `@param` css Computed color string.
- `@returns` [r, g, b] in 0-1.

### `poseFromPos`

Converts a saved world-space camera position into the orbit rig's
spherical pose — the inverse of the Rust rig's
`target + d·(cos p·sin y, sin p, cos p·cos y)`.

- `@param` p Saved eye position.
- `@param` t Saved orbit target.
- `@returns` [distance, yaw, pitch].

### `segmentsToRibbons`

Expands a raw segment list into cross-quad ribbon geometry — two
perpendicular quads per segment (the engine draws triangles only;
a crossed pair reads as a 1px line strip from every angle). SoA
upload: positions + zero normals (basic material is unlit) + zero
uvs + triangle indices. Used by the edge fan; the filled glyphs
upload through `trisToGeometry` instead.

- `@param` segs Flat xyz pairs — every six floats are one segment.
- `@param` half Ribbon half-width in chart units.
- `@returns` The four attribute arrays for `upload_geometry`.

### `trisToGeometry`

Packages a glyph triangle soup into the engine's SoA geometry
payload — sequential indices over the unindexed soup, zero normals
(the basic material is unlit) and zero uvs. Mirrors
`segmentsToRibbons`'s return shape so both upload identically.

- `@param` tris Flat xyz triplets — every 9 floats one triangle.
- `@returns` The four attribute arrays for `upload_geometry`.

### `buildEdges`

Expands the parent→child edge list into cross-quad ribbon geometry
via `segmentsToRibbons` at the edge half-width.

- `@param` placed Flattened tree.
- `@param` positions xyz triplets per node.
- `@returns` The four attribute arrays for `upload_geometry`.

### `mountArchScene3d`

Mounts the scene3d arm: engine → orbit rig → async graph build →
rAF loop. Returns null on ANY engine/artifact failure — the caller
(mountArchScene) drops to the three.js path, so this mount can
never regress the portal.

- `@param` canvas Target canvas (same element the three path uses).
- `@param` roots Manifest root buckets.
- `@param` onPick Called with the manifest path on a node pick.
- `@returns` The scene handle, or null when the engine can't mount.

### `saveCamState`

Serializes camera pose into sessionStorage.

### `graphRoot`

Root group — every node/edge/label parents under it.

### `activePath`

Docs path currently highlighted — '' matches the portal-root node.

### `focus`

Location-focus glide — setActive retargets; the tick eases the orbit
rig's target + distance toward the goal (the rig's setTarget/setPose
snap, so per-frame lerped writes ARE the animation). '' or an
unknown path falls back to the origin at the full-graph distance.

### `startFocus`

Arms the focus glide for a docs location — placed nodes aim at their
world position with a depth-scaled dolly; the portal root keeps the
full-graph distance. Re-armed at the end of buildGraph so a location
set before positions landed still centers once they arrive.

### `applyActive`

Paints the active-location highlight onto live nodes — same rules
as the three arm: exact match pops to SCENE_ACTIVE_OPACITY with a
larger pulse scale, ancestors lift to SCENE_ANCESTOR_OPACITY.

### `buildGraph`

Populates the scene once positions land — shared dir/file sphere
geometries, per-node materials (opacity arms), cross-quad edges,
then dir-name labels on top.

- `@param` positions Worker/local result — `xyz` position triplets plus

### `pick`

Nearest sphere hit along the picking ray — the JS half of
`Raycaster.intersectObjects`: solve |o + t·d − c|² = r² per node
(per-pick loop over pickables, never per-frame).

### `paused`

Host-driven pause — true while the map column is display:none. The
loop stops scheduling entirely (no rAF wakeup, no GPU frame); the
flag is also re-checked at tick entry so a pause that lands between
schedule and fire still dead-ends the frame.
