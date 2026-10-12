[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFState

Defined in: experiments/star-field/engine/types.ts:371

Mutable engine state — one bag threaded through bootstrap/frame/fly so
every stage shares renderer, scene graph, tweens and dispose flags
without a class field soup.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement | null
```

Defined in: experiments/star-field/engine/types.ts:373

Persistent canvas the host owns (replaced on renderer retry).

---

### renderer

```ts
renderer:
  | {
  render: unknown;
  dispose: void;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:375

three.js WebGPURenderer (WebGPU or forced-WebGL backend).

---

### pipeline

```ts
pipeline:
  | {
  render: unknown;
  dispose: void;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:382

RenderPipeline post chain (scene → +bloom → vignette → film grain) —
null when the pipeline failed to build or the backend rejected it;
the frame loop falls back to `renderer.render(scene, camera)` in
that case, losing post FX but never the scene.

---

### scene

```ts
scene: Scene<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:383

---

### world

```ts
world: Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:394

Floating-origin world root — every catalog body, cloud and rider
parents under this group instead of the scene directly. The follow
step counter-translates it so the followed anchor sits at the world
origin: rider-mounted bodies translate up to ~16k units/s on the
galactic ring, which would otherwise push all coordinates to ~6.7M
where float32 quantization (±0.5 units) visibly jitters every mesh.
Skybox and lights stay on the scene at the origin — the pin point —
so they always enclose/light whatever the camera follows.

---

### sunLight

```ts
sunLight: Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:401

Sun stand-in point light — created in the scene at the origin (the
pin point), then re-parented onto the Sun anchor once bodies build
so it keeps illuminating from the Sun's real position whichever
body the floating origin currently pins.

---

### camera

```ts
camera: PerspectiveCamera | null
```

Defined in: experiments/star-field/engine/types.ts:402

---

### controls

```ts
controls: OrbitControls | null
```

Defined in: experiments/star-field/engine/types.ts:403

---

### nodes

```ts
nodes: Map<string, SFNode>
```

Defined in: experiments/star-field/engine/types.ts:405

id → runtime body node record.

---

### anchors

```ts
anchors: Map<string, Object3D<Object3DEventMap>>
```

Defined in: experiments/star-field/engine/types.ts:407

id → center Object3D the camera targets (equals mesh for most).

---

### pickables

```ts
pickables: Object3D < Object3DEventMap > []
```

Defined in: experiments/star-field/engine/types.ts:409

Pickable meshes for raycasting.

---

### dayNight

```ts
dayNight: object[];
```

Defined in: experiments/star-field/engine/types.ts:418

Day/night shader registry — bodies with sun-direction-dependent
shading (night-lights emissive gating, atmosphere rim shells).
Each frame `updateDayNight` writes `dir = normalize(sunPos −
bodyPos)` into the shared vector the material's TSL uniform wraps,
so lights stay dark on the lit hemisphere and the rim migrates
with the terminator.

#### anchor

```ts
anchor: Object3D
```

#### dir

```ts
dir: Vector3
```

---

### approached

```ts
approached: Set<string>
```

Defined in: experiments/star-field/engine/types.ts:420

ids whose dossier was already prefetched — approach fires once.

---

### solarWind

```ts
solarWind:
  | {
  value: number;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:428

Shared solar-wind uniform — `updateSolarWind` writes the 0–1+
activity level each frame; aurora shells, the sun's flare sprites
and the corona breathe with it so a storm visibly propagates from
the Sun to every atmosphere-bearing planet. TSL uniform node
(runtime `.value`), null until bootstrap creates it.

---

### fxTime

```ts
fxTime:
  | {
  value: number;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:434

Shared scene-time uniform (scene seconds) — the weather field,
aurora curtains and any other TSL effect reads this instead of
baking `s.t` so a single per-frame write animates every shader.

---

### starCloud

```ts
starCloud: Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:440

Real-star cloud Points (HYG catalogue field on the Milky Way disc)
— set by star-cloud.ts once the packed binary decodes; kept on
state so destroy() can dispose its geometry/material.

---

### starCloudLoading

```ts
starCloudLoading: boolean
```

Defined in: experiments/star-field/engine/types.ts:442

Guard flag — the star-cloud fetch fires only once per boot.

---

### THREE

```ts
THREE: __module | null
```

Defined in: experiments/star-field/engine/types.ts:450

Post-boot handles kept for lazy registry-body spawns — the deep
catalog's 139k records are plain cloud points until selected, when
`registry-body.ts` builds a real textured mesh on demand. Bootstrap
stashes the three module, node-material deps and the shared glow
sprite here so spawn code never re-imports lazily-loaded modules.

---

### deps

```ts
deps: SFNodeDeps | null
```

Defined in: experiments/star-field/engine/types.ts:451

---

### glowTex

```ts
glowTex: Texture<unknown, TextureEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:453

Shared soft-disc sprite — registry halos reuse it, never own it.

---

### registryBodies

```ts
registryBodies: Map<string, Object3D<Object3DEventMap>>
```

Defined in: experiments/star-field/engine/types.ts:459

Spawned registry bodies (`star-NNNNNN`… → Object3D) mounted on the
Sun's pivot — an LRU map capped at `SF_STAR_CLOUD.BODY_CACHE` so a
long browsing session never accumulates 139k meshes.

---

### fly

```ts
fly: SFFly | null
```

Defined in: experiments/star-field/engine/types.ts:461

Active fly-to tween or null when controls are free.

---

### animId

```ts
animId: number | null
```

Defined in: experiments/star-field/engine/types.ts:463

Active RAF id.

---

### disposed

```ts
disposed: boolean
```

Defined in: experiments/star-field/engine/types.ts:465

Set by destroy() — every async stage checks before continuing.

---

### failed

```ts
failed: boolean
```

Defined in: experiments/star-field/engine/types.ts:467

Bootstrap failed or bailed — host swaps in the CSS fallback.

---

### reduced

```ts
reduced: boolean
```

Defined in: experiments/star-field/engine/types.ts:469

Reduced-motion flag — pauses the RAF loop.

---

### onResize

```ts
onResize: (() => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:471

Resize listener to detach on destroy.

---

### onPointerDown

```ts
onPointerDown: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:473

Pointer listeners to detach on destroy.

---

### onPointerMove

```ts
onPointerMove: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:474

---

### onPointerUp

```ts
onPointerUp: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:475

---

### onWheel

```ts
onWheel: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:476

---

### downXY

```ts
downXY:
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:478

last pointer-down position for click-vs-drag discrimination.

---

### lastT

```ts
lastT: number
```

Defined in: experiments/star-field/engine/types.ts:480

Last tick timestamp for dt-based animation.

---

### t

```ts
t: number
```

Defined in: experiments/star-field/engine/types.ts:482

Elapsed scene time (seconds) — drives orbits/spins.

---

### hoverId

```ts
hoverId: string | null
```

Defined in: experiments/star-field/engine/types.ts:484

Camera hover state — last picked body id for the HUD.

---

### hint

```ts
hint:
  | {
  id: string;
  anchor: Object3D<Object3DEventMap> | null;
  rec:   | SFRegistryRecord
     | null;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:495

Navigator-hover position hint — while the pointer (or focus) rests
on a catalog row the engine reports the body's projected screen
position every tick, edge-clamped so the hint works at any zoom
level. Plain data, resolved per tick in `trackHover`: catalog ids
carry their `anchor` (live world position) and registry rows carry
their shard `rec` (resolved via `registryWorldPos` in the pinned
frame). Null when no nav row is hovered; takes precedence over
`hoverId` (the pointer is on the drawer, not the canvas).

---

### selectedId

```ts
selectedId: string | null
```

Defined in: experiments/star-field/engine/types.ts:501

Selected body id (panel open).

---

### followId

```ts
followId: string | null
```

Defined in: experiments/star-field/engine/types.ts:509

Camera-follow anchor — which catalog id the camera rides with when
no fly tween runs. Selections set it to the picked body; the solar
overview sets it to the Sun so the chart holds the solar system
while it orbits inside the galactic disc — without marking a
dossier selection. Null = free camera.

---

### onReady?

```ts
optional onReady?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:511

Lifecycle callbacks from the host.

#### Returns

`void`

---

### onProgress?

```ts
optional onProgress?: SFProgressFn;
```

Defined in: experiments/star-field/engine/types.ts:512

---

### onSelect?

```ts
optional onSelect?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:513

---

### onApproach?

```ts
optional onApproach?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:514

---

### onHover?

```ts
optional onHover?: (bodyId) => void;
```

Defined in: experiments/star-field/engine/types.ts:515

#### Parameters

##### bodyId

`string` \| `null`

#### Returns

`void`

---

### onHoverMove?

```ts
optional onHoverMove?: (bodyId, x, y, edge?, angle?) => void;
```

Defined in: experiments/star-field/engine/types.ts:524

Per-frame hover tracking — fires every tick while a body is hovered
with its projected canvas-space pixel position, so the tooltip and
its leader line follow orbiting bodies without DOM thrash. `edge`
marks the projected point as clamped to the canvas edge (object
off-screen or behind) and `angle` carries the outward direction in
degrees for the leader-line arrow.

#### Parameters

##### bodyId

`string`

##### x

`number`

##### y

`number`

##### edge?

`boolean`

##### angle?

`number`

#### Returns

`void`

---

### onLost?

```ts
optional onLost?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:526

Fires once when a frame throws — host swaps to the 2D fallback.

#### Returns

`void`
