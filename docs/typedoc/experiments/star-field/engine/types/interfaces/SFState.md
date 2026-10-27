[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFState

Defined in: experiments/star-field/engine/types.ts:456

Mutable engine state — one bag threaded through bootstrap/frame/fly so
every stage shares renderer, scene graph, tweens and dispose flags
without a class field soup.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement | null
```

Defined in: experiments/star-field/engine/types.ts:458

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

Defined in: experiments/star-field/engine/types.ts:460

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

Defined in: experiments/star-field/engine/types.ts:467

RenderPipeline post chain (scene → +bloom → vignette → film grain) —
null when the pipeline failed to build or the backend rejected it;
the frame loop falls back to `renderer.render(scene, camera)` in
that case, losing post FX but never the scene.

---

### scene

```ts
scene: Scene<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:468

---

### world

```ts
world: Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:479

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

Defined in: experiments/star-field/engine/types.ts:486

Sun stand-in point light — created in the scene at the origin (the
pin point), then re-parented onto the Sun anchor once bodies build
so it keeps illuminating from the Sun's real position whichever
body the floating origin currently pins.

---

### camera

```ts
camera: PerspectiveCamera | null
```

Defined in: experiments/star-field/engine/types.ts:487

---

### controls

```ts
controls: OrbitControls | null
```

Defined in: experiments/star-field/engine/types.ts:488

---

### nodes

```ts
nodes: Map<string, SFNode>
```

Defined in: experiments/star-field/engine/types.ts:490

id → runtime body node record.

---

### anchors

```ts
anchors: Map<string, Object3D<Object3DEventMap>>
```

Defined in: experiments/star-field/engine/types.ts:492

id → center Object3D the camera targets (equals mesh for most).

---

### pickables

```ts
pickables: Object3D < Object3DEventMap > []
```

Defined in: experiments/star-field/engine/types.ts:494

Pickable meshes for raycasting.

---

### dayNight

```ts
dayNight: object[];
```

Defined in: experiments/star-field/engine/types.ts:503

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

#### sun?

```ts
optional sun?: Object3D<Object3DEventMap>;
```

Light-source anchor override — galactic planets (TRAPPIST-1's
worlds, Proxima's) are lit by their host star, not the solar
Sun, so their day/night vector resolves against the parent's
anchor instead of the default `sunLight`. Moons of planets
(Io, Enceladus) keep the default: they orbit a planet but are
still lit by the real Sun.

---

### approached

```ts
approached: Set<string>
```

Defined in: experiments/star-field/engine/types.ts:517

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

Defined in: experiments/star-field/engine/types.ts:525

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

Defined in: experiments/star-field/engine/types.ts:531

Shared scene-time uniform (scene seconds) — the weather field,
aurora curtains and any other TSL effect reads this instead of
baking `s.t` so a single per-frame write animates every shader.

---

### starCloud

```ts
starCloud: Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:537

Real-star cloud Points (HYG catalogue field on the Milky Way disc)
— set by star-cloud.ts once the packed binary decodes; kept on
state so destroy() can dispose its geometry/material.

---

### starCloudLoading

```ts
starCloudLoading: boolean
```

Defined in: experiments/star-field/engine/types.ts:539

Guard flag — the star-cloud fetch fires only once per boot.

---

### THREE

```ts
THREE: __module | null
```

Defined in: experiments/star-field/engine/types.ts:547

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

Defined in: experiments/star-field/engine/types.ts:548

---

### glowTex

```ts
glowTex: Texture<unknown, TextureEventMap> | null
```

Defined in: experiments/star-field/engine/types.ts:550

Shared soft-disc sprite — registry halos reuse it, never own it.

---

### registryBodies

```ts
registryBodies: Map<string, Object3D<Object3DEventMap>>
```

Defined in: experiments/star-field/engine/types.ts:556

Spawned registry bodies (`star-NNNNNN`… → Object3D) mounted on the
Sun's pivot — an LRU map capped at `SF_STAR_CLOUD.BODY_CACHE` so a
long browsing session never accumulates 139k meshes.

---

### fly

```ts
fly: SFFly | null
```

Defined in: experiments/star-field/engine/types.ts:558

Active fly-to tween or null when controls are free.

---

### animId

```ts
animId: number | null
```

Defined in: experiments/star-field/engine/types.ts:560

Active RAF id.

---

### disposed

```ts
disposed: boolean
```

Defined in: experiments/star-field/engine/types.ts:562

Set by destroy() — every async stage checks before continuing.

---

### failed

```ts
failed: boolean
```

Defined in: experiments/star-field/engine/types.ts:564

Bootstrap failed or bailed — host swaps in the CSS fallback.

---

### reduced

```ts
reduced: boolean
```

Defined in: experiments/star-field/engine/types.ts:566

Reduced-motion flag — pauses the RAF loop.

---

### onResize

```ts
onResize: (() => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:568

Resize listener to detach on destroy.

---

### onPointerDown

```ts
onPointerDown: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:570

Pointer listeners to detach on destroy.

---

### onPointerMove

```ts
onPointerMove: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:571

---

### onPointerUp

```ts
onPointerUp: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:572

---

### onWheel

```ts
onWheel: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:573

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

Defined in: experiments/star-field/engine/types.ts:575

last pointer-down position for click-vs-drag discrimination.

---

### pickX

```ts
pickX: number
```

Defined in: experiments/star-field/engine/types.ts:582

Pending hover-pick position — the freshest coalesced pointer sample.
High-rate mice (1000Hz+) fire several pointermoves per frame; the
handler only records scalars and the rAF tick raycasts once per
frame against the latest pair, never once per event.

---

### pickY

```ts
pickY: number
```

Defined in: experiments/star-field/engine/types.ts:583

---

### pickRaf

```ts
pickRaf: number | null
```

Defined in: experiments/star-field/engine/types.ts:585

Non-null while a per-frame pick tick is queued — dedupes rAF arms.

---

### viewW

```ts
viewW: number
```

Defined in: experiments/star-field/engine/types.ts:594

Cached canvas box in CSS px — refreshed by `handleStarResize`. The
per-frame projection (`anchorScreenPos`/`worldScreenPos`) and
galaxy-cloud updates read these instead of `clientWidth`/
`clientHeight` so hover tracking and fades never issue a layout
read inside the render loop. 0 = not measured yet (cold path falls
back to a one-time live read).

---

### viewH

```ts
viewH: number
```

Defined in: experiments/star-field/engine/types.ts:595

---

### lastT

```ts
lastT: number
```

Defined in: experiments/star-field/engine/types.ts:597

Last tick timestamp for dt-based animation.

---

### t

```ts
t: number
```

Defined in: experiments/star-field/engine/types.ts:599

Elapsed scene time (seconds) — drives orbits/spins.

---

### predictor

```ts
predictor:
  | FrameTimePredictor
  | null;
```

Defined in: experiments/star-field/engine/types.ts:601

ML frame-time predictor — drives adaptive pixel-ratio quality.

---

### appliedQuality

```ts
appliedQuality: number
```

Defined in: experiments/star-field/engine/types.ts:603

Last quality applied to the renderer — dedupes setPixelRatio calls.

---

### hoverId

```ts
hoverId: string | null
```

Defined in: experiments/star-field/engine/types.ts:605

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

Defined in: experiments/star-field/engine/types.ts:616

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

Defined in: experiments/star-field/engine/types.ts:622

Selected body id (panel open).

---

### followId

```ts
followId: string | null
```

Defined in: experiments/star-field/engine/types.ts:630

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

Defined in: experiments/star-field/engine/types.ts:632

Lifecycle callbacks from the host.

#### Returns

`void`

---

### onProgress?

```ts
optional onProgress?: SFProgressFn;
```

Defined in: experiments/star-field/engine/types.ts:633

---

### onSelect?

```ts
optional onSelect?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:634

---

### onApproach?

```ts
optional onApproach?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:635

---

### onHover?

```ts
optional onHover?: (bodyId) => void;
```

Defined in: experiments/star-field/engine/types.ts:636

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

Defined in: experiments/star-field/engine/types.ts:645

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

Defined in: experiments/star-field/engine/types.ts:647

Fires once when a frame throws — host swaps to the 2D fallback.

#### Returns

`void`
