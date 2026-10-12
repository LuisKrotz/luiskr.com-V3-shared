[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/star-field/starfield-engine](../README.md) / StarFieldEngine

Defined in: experiments/star-field/starfield-engine.ts:40

Owns the full star-field scene: renderer, camera rig, skybox, catalog
body graph, raycast picking, fly-to tweens and the RAF loop. The host
component reads `failed` to swap in the CSS fallback surface.

## Constructors

### Constructor

```ts
new StarFieldEngine(canvas, events?): StarFieldEngine;
```

Defined in: experiments/star-field/starfield-engine.ts:44

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

Defined in: experiments/star-field/starfield-engine.ts:73

True when bootstrap bailed or threw before the scene assembled.

##### Returns

`boolean`

## Methods

### init()

```ts
init(): Promise<void>;
```

Defined in: experiments/star-field/starfield-engine.ts:53

Async bootstrap — catches throws, marks failed when the scene never
assembled (silent bailouts included), and always fires onReady so the
loader can never stick. Same contract as EarthBackground.init().

#### Returns

`Promise`\<`void`\>

---

### setReducedMotion()

```ts
setReducedMotion(reduced): void;
```

Defined in: experiments/star-field/starfield-engine.ts:82

Pause/resume the render loop for prefers-reduced-motion — the last
frame stays on screen (preserveDrawingBuffer), so pausing never
blanks the scene.

#### Parameters

##### reduced

`boolean`

#### Returns

`void`

---

### selectBody()

```ts
selectBody(id): void;
```

Defined in: experiments/star-field/starfield-engine.ts:106

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

---

### setHint()

```ts
setHint(id, rec?): void;
```

Defined in: experiments/star-field/starfield-engine.ts:171

Navigator-hover position hint — arms the hint record for the row
under the pointer/focus so `trackHover` reports the body's
projected (edge-clamped) screen position every tick: the hint
locates the object at any zoom level, on- or off-screen. Catalog
ids store their anchor (live world position); registry rows store
their shard record so the static shard point resolves in the
pinned frame. Also echoes `onHover` so the tooltip label +
aria-live announce populate the same way canvas hover does.
Pass null to clear.

#### Parameters

##### id

`string` \| `null`

Hovered body id, or null to clear the hint.

##### rec?

[`SFRegistryRecord`](../../engine/registry/interfaces/SFRegistryRecord.md)

Registry record when `id` is a shard id (star-NNNNNN…).

#### Returns

`void`

---

### rotateView()

```ts
rotateView(dAzimuth, dPolar): void;
```

Defined in: experiments/star-field/starfield-engine.ts:200

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

---

### deselect()

```ts
deselect(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:209

Releases the selection without moving the camera — stops the
per-frame orbit-follow when the dossier panel closes, so the chart
is no longer glued to the body the user dismissed.

#### Returns

`void`

---

### flyHome()

```ts
flyHome(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:221

Overview — glides to the solar-system vantage: the camera tracks the
Sun anchor's live position (it rides the rotating galactic disc, so a
fixed target would strand the view on empty space) at the HOME
standoff, which frames the tier out to the Kuiper belt. Falls back
to the scene origin only while anchors are unavailable.

#### Returns

`void`

---

### takeScreenshot()

```ts
takeScreenshot(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:244

Downloads the current frame as a PNG.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: experiments/star-field/starfield-engine.ts:249

Tears down listeners, RAF, controls and the renderer.

#### Returns

`void`
