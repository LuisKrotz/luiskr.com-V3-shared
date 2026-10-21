[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / Scene3dSurface

Defined in: core/utils/gpu/scene3d.ts:40

The wasm-pack `Surface3d` handle — one method per `pub fn` in
`rust/scene3d/src/wasm.rs`, flat scalars + typed-array views only
(no serde structs, ~64B/call boundary cost). Geometry/material/
texture/node ids are u32 registry indices; stale ids no-op inside
the engine. Declared here rather than imported from the artifact
`.d.ts` so core/ stays standalone.

## Methods

### resize()

```ts
resize(w, h): void;
```

Defined in: core/utils/gpu/scene3d.ts:42

Backing-store resize in DEVICE px — depth + surface re-configure.

#### Parameters

##### w

`number`

##### h

`number`

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: core/utils/gpu/scene3d.ts:44

CSS size — retained for contract parity (no-op on the engine).

#### Parameters

##### w

`number`

##### h

`number`

#### Returns

`void`

---

### gen\_sphere()

```ts
gen_sphere(
   radius,
   ws,
   hs,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:46

UV-sphere generator → geometry id (`asPoints` = point expansion).

#### Parameters

##### radius

`number`

##### ws

`number`

##### hs

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_plane()

```ts
gen_plane(
   w,
   h,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:48

Plane generator → geometry id.

#### Parameters

##### w

`number`

##### h

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_ring()

```ts
gen_ring(
   inner,
   outer,
   segments,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:50

Flat ring generator → geometry id.

#### Parameters

##### inner

`number`

##### outer

`number`

##### segments

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_box()

```ts
gen_box(
   w,
   h,
   d,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:52

Box generator → geometry id.

#### Parameters

##### w

`number`

##### h

`number`

##### d

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_cylinder()

```ts
gen_cylinder(
   rt,
   rb,
   h,
   segs,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:54

Cylinder/cone generator → geometry id.

#### Parameters

##### rt

`number`

##### rb

`number`

##### h

`number`

##### segs

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_torus()

```ts
gen_torus(
   radius,
   tube,
   radial,
   tubular,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:56

Torus generator → geometry id.

#### Parameters

##### radius

`number`

##### tube

`number`

##### radial

`number`

##### tubular

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_icosahedron()

```ts
gen_icosahedron(
   radius,
   detail,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:64

Icosahedron generator → geometry id (`detail` subdivides).

#### Parameters

##### radius

`number`

##### detail

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### gen\_tetrahedron()

```ts
gen_tetrahedron(radius, asPoints): number;
```

Defined in: core/utils/gpu/scene3d.ts:66

Tetrahedron generator → geometry id.

#### Parameters

##### radius

`number`

##### asPoints

`boolean`

#### Returns

`number`

---

### upload\_geometry()

```ts
upload_geometry(
   positions,
   normals,
   uvs,
   indices,
   asPoints
): number;
```

Defined in: core/utils/gpu/scene3d.ts:71

Custom geometry upload — SoA typed arrays (positions 3n, normals
3n, uvs 2n, indices 3k) → geometry id.

#### Parameters

##### positions

`Float32Array`

##### normals

`Float32Array`

##### uvs

`Float32Array`

##### indices

`Uint32Array`

##### asPoints

`boolean`

#### Returns

`number`

---

### upload\_texture()

```ts
upload_texture(
   bitmap,
   w,
   h
): number;
```

Defined in: core/utils/gpu/scene3d.ts:79

Decoded bitmap → texture id (GPU→GPU upload, zero readback).

#### Parameters

##### bitmap

`ImageBitmap`

##### w

`number`

##### h

`number`

#### Returns

`number`

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

Defined in: core/utils/gpu/scene3d.ts:81

Unlit texel·color material → material id.

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

##### tex

`number`

#### Returns

`number`

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

Defined in: core/utils/gpu/scene3d.ts:83

Blinn-Phong lit material → material id.

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

##### roughness

`number`

##### metalness

`number`

##### tex

`number`

#### Returns

`number`

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

Defined in: core/utils/gpu/scene3d.ts:93

Billboard sprite material → material id.

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

##### tex

`number`

#### Returns

`number`

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

Defined in: core/utils/gpu/scene3d.ts:95

Expanded-quad point-sprite material → material id.

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

##### size

`number`

##### tex

`number`

#### Returns

`number`

---

### set\_material\_flags()

```ts
set_material_flags(
   mat,
   side,
   blending,
   transparent,
   depthWrite
): void;
```

Defined in: core/utils/gpu/scene3d.ts:101

Pipeline flags on a registered material — side 0=front/1=back/
2=double, blending 0=normal/1=additive, plus transparent +
depth-write toggles.

#### Parameters

##### mat

`number`

##### side

`number`

##### blending

`number`

##### transparent

`boolean`

##### depthWrite

`boolean`

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

Defined in: core/utils/gpu/scene3d.ts:109

Additive self-lit tint on a material.

#### Parameters

##### mat

`number`

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

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

Defined in: core/utils/gpu/scene3d.ts:114

Base rgba on a material — alpha is the opacity slot for per-frame
fade/highlight arms (one uniform-pack row per write).

#### Parameters

##### mat

`number`

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

#### Returns

`void`

---

### add\_mesh()

```ts
add_mesh(
   parent,
   geo,
   mat
): number;
```

Defined in: core/utils/gpu/scene3d.ts:116

Triangle mesh node under `parent` (SCENE3D_NONE = root) → node id.

#### Parameters

##### parent

`number`

##### geo

`number`

##### mat

`number`

#### Returns

`number`

---

### add\_points()

```ts
add_points(
   parent,
   geo,
   mat
): number;
```

Defined in: core/utils/gpu/scene3d.ts:118

Points node → node id.

#### Parameters

##### parent

`number`

##### geo

`number`

##### mat

`number`

#### Returns

`number`

---

### add\_sprite()

```ts
add_sprite(parent, mat): number;
```

Defined in: core/utils/gpu/scene3d.ts:120

Billboard sprite node → node id.

#### Parameters

##### parent

`number`

##### mat

`number`

#### Returns

`number`

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

Defined in: core/utils/gpu/scene3d.ts:122

Instanced-mesh node with a fixed instance capacity → node id.

#### Parameters

##### parent

`number`

##### geo

`number`

##### mat

`number`

##### capacity

`number`

#### Returns

`number`

---

### add\_group()

```ts
add_group(parent): number;
```

Defined in: core/utils/gpu/scene3d.ts:124

Transform-only group node → node id.

#### Parameters

##### parent

`number`

#### Returns

`number`

---

### add\_lod()

```ts
add_lod(parent): number;
```

Defined in: core/utils/gpu/scene3d.ts:126

LOD switch node → node id (children carry `set_lod_range`s).

#### Parameters

##### parent

`number`

#### Returns

`number`

---

### set\_lod\_range()

```ts
set_lod_range(
   node,
   near,
   far
): void;
```

Defined in: core/utils/gpu/scene3d.ts:128

Distance range at which an LOD child is drawn.

#### Parameters

##### node

`number`

##### near

`number`

##### far

`number`

#### Returns

`void`

---

### remove()

```ts
remove(node): void;
```

Defined in: core/utils/gpu/scene3d.ts:130

Detaches + drops a node subtree.

#### Parameters

##### node

`number`

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

Defined in: core/utils/gpu/scene3d.ts:132

Local-space position write.

#### Parameters

##### node

`number`

##### x

`number`

##### y

`number`

##### z

`number`

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

Defined in: core/utils/gpu/scene3d.ts:134

Local-space euler rotation write (radians).

#### Parameters

##### node

`number`

##### x

`number`

##### y

`number`

##### z

`number`

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

Defined in: core/utils/gpu/scene3d.ts:136

Local-space scale write.

#### Parameters

##### node

`number`

##### x

`number`

##### y

`number`

##### z

`number`

#### Returns

`void`

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

Defined in: core/utils/gpu/scene3d.ts:138

Orients the node's -Z (or billboard normal) at a world target.

#### Parameters

##### node

`number`

##### x

`number`

##### y

`number`

##### z

`number`

#### Returns

`void`

---

### set\_visible()

```ts
set_visible(node, visible): void;
```

Defined in: core/utils/gpu/scene3d.ts:140

Subtree visibility toggle.

#### Parameters

##### node

`number`

##### visible

`boolean`

#### Returns

`void`

---

### set\_layers()

```ts
set_layers(node, mask): void;
```

Defined in: core/utils/gpu/scene3d.ts:142

Layer bitmask write (camera masks cull against it).

#### Parameters

##### node

`number`

##### mask

`number`

#### Returns

`void`

---

### set\_render\_order()

```ts
set_render_order(node, order): void;
```

Defined in: core/utils/gpu/scene3d.ts:144

Painter-order tiebreak inside a pass.

#### Parameters

##### node

`number`

##### order

`number`

#### Returns

`void`

---

### set\_user\_data()

```ts
set_user_data(node, data): void;
```

Defined in: core/utils/gpu/scene3d.ts:146

Opaque f64 user slot (body ids, catalog indices).

#### Parameters

##### node

`number`

##### data

`number`

#### Returns

`void`

---

### user\_data()

```ts
user_data(node): number;
```

Defined in: core/utils/gpu/scene3d.ts:148

Reads the user slot back.

#### Parameters

##### node

`number`

#### Returns

`number`

---

### set\_instance()

```ts
set_instance(
   node,
   i,
   m
): void;
```

Defined in: core/utils/gpu/scene3d.ts:150

Writes one 16-f32 instance matrix on an instanced node.

#### Parameters

##### node

`number`

##### i

`number`

##### m

`Float32Array`

#### Returns

`void`

---

### world\_position()

```ts
world_position(node): Float32Array;
```

Defined in: core/utils/gpu/scene3d.ts:152

World-space position of a node → [x, y, z].

#### Parameters

##### node

`number`

#### Returns

`Float32Array`

---

### set\_camera()

```ts
set_camera(
   x,
   y,
   z
): void;
```

Defined in: core/utils/gpu/scene3d.ts:154

Camera eye position.

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

#### Returns

`void`

---

### camera\_look\_at()

```ts
camera_look_at(
   x,
   y,
   z
): void;
```

Defined in: core/utils/gpu/scene3d.ts:156

Camera look-at target.

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

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

Defined in: core/utils/gpu/scene3d.ts:162

Orbit rig — target + distance + yaw/pitch; once set, the camera
derives its eye each frame from the orbit state (the JS input
controller writes these six scalars per gesture).

#### Parameters

##### tx

`number`

##### ty

`number`

##### tz

`number`

##### distance

`number`

##### yaw

`number`

##### pitch

`number`

#### Returns

`void`

---

### set\_fov()

```ts
set_fov(deg): void;
```

Defined in: core/utils/gpu/scene3d.ts:164

Vertical field of view, degrees.

#### Parameters

##### deg

`number`

#### Returns

`void`

---

### set\_clip()

```ts
set_clip(near, far): void;
```

Defined in: core/utils/gpu/scene3d.ts:166

Near/far clip planes.

#### Parameters

##### near

`number`

##### far

`number`

#### Returns

`void`

---

### set\_camera\_layers()

```ts
set_camera_layers(mask): void;
```

Defined in: core/utils/gpu/scene3d.ts:168

Camera layer mask — culls nodes whose mask doesn't intersect.

#### Parameters

##### mask

`number`

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

Defined in: core/utils/gpu/scene3d.ts:170

The single scene point light — position + rgb + intensity.

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

##### r

`number`

##### g

`number`

##### b

`number`

##### intensity

`number`

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

Defined in: core/utils/gpu/scene3d.ts:180

Clear color rgba 0-1 (transparent black composites over the page).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

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

Defined in: core/utils/gpu/scene3d.ts:182

Post-chain amounts — film grain, chromatic aberration, bloom.

#### Parameters

##### film

`number`

##### chroma

`number`

##### bloom

`number`

#### Returns

`void`

---

### frame()

```ts
frame(time, dpr): void;
```

Defined in: core/utils/gpu/scene3d.ts:188

One engine tick — `time` is the caller's scene clock in seconds,
`dpr` the device pixel ratio for resolution-scaled passes. The
caller's rAF loop is the only clock (frame-budget rule).

#### Parameters

##### time

`number`

##### dpr

`number`

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

Defined in: core/utils/gpu/scene3d.ts:193

Screen→world picking ray → [ox, oy, oz, dx, dy, dz]. Per-pick,
never per-frame — JS intersects it against body bounds itself.

#### Parameters

##### sx

`number`

##### sy

`number`

##### sw

`number`

##### sh

`number`

#### Returns

`Float32Array`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/gpu/scene3d.ts:195

Drops the surface + every GPU resource it owns.

#### Returns

`void`
