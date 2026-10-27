# `website\public\wasm\scene3d\luiskr_scene3d.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\scene3d\luiskr_scene3d.js`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Surface3d`

`Surface3d` — the exported scene handle: the engine state (scene,
camera, renderer) plus the per-frame scalar state JS pushes through
set_* calls (light, clear color, post amounts). Kept as one struct
so the JS handle has exactly ONE drop point (`destroy`).

### `add_group`

`add_group` — a transform-only node (three.js Group/Object3D).

- `@param` parent Parent id or `u32::MAX`.
- `@returns` The new node id.
- `@param` {number} parent
- `@returns` {number}

### `add_instanced`

`add_instanced` — InstancedMesh(geo, mat).

- `@param` parent Parent id or `u32::MAX`.
- `@param` geo Geometry id. @param mat Material id.
- `@param` capacity Reserved instance slots.
- `@returns` The new node id.
- `@param` {number} parent
- `@param` {number} geo
- `@param` {number} mat
- `@param` {number} capacity
- `@returns` {number}

### `add_lod`

`add_lod` — an LOD switch node (three.js LOD): children
self-select via `lod_range` against camera distance.

- `@param` parent Parent id or `u32::MAX`.
- `@returns` The new node id.
- `@param` {number} parent
- `@returns` {number}

### `add_material_basic`

`add_material_basic` — MeshBasicMaterial (unlit texel·color).

- `@param` r @param g @param b @param a Color rgba 0-1.
- `@param` tex Texture id or `u32::MAX` for none.
- `@returns` The material registry id.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a
- `@param` {number} tex
- `@returns` {number}

### `add_material_points`

`add_material_points` — PointsMaterial (expanded-quad point
sprites).

- `@param` r @param g @param b @param a Color rgba 0-1.
- `@param` size World-space point half-size.
- `@param` tex Texture id or `u32::MAX`.
- `@returns` The material registry id.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a
- `@param` {number} size
- `@param` {number} tex
- `@returns` {number}

### `add_material_sprite`

`add_material_sprite` — SpriteMaterial (billboard texel·color).

- `@param` r @param g @param b @param a Color rgba 0-1.
- `@param` tex Texture id or `u32::MAX`.
- `@returns` The material registry id.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a
- `@param` {number} tex
- `@returns` {number}

### `add_material_standard`

`add_material_standard` — MeshStandardMaterial (Blinn-Phong —
see shader_standard.wgsl for the lighting model).

- `@param` r @param g @param b @param a Color rgba 0-1.
- `@param` roughness Surface roughness 0-1 (→ spec exponent).
- `@param` metalness Metallic factor 0-1 (→ spec tint).
- `@param` tex Texture id or `u32::MAX`.
- `@returns` The material registry id.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a
- `@param` {number} roughness
- `@param` {number} metalness
- `@param` {number} tex
- `@returns` {number}

### `add_mesh`

`add_mesh` — Mesh(geo, mat).

- `@param` parent Parent node id or `u32::MAX` for root.
- `@param` geo Geometry id. @param mat Material id.
- `@returns` The new node id.
- `@param` {number} parent
- `@param` {number} geo
- `@param` {number} mat
- `@returns` {number}

### `add_points`

`add_points` — Points(geo, mat).

- `@param` parent Parent id or `u32::MAX`.
- `@param` geo Geometry id. @param mat Material id.
- `@returns` The new node id.
- `@param` {number} parent
- `@param` {number} geo
- `@param` {number} mat
- `@returns` {number}

### `add_sprite`

`add_sprite` — Sprite(mat) — geometry is the shared billboard
quad inside the renderer.

- `@param` parent Parent id or `u32::MAX`.
- `@param` mat Material id.
- `@returns` The new node id.
- `@param` {number} parent
- `@param` {number} mat
- `@returns` {number}

### `camera_look_at`

`camera_look_at` — point the direct camera at a world target.

- `@param` x @param y @param z World target.
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `destroy`

