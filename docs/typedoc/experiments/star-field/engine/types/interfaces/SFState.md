[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFState

Defined in: experiments/star-field/engine/types.ts:270

Mutable engine state — one bag threaded through bootstrap/frame/fly so
every stage shares renderer, scene graph, tweens and dispose flags
without a class field soup.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement | null;
```

Defined in: experiments/star-field/engine/types.ts:272

Persistent canvas the host owns (replaced on renderer retry).

***

### renderer

```ts
renderer: 
  | {
  render: unknown;
  dispose: void;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:274

three.js WebGPURenderer (WebGPU or forced-WebGL backend).

***

### scene

```ts
scene: Scene<Object3DEventMap> | null;
```

Defined in: experiments/star-field/engine/types.ts:275

***

### camera

```ts
camera: PerspectiveCamera | null;
```

Defined in: experiments/star-field/engine/types.ts:276

***

### controls

```ts
controls: OrbitControls | null;
```

Defined in: experiments/star-field/engine/types.ts:277

***

### nodes

```ts
nodes: Map<string, SFNode>;
```

Defined in: experiments/star-field/engine/types.ts:279

id → runtime body node record.

***

### anchors

```ts
anchors: Map<string, Object3D<Object3DEventMap>>;
```

Defined in: experiments/star-field/engine/types.ts:281

id → center Object3D the camera targets (equals mesh for most).

***

### pickables

```ts
pickables: Object3D<Object3DEventMap>[];
```

Defined in: experiments/star-field/engine/types.ts:283

Pickable meshes for raycasting.

***

### approached

```ts
approached: Set<string>;
```

Defined in: experiments/star-field/engine/types.ts:285

ids whose dossier was already prefetched — approach fires once.

***

### starCloud

```ts
starCloud: Object3D<Object3DEventMap> | null;
```

Defined in: experiments/star-field/engine/types.ts:291

Real-star cloud Points (HYG catalogue field on the Milky Way disc)
— set by star-cloud.ts once the packed binary decodes; kept on
state so destroy() can dispose its geometry/material.

***

### starCloudLoading

```ts
starCloudLoading: boolean;
```

Defined in: experiments/star-field/engine/types.ts:293

Guard flag — the star-cloud fetch fires only once per boot.

***

### fly

```ts
fly: SFFly | null;
```

Defined in: experiments/star-field/engine/types.ts:295

Active fly-to tween or null when controls are free.

***

### animId

```ts
animId: number | null;
```

Defined in: experiments/star-field/engine/types.ts:297

Active RAF id.

***

### disposed

```ts
disposed: boolean;
```

Defined in: experiments/star-field/engine/types.ts:299

Set by destroy() — every async stage checks before continuing.

***

### failed

```ts
failed: boolean;
```

Defined in: experiments/star-field/engine/types.ts:301

Bootstrap failed or bailed — host swaps in the CSS fallback.

***

### reduced

```ts
reduced: boolean;
```

Defined in: experiments/star-field/engine/types.ts:303

Reduced-motion flag — pauses the RAF loop.

***

### onResize

```ts
onResize: (() => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:305

Resize listener to detach on destroy.

***

### onPointerDown

```ts
onPointerDown: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:307

Pointer listeners to detach on destroy.

***

### onPointerMove

```ts
onPointerMove: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:308

***

### onPointerUp

```ts
onPointerUp: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:309

***

### onWheel

```ts
onWheel: ((e) => void) | null;
```

Defined in: experiments/star-field/engine/types.ts:310

***

### downXY

```ts
downXY: 
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:312

last pointer-down position for click-vs-drag discrimination.

***

### lastT

```ts
lastT: number;
```

Defined in: experiments/star-field/engine/types.ts:314

Last tick timestamp for dt-based animation.

***

### t

```ts
t: number;
```

Defined in: experiments/star-field/engine/types.ts:316

Elapsed scene time (seconds) — drives orbits/spins.

***

### hoverId

```ts
hoverId: string | null;
```

Defined in: experiments/star-field/engine/types.ts:318

Camera hover state — last picked body id for the HUD.

***

### selectedId

```ts
selectedId: string | null;
```

Defined in: experiments/star-field/engine/types.ts:320

Selected body id (panel open).

***

### onReady?

```ts
optional onReady?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:322

Lifecycle callbacks from the host.

#### Returns

`void`

***

### onProgress?

```ts
optional onProgress?: SFProgressFn;
```

Defined in: experiments/star-field/engine/types.ts:323

***

### onSelect?

```ts
optional onSelect?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:324

***

### onApproach?

```ts
optional onApproach?: SFBodyFn;
```

Defined in: experiments/star-field/engine/types.ts:325

***

### onHover?

```ts
optional onHover?: (bodyId) => void;
```

Defined in: experiments/star-field/engine/types.ts:326

#### Parameters

##### bodyId

`string` \| `null`

#### Returns

`void`

***

### onHoverMove?

```ts
optional onHoverMove?: (bodyId, x, y) => void;
```

Defined in: experiments/star-field/engine/types.ts:332

Per-frame hover tracking — fires every tick while a body is hovered
with its projected canvas-space pixel position, so the tooltip and
its leader line follow orbiting bodies without DOM thrash.

#### Parameters

##### bodyId

`string`

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### onLost?

```ts
optional onLost?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:334

Fires once when a frame throws — host swaps to the 2D fallback.

#### Returns

`void`
