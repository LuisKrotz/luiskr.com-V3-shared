[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop-webgl](../README.md) / PageBackdropWebGL

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:40

WebGL page backdrop. Construct once at app boot with the element the
canvas should mount into (the document body); `destroy()` on shell
teardown. Registers with the shared webglPool so GPU pressure can
purge/restore it and user actions retry a fallen-back instance.

## Constructors

### Constructor

```ts
new PageBackdropWebGL(container): PageBackdropWebGL;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:90

#### Parameters

##### container

`HTMLElement`

element that receives the canvas as its first child

#### Returns

`PageBackdropWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:42

Fullscreen canvas — created by the constructor, parked as the container's first child.

---

### container

```ts
container: HTMLElement
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:44

Element the canvas mounts into (document.body in production).

---

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:45

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:46

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:47

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:48

---

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:51

---

### uRes

```ts
uRes: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:52

---

### uBase

```ts
uBase: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:53

---

### uCol

```ts
uCol: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:54

---

### uGain

```ts
uGain: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:55

---

### uKey

```ts
uKey: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:56

---

### uShade

```ts
uShade: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:57

---

### width

```ts
width: number = 0
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:59

Backing-store size in device pixels.

---

### height

```ts
height: number = 0
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:60

---

### isActive

```ts
isActive: boolean = false
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:61

---

### useWebGL

```ts
useWebGL: boolean = false
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:62

---

### \_lastFrame

```ts
_lastFrame: number = 0
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:63

---

### \_elapsed

```ts
_elapsed: number = 0
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:65

Field clock in seconds — accumulates clamped frame deltas.

---

### \_base

```ts
_base: Float32Array<ArrayBuffer>
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:67

Surface colour (`--bg-primary`) as an RGB float triple.

---

### \_colors

```ts
_colors: Float32Array<ArrayBuffer>
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:69

Seven field hues, flat RGB — the `u_col` uniform array payload.

---

### \_key

```ts
_key: Float32Array<ArrayBuffer>
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:71

Key light — specular RGB + theme gain packed for one `uniform4fv`.

---

### \_shade

```ts
_shade: Float32Array<ArrayBuffer>
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:73

Counter-shade — ink RGB + theme gain packed for one `uniform4fv`.

---

### \_gain

```ts
_gain: number = 1
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:75

Lobe strength multiplier — light 1, dark ember gain.

---

### \_darkAtStart

```ts
_darkAtStart: boolean = false
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:76

---

### \_paletteDirty

```ts
_paletteDirty: boolean = true
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:78

Upload gates — set by sampleTheme/handleResize, cleared by the draw.

---

### \_resDirty

```ts
_resDirty: boolean = true
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:79

---

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:80

---

### \_purged

```ts
_purged: boolean = false
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:81

---

### \_rootObserver

```ts
_rootObserver: MutationObserver | null = null;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:83

Watches the root class list for high-contrast flips.

## Methods

### \_frameTick()

```ts
_frameTick(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:50

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

#### Returns

`void`

---

### \_onResize()

```ts
_onResize(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:85

Bound passive resize handler — allocated once.

#### Returns

`void`

---

### \_initGL()

```ts
_initGL(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:120

Creates the WebGL context + lobe program; falls back to the CSS lobes on failure.

#### Returns

`void`

---

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:125

Switches to the CSS lobe path — context loss, init failure, bad palette.

#### Returns

`void`

---

### \_releaseGL()

```ts
_releaseGL(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:130

Frees the quad program/buffer and force-loses the context (listener detached first).

#### Returns

`void`

---

### \_sampleTheme()

```ts
_sampleTheme(): boolean;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:140

Samples `--field-*` + `--bg-primary` + specular/ink into the uniform buffers.

#### Returns

`boolean`

true when the surface colour parsed

---

### \_onRootClass()

```ts
_onRootClass(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:149

Root class flip — high contrast pauses the field (the HC surface is
flat by contract); leaving it resumes. Dark/light flips are caught
per frame by renderFrame, so only the HC edge needs the observer.

#### Returns

`void`

---

### start()

```ts
start(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:162

Starts the field (see page-backdrop/loop.ts).

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:167

Stops the loop and clears the document marker.

#### Returns

`void`

---

### \_handleResize()

```ts
_handleResize(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:172

Syncs the backing store with the viewport.

#### Returns

`void`

---

### \_loop()

```ts
_loop(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:177

Pooled rAF callback — draws the field each frame.

#### Returns

`void`

---

### \_renderFrame()

```ts
_renderFrame(staticTime?): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:185

Draws one frame; a fixed `staticTime` renders one settled pose.

#### Parameters

##### staticTime?

`number` \| `null`

field time for a static frame

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:193

webglPool hook — GPU pressure or an offscreen canvas: tears the GL
resources down and clears the marker so the CSS lobes cover the gap.

#### Returns

`void`

---

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:206

webglPool hook — recreates the context + restarts after a purge.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/loaders/page-backdrop-webgl.ts:219

Releases everything — context, listeners, observer, the canvas itself.

#### Returns

`void`