`destroy` — release the surface (GpuDevice drops with the
struct; the canvas detaches when JS removes the element).

### `frame`

`frame` — one full draw: refresh worlds → write camera block →
draw list → submit. The JS loop calls this once per rAF
(MANUAL drive — the engine never self-schedules).

- `@param` time Elapsed seconds (shader clocks).
- `@param` dpr Device pixel ratio (point-size compensation).
- `@param` {number} time
- `@param` {number} dpr

### `gen_box`

`gen_box` — box generator passthrough.

- `@param` w @param h @param d Edge lengths.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} w
- `@param` {number} h
- `@param` {number} d
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_cylinder`

`gen_cylinder` — cylinder generator passthrough.

- `@param` rt @param rb Top/bottom radii.
- `@param` h Height. @param segs Radial segments.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} rt
- `@param` {number} rb
- `@param` {number} h
- `@param` {number} segs
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_icosahedron`

`gen_icosahedron` — icosahedron generator passthrough.

- `@param` radius Circumscribed radius.
- `@param` detail Subdivision detail.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} radius
- `@param` {number} detail
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_plane`

`gen_plane` — XY plane generator passthrough.

- `@param` w @param h Plane extents.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} w
- `@param` {number} h
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_ring`

`gen_ring` — flat ring generator passthrough.

- `@param` inner @param outer Ring radii.
- `@param` segments Radial segment count.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} inner
- `@param` {number} outer
- `@param` {number} segments
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_sphere`

`gen_sphere` — unit generator passthrough (docs in geometry.rs).

- `@param` radius Sphere radius.
- `@param` ws @param hs Width/height segments.
- `@param` as_points True → billboard-quad expansion (Points).
- `@returns` The geometry registry id.
- `@param` {number} radius
- `@param` {number} ws
- `@param` {number} hs
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_tetrahedron`

`gen_tetrahedron` — tetrahedron generator passthrough.

- `@param` radius Circumscribed radius.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} radius
- `@param` {boolean} as_points
- `@returns` {number}

### `gen_torus`

`gen_torus` — torus generator passthrough.

- `@param` radius Ring radius. @param tube Tube radius.
- `@param` radial @param tubular Segment counts.
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {number} radius
- `@param` {number} tube
- `@param` {number} radial
- `@param` {number} tubular
- `@param` {boolean} as_points
- `@returns` {number}

### `node_look_at`

`node_look_at` — orient a node toward a world point (three.js
Object3D.lookAt — billboard moons, camera-chasing shells).

- `@param` node Node id. @param x @param y @param z World target.
- `@param` {number} node
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `ray_at`

`ray_at` — screen-space picking ray: NDC pixel → world-space
(origin, direction) — JS loops bodies with it (sphere tests
per body, per-pick only).

`inv_view` is rebuilt from the camera's rotation + position —
the view matrix's inverse IS the camera world transform (no
general 4×4 inverse needed for a rigid transform).

- `@param` sx @param sy Screen position in CSS px.
- `@param` sw @param sh Canvas size in CSS px.
- `@returns` [ox, oy, oz, dx, dy, dz] — origin + normalized dir.
- `@param` {number} sx
- `@param` {number} sy
- `@param` {number} sw
- `@param` {number} sh
- `@returns` {Float32Array}

### `remove`

`remove` — detach + drop a node (three.js remove/orphan
semantics — children re-parent to the root).

- `@param` node Node id.
- `@param` {number} node

### `resize`

`resize` — backing-store size in DEVICE px (DPR-aware): depth
attachment + surface configure re-issue. Called from the JS
ResizeObserver arm.

- `@param` w @param h Device-pixel size.
- `@param` {number} w
- `@param` {number} h

### `set_camera`

`set_camera` — direct TRS camera (orbit disabled). For orbiting
scenes use `set_orbit` instead — the two modes are exclusive
(orbit derives position/rotation each frame).

- `@param` x @param y @param z Eye position.
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `set_camera_layers`

`set_camera_layers` — the camera's layer mask (only nodes
whose `layers` intersect it draw).

