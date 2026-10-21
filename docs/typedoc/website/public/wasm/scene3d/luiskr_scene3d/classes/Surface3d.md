[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/scene3d/luiskr\_scene3d](../README.md) / Surface3d

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:10

`Surface3d` — the exported scene handle: the engine state (scene,
camera, renderer) plus the per-frame scalar state JS pushes through
set_* calls (light, clear color, post amounts). Kept as one struct
so the JS handle has exactly ONE drop point (`destroy`).

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:12

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:13

#### Returns

`void`

---

### add\_group()

```ts
add_group(parent): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:20

`add_group` — a transform-only node (three.js Group/Object3D).

#### Parameters

##### parent

`number`

Parent id or `u32::MAX`.

#### Returns

`number`

The new node id.

---

### add\_instanced()

```ts
add_instanced(
   parent,
   geo,
   mat,
   capacity
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:29

`add_instanced` — InstancedMesh(geo, mat).

#### Parameters

##### parent

`number`

Parent id or `u32::MAX`.

##### geo

`number`

Geometry id.

##### mat

`number`

Material id.

##### capacity

`number`

Reserved instance slots.

#### Returns

`number`

The new node id.

---

### add\_lod()

```ts
add_lod(parent): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:37

`add_lod` — an LOD switch node (three.js LOD): children
self-select via `lod_range` against camera distance.

#### Parameters

##### parent

`number`

Parent id or `u32::MAX`.

#### Returns

`number`

The new node id.

---

### add\_material\_basic()

```ts
add_material_basic(
   r,
   g,
   b,
   a,
   tex
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:45

`add_material_basic` — MeshBasicMaterial (unlit texel·color).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Color rgba 0-1.

##### tex

`number`

Texture id or `u32::MAX` for none.

#### Returns

`number`

The material registry id.

---

### add\_material\_points()

```ts
add_material_points(
   r,
   g,
   b,
   a,
   size,
   tex
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:55

`add_material_points` — PointsMaterial (expanded-quad point
sprites).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Color rgba 0-1.

##### size

`number`

World-space point half-size.

##### tex

`number`

Texture id or `u32::MAX`.

#### Returns

`number`

The material registry id.

---

### add\_material\_sprite()

```ts
add_material_sprite(
   r,
   g,
   b,
   a,
   tex
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:63

`add_material_sprite` — SpriteMaterial (billboard texel·color).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Color rgba 0-1.

##### tex

`number`

Texture id or `u32::MAX`.

#### Returns

`number`

The material registry id.

---

### add\_material\_standard()

```ts
add_material_standard(
   r,
   g,
   b,
   a,
   roughness,
   metalness,
   tex
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:74

`add_material_standard` — MeshStandardMaterial (Blinn-Phong —
see shader_standard.wgsl for the lighting model).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Color rgba 0-1.

##### roughness

`number`

Surface roughness 0-1 (→ spec exponent).

##### metalness

`number`

Metallic factor 0-1 (→ spec tint).

##### tex

`number`

Texture id or `u32::MAX`.

#### Returns

`number`

The material registry id.

---

### add\_mesh()

```ts
add_mesh(
   parent,
   geo,
   mat
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:90

`add_mesh` — Mesh(geo, mat).

#### Parameters

##### parent

`number`

Parent node id or `u32::MAX` for root.

##### geo

`number`

Geometry id.

##### mat

`number`

Material id.

#### Returns

`number`

The new node id.

---

### add\_points()

```ts
add_points(
   parent,
   geo,
   mat
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:98

`add_points` — Points(geo, mat).

#### Parameters

##### parent

`number`

Parent id or `u32::MAX`.

##### geo

`number`

Geometry id.

##### mat

`number`

Material id.

#### Returns

`number`

The new node id.

---

### add\_sprite()

```ts
add_sprite(parent, mat): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:107

`add_sprite` — Sprite(mat) — geometry is the shared billboard
quad inside the renderer.

#### Parameters

##### parent

`number`

Parent id or `u32::MAX`.

##### mat

`number`

Material id.

#### Returns

`number`

The new node id.

---

### camera\_look\_at()

```ts
camera_look_at(
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:113

`camera_look_at` — point the direct camera at a world target.

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

World target.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:118

`destroy` — release the surface (GpuDevice drops with the
struct; the canvas detaches when JS removes the element).

#### Returns

`void`

---

### frame()

```ts
frame(time, dpr): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:127

`frame` — one full draw: refresh worlds → write camera block →
draw list → submit. The JS loop calls this once per rAF
(MANUAL drive — the engine never self-schedules).

#### Parameters

##### time

`number`

Elapsed seconds (shader clocks).

##### dpr

`number`

Device pixel ratio (point-size compensation).

#### Returns

`void`

---

### gen\_box()

```ts
gen_box(
   w,
   h,
   d,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:135

`gen_box` — box generator passthrough.

#### Parameters

##### w

`number`

##### h

`number`

##### d

`number`

Edge lengths.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_cylinder()

```ts
gen_cylinder(
   rt,
   rb,
   h,
   segs,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:144

`gen_cylinder` — cylinder generator passthrough.

#### Parameters

##### rt

`number`

##### rb

`number`

Top/bottom radii.

##### h

`number`

Height.

##### segs

`number`

Radial segments.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_icosahedron()

```ts
gen_icosahedron(
   radius,
   detail,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:153

`gen_icosahedron` — icosahedron generator passthrough.

#### Parameters

##### radius

`number`

Circumscribed radius.

##### detail

`number`

Subdivision detail.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_plane()

```ts
gen_plane(
   w,
   h,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:161

`gen_plane` — XY plane generator passthrough.

#### Parameters

##### w

`number`

##### h

`number`

Plane extents.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_ring()

```ts
gen_ring(
   inner,
   outer,
   segments,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:170

`gen_ring` — flat ring generator passthrough.

#### Parameters

##### inner

`number`

##### outer

`number`

Ring radii.

##### segments

`number`

Radial segment count.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_sphere()

```ts
gen_sphere(
   radius,
   ws,
   hs,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:179

`gen_sphere` — unit generator passthrough (docs in geometry.rs).

#### Parameters

##### radius

`number`

Sphere radius.

##### ws

`number`

##### hs

`number`

Width/height segments.

##### as\_points

`boolean`

True → billboard-quad expansion (Points).

#### Returns

`number`

The geometry registry id.

---

### gen\_tetrahedron()

```ts
gen_tetrahedron(radius, as_points): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:187

`gen_tetrahedron` — tetrahedron generator passthrough.

#### Parameters

##### radius

`number`

Circumscribed radius.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### gen\_torus()

```ts
gen_torus(
   radius,
   tube,
   radial,
   tubular,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:196

`gen_torus` — torus generator passthrough.

#### Parameters

##### radius

`number`

Ring radius.

##### tube

`number`

Tube radius.

##### radial

`number`

##### tubular

`number`

Segment counts.

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### node\_look\_at()

```ts
node_look_at(
   node,
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:209

`node_look_at` — orient a node toward a world point (three.js
Object3D.lookAt — billboard moons, camera-chasing shells).

#### Parameters

##### node

`number`

Node id.

##### x

`number`

##### y

`number`

##### z

`number`

World target.

#### Returns

`void`

---

### ray\_at()

```ts
ray_at(
   sx,
   sy,
   sw,
   sh
): Float32Array;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:223

`ray_at` — screen-space picking ray: NDC pixel → world-space
(origin, direction) — JS loops bodies with it (sphere tests
per body, per-pick only).

`inv_view` is rebuilt from the camera's rotation + position —
the view matrix's inverse IS the camera world transform (no
general 4×4 inverse needed for a rigid transform).

#### Parameters

##### sx

`number`

##### sy

`number`

Screen position in CSS px.

##### sw

`number`

##### sh

`number`

Canvas size in CSS px.

#### Returns

`Float32Array`

[ox, oy, oz, dx, dy, dz] — origin + normalized dir.

---

### remove()

```ts
remove(node): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:230

`remove` — detach + drop a node (three.js remove/orphan
semantics — children re-parent to the root).

#### Parameters

##### node

`number`

Node id.

#### Returns

`void`

---

### resize()

```ts
resize(w, h): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:238

`resize` — backing-store size in DEVICE px (DPR-aware): depth
attachment + surface configure re-issue. Called from the JS
ResizeObserver arm.

#### Parameters

##### w

`number`

##### h

`number`

Device-pixel size.

#### Returns

`void`

---

### set\_camera()

```ts
set_camera(
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:246

`set_camera` — direct TRS camera (orbit disabled). For orbiting
scenes use `set_orbit` instead — the two modes are exclusive
(orbit derives position/rotation each frame).

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

Eye position.

#### Returns

`void`

---

### set\_camera\_layers()

```ts
set_camera_layers(mask): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:253

`set_camera_layers` — the camera's layer mask (only nodes
whose `layers` intersect it draw).

#### Parameters

##### mask

`number`

Layer bitmask.

#### Returns

`void`

---

### set\_clear()

```ts
set_clear(
   r,
   g,
   b,
   a
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:260

`set_clear` — the frame clear color (transparent black for
page-composited canvases).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Clear rgba 0-1.

#### Returns

`void`

---

### set\_clip()

```ts
set_clip(near, far): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:267

`set_clip` — near/far planes (see camera.rs for the depth-
precision note on near).

#### Parameters

##### near

`number`

Near clip.

##### far

`number`

Far clip.

#### Returns

`void`

---

### set\_color()

```ts
set_color(
   mat,
   r,
   g,
   b,
   a
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:277

`set_color` — the base rgba on a registered material. Alpha is
the opacity slot — the per-frame label-fade/highlight arms
write this once per visible material (one uniform-pack row —
cheaper than rebuilding the record).

#### Parameters

##### mat

`number`

Material id.

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

rgba 0-1.

#### Returns

`void`

---

### set\_emissive()

```ts
set_emissive(
   mat,
   r,
   g,
   b,
   a
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:284

`set_emissive` — the additive self-lit tint on a material.

#### Parameters

##### mat

`number`

Material id.

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Emissive rgba.

#### Returns

`void`

---

### set\_euler()

```ts
set_euler(
   node,
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:291

`set_euler` — object-space Euler rotation, XYZ radians
(three.js rotation.set — converts to the internal quaternion).

#### Parameters

##### node

`number`

Node id.

##### x

`number`

##### y

`number`

##### z

`number`

Euler radians.

#### Returns

`void`

---

### set\_fov()

```ts
set_fov(deg): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:298

`set_fov` — vertical field of view in DEGREES (three.js
parity — stored as radians inside).

#### Parameters

##### deg

`number`

Field of view.

#### Returns

`void`

---

### set\_instance()

```ts
set_instance(
   node,
   i,
   m
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:308

`set_instance` — write one instance transform on an Instanced
node. Takes the 16 column-major f32s as a typed array — the
same layout `Mat4.m` uses, no repacking.

#### Parameters

##### node

`number`

Instanced node id.

##### i

`number`

Instance slot.

##### m

`Float32Array`

The 16-f32 matrix.

#### Returns

`void`

---

### set\_layers()

```ts
set_layers(node, mask): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:315

`set_layers` — the 32-bit layer mask (three.js Layers: node
draws only when `layers & camera.layers != 0`).

#### Parameters

##### node

`number`

Node id.

##### mask

`number`

Layer bitmask.

#### Returns

`void`

---

### set\_light()

```ts
set_light(
   x,
   y,
   z,
   r,
   g,
   b,
   intensity
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:323

`set_light` — the scene's single point light.

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

Light position.

##### r

`number`

##### g

`number`

##### b

`number`

Light color rgb 0-1.

##### intensity

`number`

Scalar multiplier.

#### Returns

`void`

---

### set\_lod\_range()

```ts
set_lod_range(
   node,
   near,
   far
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:339

`set_lod_range` — a child's distance window under a Lod node:
the child draws when camera distance ∈ [near, far).

#### Parameters

##### node

`number`

Child node id.

##### near

`number`

##### far

`number`

Distance window.

#### Returns

`void`

---

### set\_material\_flags()

```ts
set_material_flags(
   mat,
   side,
   blending,
   transparent,
   depth_write
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:352

`set_material_flags` — pipeline-state flags on a registered
material. REBUILDS the material's bind group slot cheaply
(flags live in the uniform pack — the bind group itself is
texture-only and untouched).

#### Parameters

##### mat

`number`

Material id.

##### side

`number`

0=front 1=back 2=double (three.js *Side).

##### blending

`number`

0=normal 1=additive.

##### transparent

`boolean`

Alpha-sort pass membership.

##### depth\_write

`boolean`

Depth-buffer writes on/off.

#### Returns

`void`

---

### set\_orbit()

```ts
set_orbit(
   tx,
   ty,
   tz,
   distance,
   yaw,
   pitch
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:368

`set_orbit` — the spherical rig: eye = target + R(yaw,pitch)·
(0,0,distance), facing the target (see camera.rs Orbit).

#### Parameters

##### tx

`number`

##### ty

`number`

##### tz

`number`

Orbit target.

##### distance

`number`

Eye distance.

##### yaw

`number`

Rotation about +Y, radians.

##### pitch

`number`

Elevation, radians (clamped inside).

#### Returns

`void`

---

### set\_position()

```ts
set_position(
   node,
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:375

`set_position` — object-space translation (three.js
position.set — marks the node dirty for the next world pass).

#### Parameters

##### node

`number`

Node id.

##### x

`number`

##### y

`number`

##### z

`number`

Position.

#### Returns

`void`

---

### set\_post()

```ts
set_post(
   film,
   chroma,
   bloom
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:383

`set_post` — post-chain amounts; all-zero skips the pass.

#### Parameters

##### film

`number`

Film grain 0-1.

##### chroma

`number`

Chromatic aberration 0-1.

##### bloom

`number`

Bloom strength 0-1.

#### Returns

`void`

---

### set\_render\_order()

```ts
set_render_order(node, order): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:390

`set_render_order` — the stable within-pass sort key (three.js
renderOrder — higher draws later).

#### Parameters

##### node

`number`

Node id.

##### order

`number`

Sort key.

#### Returns

`void`

---

### set\_scale()

```ts
set_scale(
   node,
   x,
   y,
   z
): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:396

`set_scale` — object-space per-axis scale.

#### Parameters

##### node

`number`

Node id.

##### x

`number`

##### y

`number`

##### z

`number`

Scale factors.

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:407

`set_size` — CSS-pixel size for layout-derived math (sprite
attenuation, point sizes in CSS units). Separate channel from
`resize` per the crate-wide contract: `set_size`/`res` = CSS,
`resize`/`rect` = device.

#### Parameters

##### \_w

`number`

##### \_h

`number`

CSS-pixel size — folded into the camera
aspect at frame time via the device size; kept for
contract parity (future CSS-space effects).

#### Returns

`void`

---

### set\_user\_data()

```ts
set_user_data(node, data): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:414

`set_user_data` — the opaque engine tag (body ids, tile keys —
the graph never interprets it; JS round-trips it for picking).

#### Parameters

##### node

`number`

Node id.

##### data

`number`

The tag.

#### Returns

`void`

---

### set\_visible()

```ts
set_visible(node, visible): void;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:421

`set_visible` — the visibility gate (hidden subtrees skip the
whole draw walk, children included).

#### Parameters

##### node

`number`

Node id.

##### visible

`boolean`

Gate flag.

#### Returns

`void`

---

### upload\_geometry()

```ts
upload_geometry(
   positions,
   normals,
   uvs,
   indices,
   as_points
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:435

`upload_geometry` — arbitrary vertex data (the custom
BufferGeometry path: star-point clouds, hand-built shells).
Typed arrays in, geo_id out — zero JsValue marshalling.

#### Parameters

##### positions

`Float32Array`

xyz triples (len = 3n).

##### normals

`Float32Array`

xyz triples (len = 3n — zeros allowed for
unlit materials).

##### uvs

`Float32Array`

uv pairs (len = 2n).

##### indices

`Uint32Array`

Triangle indices (len = 3k, u32).

##### as\_points

`boolean`

Points-expansion flag.

#### Returns

`number`

The geometry registry id.

---

### upload\_texture()

```ts
upload_texture(
   bitmap,
   w,
   h
): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:452

`upload_texture` — register a decoded ImageBitmap (the
GPU→GPU `copyExternalImageToTexture` path — no CPU pixel
readback).

#### Parameters

##### bitmap

`ImageBitmap`

The JS-decoded bitmap.

##### w

`number`

##### h

`number`

Pixel size.

#### Returns

`number`

The texture registry id (u32::MAX on a device fault —
materials bind the white fallback rather than panicking).

---

### user\_data()

```ts
user_data(node): number;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:459

`user_data` — read back the engine tag.

#### Parameters

##### node

`number`

Node id.

#### Returns

`number`

The tag as f64 (exact for u53 ids).

---

### world\_position()

```ts
world_position(node): Float32Array;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:468

`world_position` — a node's world-space translation
(three.js getWorldPosition — engine-side pick helpers use it).

#### Parameters

##### node

`number`

Node id.

#### Returns

`Float32Array`

[x, y, z] — allocated per call; pick paths only,
never per-frame.
