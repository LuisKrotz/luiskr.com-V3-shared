# `core\utils\gpu\scene3d.ts`

| | |
|---|---|
| **Source** | `src/core\utils\gpu\scene3d.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SCENE3D_NONE`

`u32::MAX` — the wasm registry's sentinel for "none": attach a node
to the scene root (`parent`), or bind no texture to a material
(`tex`). One constant serves both slots since the Rust registry
types share the id space.

### (module scope)

The wasm-pack `Surface3d` handle — one method per `pub fn` in
`rust/scene3d/src/wasm.rs`, flat scalars + typed-array views only
(no serde structs, ~64B/call boundary cost). Geometry/material/
texture/node ids are u32 registry indices; stale ids no-op inside
the engine. Declared here rather than imported from the artifact
`.d.ts` so core/ stays standalone.

### `resize`

Backing-store resize in DEVICE px — depth + surface re-configure.

### `set_size`

CSS size — retained for contract parity (no-op on the engine).

### `gen_sphere`

UV-sphere generator → geometry id (`asPoints` = point expansion).

### `gen_plane`

Plane generator → geometry id.

### `gen_ring`

Flat ring generator → geometry id.

### `gen_box`

Box generator → geometry id.

### `gen_cylinder`

Cylinder/cone generator → geometry id.

### `gen_torus`

Torus generator → geometry id.

### `gen_icosahedron`

Icosahedron generator → geometry id (`detail` subdivides).

### `gen_tetrahedron`

Tetrahedron generator → geometry id.

### `upload_geometry`

Custom geometry upload — SoA typed arrays (positions 3n, normals
3n, uvs 2n, indices 3k) → geometry id.

### `upload_texture`

Decoded bitmap → texture id (GPU→GPU upload, zero readback).

### `add_material_basic`

Unlit texel·color material → material id.

### `add_material_standard`

Blinn-Phong lit material → material id.

### `add_material_sprite`

Billboard sprite material → material id.

### `add_material_points`

Expanded-quad point-sprite material → material id.

### `set_material_flags`

Pipeline flags on a registered material — side 0=front/1=back/
2=double, blending 0=normal/1=additive, plus transparent +
depth-write toggles.

### `set_emissive`

Additive self-lit tint on a material.

### `set_color`

Base rgba on a material — alpha is the opacity slot for per-frame
fade/highlight arms (one uniform-pack row per write).

### `add_mesh`

Triangle mesh node under `parent` (SCENE3D_NONE = root) → node id.

### `add_points`

Points node → node id.

### `add_sprite`

Billboard sprite node → node id.

### `add_instanced`

Instanced-mesh node with a fixed instance capacity → node id.

### `add_group`

Transform-only group node → node id.

### `add_lod`

LOD switch node → node id (children carry `set_lod_range`s).

### `set_lod_range`

Distance range at which an LOD child is drawn.

### `remove`

Detaches + drops a node subtree.

### `set_position`

Local-space position write.

### `set_euler`

Local-space euler rotation write (radians).

### `set_scale`

Local-space scale write.

### `node_look_at`

Orients the node's -Z (or billboard normal) at a world target.

### `set_visible`

Subtree visibility toggle.

### `set_layers`

Layer bitmask write (camera masks cull against it).

### `set_render_order`

Painter-order tiebreak inside a pass.

### `set_user_data`

Opaque f64 user slot (body ids, catalog indices).

### `user_data`

Reads the user slot back.

### `set_instance`

Writes one 16-f32 instance matrix on an instanced node.

### `world_position`

World-space position of a node → [x, y, z].

### `set_camera`

Camera eye position.

### `camera_look_at`

Camera look-at target.

### `set_orbit`

Orbit rig — target + distance + yaw/pitch; once set, the camera
derives its eye each frame from the orbit state (the JS input
controller writes these six scalars per gesture).

### `set_fov`

Vertical field of view, degrees.

### `set_clip`

Near/far clip planes.

### `set_camera_layers`

Camera layer mask — culls nodes whose mask doesn't intersect.

### `set_light`

The single scene point light — position + rgb + intensity.

### `set_clear`

Clear color rgba 0-1 (transparent black composites over the page).

### `set_post`

Post-chain amounts — film grain, chromatic aberration, bloom.

### `frame`

One engine tick — `time` is the caller's scene clock in seconds,
`dpr` the device pixel ratio for resolution-scaled passes. The
caller's rAF loop is the only clock (frame-budget rule).

### `ray_at`

Screen→world picking ray → [ox, oy, oz, dx, dy, dz]. Per-pick,
never per-frame — JS intersects it against body bounds itself.

### `destroy`

Drops the surface + every GPU resource it owns.

### (module scope)

The generated wasm-pack glue module shape for the scene3d crate:
the async wasm initializer plus the `mount` async constructor that
returns the engine handle.

### `default`

Async initializer returning the wasm exports.

### `mount`

Engine constructor — binds the canvas to the shared GPUDevice and
configures the surface. Sync under the hood (no promises left in
wasm init); `await` tolerates the plain return unchanged.

### (module scope)

Live scene handle returned by `mountScene3d`.

### `canvas`

The canvas the engine draws into (the caller's element).

### `surface`

The wasm `Surface3d` — call its flat id-API directly.

### `destroy`

Disconnects the ResizeObserver + drops the surface.

### (module scope)

Default module loader — dynamic-imports the wasm-pack glue at the
registry URL. `@vite-ignore` keeps vite from resolving the
build-optional artifact; a 404 rejects and the caller falls back.
Injectable for tests.
- `@param` url Artifact glue URL.

### `resizeScene3d`

Pushes the canvas's current device-px size into the engine — the
same DPR-aware measurement the widget bridge performs, shared by the
mount path and the ResizeObserver arm.
- `@param` surface The live engine handle.
- `@param` canvas The host canvas.

### (module scope)

Mounts the scene3d engine on `canvas`: loads the artifact, runs the
async mount (adapter + device + configure), wires a ResizeObserver
feeding device-px `resize`, and returns the live handle. Resolves
null on ANY capability/artifact/init failure — the caller keeps its
existing renderer, so mounting can never regress the page.
- `@param` canvas The scene's dedicated canvas element.
- `@param` loadModule Injectable module loader (tests substitute a stub).

### (module scope)

Decodes `url` through the shared wasm image pipeline (fetch → worker
createImageBitmap → GPU texture, zero CPU readback) and uploads it —
the texture half of `THREE.TextureLoader.loadAsync`. Resolves the
registry texture id, or null when decode/upload fails so the caller
falls back to a procedural color (same contract as the engines'
missing-texture arm).
- `@param` surface The live engine handle.
- `@param` url CDN image URL.
- `@param` targetW GPU resize-hint width.
- `@param` targetH GPU resize-hint height.