- `@param` mask Layer bitmask.
- `@param` {number} mask

### `set_clear`

`set_clear` — the frame clear color (transparent black for
page-composited canvases).

- `@param` r @param g @param b @param a Clear rgba 0-1.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a

### `set_clip`

`set_clip` — near/far planes (see camera.rs for the depth-
precision note on near).

- `@param` near Near clip. @param far Far clip.
- `@param` {number} near
- `@param` {number} far

### `set_color`

`set_color` — the base rgba on a registered material. Alpha is
the opacity slot — the per-frame label-fade/highlight arms
write this once per visible material (one uniform-pack row —
cheaper than rebuilding the record).

- `@param` mat Material id.
- `@param` r @param g @param b @param a rgba 0-1.
- `@param` {number} mat
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a

### `set_emissive`

`set_emissive` — the additive self-lit tint on a material.

- `@param` mat Material id.
- `@param` r @param g @param b @param a Emissive rgba.
- `@param` {number} mat
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a

### `set_euler`

`set_euler` — object-space Euler rotation, XYZ radians
(three.js rotation.set — converts to the internal quaternion).

- `@param` node Node id. @param x @param y @param z Euler radians.
- `@param` {number} node
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `set_fov`

`set_fov` — vertical field of view in DEGREES (three.js
parity — stored as radians inside).

- `@param` deg Field of view.
- `@param` {number} deg

### `set_instance`

`set_instance` — write one instance transform on an Instanced
node. Takes the 16 column-major f32s as a typed array — the
same layout `Mat4.m` uses, no repacking.

- `@param` node Instanced node id.
- `@param` i Instance slot.
- `@param` m The 16-f32 matrix.
- `@param` {number} node
- `@param` {number} i
- `@param` {Float32Array} m

### `set_layers`

`set_layers` — the 32-bit layer mask (three.js Layers: node
draws only when `layers & camera.layers != 0`).

- `@param` node Node id. @param mask Layer bitmask.
- `@param` {number} node
- `@param` {number} mask

### `set_light`

`set_light` — the scene's single point light.

- `@param` x @param y @param z Light position.
- `@param` r @param g @param b Light color rgb 0-1.
- `@param` intensity Scalar multiplier.
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} intensity

### `set_lod_range`

`set_lod_range` — a child's distance window under a Lod node:
the child draws when camera distance ∈ [near, far).

- `@param` node Child node id.
- `@param` near @param far Distance window.
- `@param` {number} node
- `@param` {number} near
- `@param` {number} far

### `set_material_flags`

`set_material_flags` — pipeline-state flags on a registered
material. REBUILDS the material's bind group slot cheaply
(flags live in the uniform pack — the bind group itself is
texture-only and untouched).

- `@param` mat Material id.
- `@param` side 0=front 1=back 2=double (three.js *Side).
- `@param` blending 0=normal 1=additive.
- `@param` transparent Alpha-sort pass membership.
- `@param` depth_write Depth-buffer writes on/off.
- `@param` {number} mat
- `@param` {number} side
- `@param` {number} blending
- `@param` {boolean} transparent
- `@param` {boolean} depth_write

### `set_orbit`

`set_orbit` — the spherical rig: eye = target + R(yaw,pitch)·
(0,0,distance), facing the target (see camera.rs Orbit).

- `@param` tx @param ty @param tz Orbit target.
- `@param` distance Eye distance.
- `@param` yaw Rotation about +Y, radians.
- `@param` pitch Elevation, radians (clamped inside).
- `@param` {number} tx
- `@param` {number} ty
- `@param` {number} tz
- `@param` {number} distance
- `@param` {number} yaw
- `@param` {number} pitch

### `set_position`

`set_position` — object-space translation (three.js
position.set — marks the node dirty for the next world pass).

- `@param` node Node id. @param x @param y @param z Position.
- `@param` {number} node
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `set_post`

`set_post` — post-chain amounts; all-zero skips the pass.

