[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/runtime/state](../README.md) / EarthState

Defined in: experiments/earth-playground/earth/runtime/state.ts:115

The single mutable bag for the whole engine — every async-created GPU
handle is nullable because bootstrap fills them progressively and a
mid-boot dispose must see exactly what's live.

## Properties

### animId

```ts
animId: number | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:117

RAF handle for the render loop; null while paused/reduced-motion.

---

### disposed

```ts
disposed: boolean
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:120

Set by destroy(); checked after every await so a mid-load dispose
aborts scene assembly without touching the GPU again.

---

### reduced

```ts
reduced: boolean
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:122

Mirrors the store's reduced-motion flag; freezes the loop.

---

### failed

```ts
failed: boolean
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:125

Set when bootstrap threw or bailed before the scene assembled — the
host swaps in the CSS fallback surface instead of a dead canvas.

---

### isDarkTheme

```ts
isDarkTheme: boolean
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:127

UI theme flag — stored for the sun-rotation feature (not yet wired).

---

### onReady

```ts
onReady: (() => void) | null | undefined;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:128

---

### onProgress

```ts
onProgress: EarthProgressFn | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:129

---

### canvas

```ts
canvas: HTMLCanvasElement | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:130

---

### renderer

```ts
renderer: WebGPURenderer | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:131

---

### scene

```ts
scene: Scene<Object3DEventMap> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:132

---

### camera

```ts
camera: PerspectiveCamera | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:133

---

### controls

```ts
controls: OrbitControls | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:134

---

### pipeline

```ts
pipeline: RenderPipeline | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:135

---

### earth

```ts
earth: Group<Object3DEventMap> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:136

---

### moon

```ts
moon: LOD<Object3DEventMap> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:137

---

### sunMesh

```ts
sunMesh:
  | Mesh<BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>, Material<MaterialEventMap> | Material<MaterialEventMap>[], Object3DEventMap>
  | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:138

---

### sunLight

```ts
sunLight: DirectionalLight | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:139

---

### loader

```ts
loader: TextureLoader | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:140

---

### cloudsMesh

```ts
cloudsMesh:
  | Mesh<BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>, Material<MaterialEventMap> | Material<MaterialEventMap>[], Object3DEventMap>
  | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:141

---

### sunDirU

```ts
sunDirU: UniformNode<'vec3', Vector3> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:142

---

### moonPosU

```ts
moonPosU: UniformNode<'vec3', Vector3> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:143

---

### cgUniforms

```ts
cgUniforms: Record<string, UniformNode<'float', number>> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:144

---

### caUniforms

```ts
caUniforms: Record<string, UniformNode<'float', number>> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:145

---

### vigUniforms

```ts
vigUniforms: Record<string, UniformNode<'float', number>> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:146

---

### filmU

```ts
filmU: UniformNode<'float', number> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:147

---

### bloomPass

```ts
bloomPass: BloomNode | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:148

---

### earthMatUniforms

```ts
earthMatUniforms: Record<string, UniformNode<'float', number>> | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:149

---

### sun

```ts
sun: EarthSunState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:150

---

### moonCfg

```ts
moonCfg: EarthMoonState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:151

---

### earthSpin

```ts
earthSpin: EarthSpinState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:152

---

### bloom

```ts
bloom: EarthBloomState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:153

---

### ca

```ts
ca: EarthCaState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:154

---

### vig

```ts
vig: EarthVigState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:155

---

### film

```ts
film: EarthFilmState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:156

---

### cg

```ts
cg: EarthGradeState | null
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:157

---

### render

```ts
render: object
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:158

#### resolutionScale

```ts
resolutionScale: number
```

#### predictor

```ts
predictor: FrameTimePredictor
```

ML frame-time predictor — adaptive pixel-ratio quality driver.

#### lastFrameMs

```ts
lastFrameMs: number
```

Timestamp of the previous tick — predictor's frame-delta input.

#### appliedQuality

```ts
appliedQuality: number
```

Last quality applied to the renderer — dedupes setPixelRatio.

---

### onResize

```ts
onResize: (() => void) | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:168

Stable resize-listener identity so destroy() can removeEventListener.
