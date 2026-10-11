[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/star-field/starfield-engine](../README.md) / StarFieldEngine

Defined in: experiments/star-field/starfield-engine.ts:36

Owns the full star-field scene: renderer, camera rig, skybox, catalog
body graph, raycast picking, fly-to tweens and the RAF loop. The host
component reads `failed` to swap in the CSS fallback surface.

## Constructors

### Constructor

```ts
new StarFieldEngine(canvas, events?): StarFieldEngine;
```

Defined in: experiments/star-field/starfield-engine.ts:40

#### Parameters

##### canvas

`HTMLCanvasElement`

##### events?

[`SFEvents`](../../engine/state/interfaces/SFEvents.md) = `{}`

#### Returns

`StarFieldEngine`

## Accessors

### failed

#### Get Signature

```ts
get failed(): boolean;
```

Defined in: experiments/star-field/starfield-engine.ts:69

True when bootstrap bailed or threw before the scene assembled.

##### Returns

`boolean`

## Methods

### init()

```ts
init(): Promise<void>;
```

Defined in: experiments/star-field/starfield-engine.ts:49

Async bootstrap — catches throws, marks failed when the scene never
assembled (silent bailouts included), and always fires onReady so the
loader can never stick. Same contract as EarthBackground.init().

#### Returns

`Promise`\<`void`\>

***

### setReducedMotion()

```ts
setReducedMotion(reduced): void;
```

Defined in: experiments/star-field/starfield-engine.ts:78

Pause/resume the render loop for prefers-reduced-motion — the last
frame stays on screen (preserveDrawingBuffer), so pausing never
blanks the scene.

#### Parameters

##### reduced

`boolean`

#### Returns

`void`

***

### selectBody()

```ts
selectBody(id): void;
```

Defined in: experiments/star-field/starfield-engine.ts:102

Flies the camera to a body — catalog slugs resolve through the
anchors map; registry ids (`star-NNNNNN`…) resolve through the
shard index to their true heliocentric position. Called by the host
for both nav picks and canvas raycast picks — `onSelect` is only
fired by the pointer path (picking.ts) so selection never loops.

#### Parameters

##### id

`string`

Catalog body id or registry id.

#### Returns

`void`

***

### rotateView()

```ts
rotateView(dAzimuth, dPolar): void;
```

Defined in: experiments/star-field/starfield-engine.ts:146

Arrow-key orbit — rotates the camera around the controls target in
screen-intuitive steps: left/right change azimuth, up/down change
polar (clamped off the poles). Pure spherical math on the offset
vector — no three types needed, and any running fly-to is cancelled
so manual control wins.

#### Parameters

##### dAzimuth

`number`

Azimuth delta in radians (left = -, right = +).

##### dPolar

`number`

Polar delta in radians (down = -, up = +).

#### Returns

`void`

***

### deselect()

```ts
deselect(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:155

Releases the selection without moving the camera — stops the
per-frame orbit-follow when the dossier panel closes, so the chart
is no longer glued to the body the user dismissed.

#### Returns

`void`

***

### flyHome()

```ts
flyHome(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:160

Returns the camera to the overview pose — the whole-chart vantage.

#### Returns

`void`

***

### takeScreenshot()

```ts
takeScreenshot(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:173

Downloads the current frame as a PNG.

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:178

Tears down listeners, RAF, controls and the renderer.

#### Returns

`void`