- `@param` film Film grain 0-1.
- `@param` chroma Chromatic aberration 0-1.
- `@param` bloom Bloom strength 0-1.
- `@param` {number} film
- `@param` {number} chroma
- `@param` {number} bloom

### `set_render_order`

`set_render_order` — the stable within-pass sort key (three.js
renderOrder — higher draws later).

- `@param` node Node id. @param order Sort key.
- `@param` {number} node
- `@param` {number} order

### `set_scale`

`set_scale` — object-space per-axis scale.

- `@param` node Node id. @param x @param y @param z Scale factors.
- `@param` {number} node
- `@param` {number} x
- `@param` {number} y
- `@param` {number} z

### `set_size`

`set_size` — CSS-pixel size for layout-derived math (sprite
attenuation, point sizes in CSS units). Separate channel from
`resize` per the crate-wide contract: `set_size`/`res` = CSS,
`resize`/`rect` = device.

- `@param` _w @param _h CSS-pixel size — folded into the camera
- `@param` {number} _w
- `@param` {number} _h

### `set_user_data`

`set_user_data` — the opaque engine tag (body ids, tile keys —
the graph never interprets it; JS round-trips it for picking).

- `@param` node Node id. @param data The tag.
- `@param` {number} node
- `@param` {number} data

### `set_visible`

`set_visible` — the visibility gate (hidden subtrees skip the
whole draw walk, children included).

- `@param` node Node id. @param visible Gate flag.
- `@param` {number} node
- `@param` {boolean} visible

### `upload_geometry`

`upload_geometry` — arbitrary vertex data (the custom
BufferGeometry path: star-point clouds, hand-built shells).
Typed arrays in, geo_id out — zero JsValue marshalling.

- `@param` positions xyz triples (len = 3n).
- `@param` normals xyz triples (len = 3n — zeros allowed for
- `@param` uvs uv pairs (len = 2n).
- `@param` indices Triangle indices (len = 3k, u32).
- `@param` as_points Points-expansion flag.
- `@returns` The geometry registry id.
- `@param` {Float32Array} positions
- `@param` {Float32Array} normals
- `@param` {Float32Array} uvs
- `@param` {Uint32Array} indices
- `@param` {boolean} as_points
- `@returns` {number}

### `upload_texture`

`upload_texture` — register a decoded ImageBitmap (the
GPU→GPU `copyExternalImageToTexture` path — no CPU pixel
readback).

- `@param` bitmap The JS-decoded bitmap.
- `@param` w @param h Pixel size.
- `@returns` The texture registry id (u32::MAX on a device fault —
- `@param` {ImageBitmap} bitmap
- `@param` {number} w
- `@param` {number} h
- `@returns` {number}

### `user_data`

`user_data` — read back the engine tag.

- `@param` node Node id.
- `@returns` The tag as f64 (exact for u53 ids).
- `@param` {number} node
- `@returns` {number}

### `world_position`

`world_position` — a node's world-space translation
(three.js getWorldPosition — engine-side pick helpers use it).

- `@param` node Node id.
- `@returns` [x, y, z] — allocated per call; pick paths only,
- `@param` {number} node
- `@returns` {Float32Array}

### `mount`

`mount` — bind a canvas to the page's SHARED GPUDevice and build
the renderer around it. The device is acquired once in JS
(`getSharedGpuDevice`) and passed to every artifact — per-widget
devices exhausted the driver's device budget on a widget-heavy
page (Windows/D3D12: `create command queue failed with
E_OUTOFMEMORY` after ~100 devices). Sync: with the device in hand
there is nothing to await, and a synchronous constructor can never
leave a wasm-bindgen closure dangling (the async-future trap was
the "closure invoked recursively" cascade). `await` on the JS side
tolerates the non-promise return unchanged.

- `@param` canvas The host canvas element.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@param` w @param h Backing size in DEVICE pixels.
- `@returns` The scene handle, or a JS error string on init failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device
- `@param` {number} w
- `@param` {number} h
- `@returns` {Surface3d}
