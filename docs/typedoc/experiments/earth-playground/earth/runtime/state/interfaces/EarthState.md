[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/runtime/state](../README.md) / EarthState

Defined in: experiments/earth-playground/earth/runtime/state.ts:114

The single mutable bag for the whole engine — every async-created GPU
handle is nullable because bootstrap fills them progressively and a
mid-boot dispose must see exactly what's live.

## Properties

### animId

```ts
animId: number | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:116

RAF handle for the render loop; null while paused/reduced-motion.

***

### disposed

```ts
disposed: boolean;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:119

Set by destroy(); checked after every await so a mid-load dispose
 aborts scene assembly without touching the GPU again.

***

### reduced

```ts
reduced: boolean;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:121

Mirrors the store's reduced-motion flag; freezes the loop.

***

### failed

```ts
failed: boolean;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:124

Set when bootstrap threw or bailed before the scene assembled — the
 host swaps in the CSS fallback surface instead of a dead canvas.

***

### isDarkTheme

```ts
isDarkTheme: boolean;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:126

UI theme flag — stored for the sun-rotation feature (not yet wired).

***

### onReady

```ts
onReady: (() => void) | null | undefined;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:127

***

### onProgress

```ts
onProgress: EarthProgressFn | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:128

***

### canvas

```ts
canvas: HTMLCanvasElement | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:129

***

### renderer

```ts
renderer: WebGPURenderer | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:130

***

### scene

```ts
scene: Scene<Object3DEventMap> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:131

***

### camera

```ts
camera: PerspectiveCamera | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:132

***

### controls

```ts
controls: OrbitControls | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:133

***

### pipeline

```ts
pipeline: RenderPipeline | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:134

***

### earth

```ts
earth: Group<Object3DEventMap> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:135

***

### moon

```ts
moon: LOD<Object3DEventMap> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:136

***

### sunMesh

```ts
sunMesh: 
  | Mesh<BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>, Material<MaterialEventMap> | Material<MaterialEventMap>[], Object3DEventMap>
  | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:137

***

### sunLight

```ts
sunLight: DirectionalLight | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:138

***

### loader

```ts
loader: TextureLoader | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:139

***

### cloudsMesh

```ts
cloudsMesh: 
  | Mesh<BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>, Material<MaterialEventMap> | Material<MaterialEventMap>[], Object3DEventMap>
  | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:140

***

### sunDirU

```ts
sunDirU: UniformNode<"vec3", Vector3> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:141

***

### moonPosU

```ts
moonPosU: UniformNode<"vec3", Vector3> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:142

***

### cgUniforms

```ts
cgUniforms: Record<string, UniformNode<"float", number>> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:143

***

### caUniforms

```ts
caUniforms: Record<string, UniformNode<"float", number>> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:144

***

### vigUniforms

```ts
vigUniforms: Record<string, UniformNode<"float", number>> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:145

***

### filmU

```ts
filmU: UniformNode<"float", number> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:146

***

### bloomPass

```ts
bloomPass: BloomNode | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:147

***

### earthMatUniforms

```ts
earthMatUniforms: Record<string, UniformNode<"float", number>> | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:148

***

### sun

```ts
sun: EarthSunState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:149

***

### moonCfg

```ts
moonCfg: EarthMoonState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:150

***

### earthSpin

```ts
earthSpin: EarthSpinState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:151

***

### bloom

```ts
bloom: EarthBloomState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:152

***

### ca

```ts
ca: EarthCaState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:153

***

### vig

```ts
vig: EarthVigState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:154

***

### film

```ts
film: EarthFilmState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:155

***

### cg

```ts
cg: EarthGradeState | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:156

***

### render

```ts
render: object;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:157

#### resolutionScale

```ts
resolutionScale: number;
```

***

### onResize

```ts
onResize: (() => void) | null;
```

Defined in: experiments/earth-playground/earth/runtime/state.ts:159

Stable resize-listener identity so destroy() can removeEventListener.
