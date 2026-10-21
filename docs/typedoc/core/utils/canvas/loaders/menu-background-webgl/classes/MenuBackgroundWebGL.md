[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/menu-background-webgl](../README.md) / MenuBackgroundWebGL

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:44

WebGL animated background for the mobile burger menu — "Membrane" concept.
Renders fine organic monochrome contour lines (domain-warped fbm isolines)
that slowly breathe, inspired by Iris van Herpen's material studies.
The field materialises from the centre as `u_reveal` eases toward 1 and
dissolves back on release(). Line colour is sampled from --menu-ink /
--menu-ink-2 so it always matches the active theme — monochrome in dark,
water-blues in light; falls back to a CSS moiré layer when WebGL is
unavailable or the shader fails to compile/link.

## Constructors

### Constructor

```ts
new MenuBackgroundWebGL(canvas): MenuBackgroundWebGL;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:87

#### Parameters

##### canvas

`HTMLCanvasElement`

#### Returns

`MenuBackgroundWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:50

#### Param

**canvas**

fullscreen canvas behind the menu
overlay's content; owned by AppNav which calls start/release/stop
with the menu's open/close lifecycle

---

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:51

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:52

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:53

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:54

---

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:55

---

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:56

---

### uColor

```ts
uColor: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:57

---

### uColor2

```ts
uColor2: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:58

---

### uReveal

```ts
uReveal: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:59

---

### uAlpha

```ts
uAlpha: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:60

---

### width

```ts
width: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:61

---

### height

```ts
height: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:62

---

### isActive

```ts
isActive: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:63

---

### \_ro

```ts
_ro: ResizeObserver | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:64

---

### useWebGL

```ts
useWebGL: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:65

---

### \_reveal

```ts
_reveal: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:66

---

### \_revealTarget

```ts
_revealTarget: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:67

---

### \_revealFrom

```ts
_revealFrom: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:68

---

### \_revealT0

```ts
_revealT0: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:69

---

### \_revealDur

```ts
_revealDur: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:70

---

### \_lastFrame

```ts
_lastFrame: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:71

---

### \_elapsed

```ts
_elapsed: number = 0
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:72

---

### \_color

```ts
_color: number[];
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:73

---

### \_color2

```ts
_color2: number[];
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:74

---

### \_darkAtStart

```ts
_darkAtStart: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:75

---

### \_hasDeriv

```ts
_hasDeriv: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:76

---

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:77

---

### \_purged

```ts
_purged: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:78

---

### \_wantsActive

```ts
_wantsActive: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:79

---

### \_wasm

```ts
_wasm:
  | WidgetHandle
  | null = null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:81

Live WebGPU wasm handle — the preferred backend when it mounts.

---

### \_wasmFailed

```ts
_wasmFailed: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:83

Latch — a failed wasm mount never retries on this instance.

---

### \_wasmPending

```ts
_wasmPending: boolean = false
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:85

In-flight mount — restore() must not double-mount on re-entry.

## Methods

### \_initGL()

```ts
_initGL(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:100

Creates the WebGL context + shader program; falls back to the CSS/DOM path on failure.

#### Returns

`void`

---

### \_tryWasm()

```ts
_tryWasm(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:122

Attempts the WebGPU wasm menu background (~50KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own reveal ease +
loop, so the bridge only initializes the surface. On any failure
the WebGL path runs exactly as before.

#### Returns

`void`

---

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:168

Switches to the non-WebGL path (CSS moiré layer) — used on context loss or init failure.

#### Returns

`void`

---

### \_releaseGL()

```ts
_releaseGL(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:174

Frees the quad program/buffer and force-loses the context (listener detached first).

#### Returns

`void`

---

### \_parseCssColor()

```ts
_parseCssColor(str): number[] | null;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:184

Parses a CSS colour string (#rgb, #rrggbb, rgb(), rgba()) into a
normalized [r,g,b] float triple for the shader uniform.

#### Parameters

##### str

`string`

#### Returns

`number`[] \| `null`

---

### \_sampleTheme()

```ts
_sampleTheme(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:190

Samples --menu-ink / --menu-ink-2 into the shader ink colors.

#### Returns

`void`

---

### start()

```ts
start(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:196

Begins the render loop on menu open (see menu-background-loop.ts).

#### Returns

`void`

---

### release()

```ts
release(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:206

Eases the reveal back to 0 so the field dissolves on menu close.

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:218

webglPool hook — canvas scrolled offscreen (or the browser trimmed
contexts): tears the GL resources down entirely instead of merely
pausing, freeing the context slot for other surfaces. restore()
recreates them on re-entry.

#### Returns

`void`

---

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:238

Recreates the GL context + restarts the loop after an offscreen purge.

#### Returns

`void`

---

### \_animateReveal()

```ts
_animateReveal(target, dur): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:257

Starts (or restarts mid-flight) a timed reveal ease.

#### Parameters

##### target

`number`

##### dur

`number`

#### Returns

`void`

---

### \_tickReveal()

```ts
_tickReveal(now): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:263

Advances the reveal ease to the current timestamp.

#### Parameters

##### now

`number`

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:269

Stops the rAF loop.

#### Returns

`void`

---

### \_handleResize()

```ts
_handleResize(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:275

Syncs buffer size + u_res uniform with the viewport.

#### Returns

`void`

---

### \_loop()

```ts
_loop(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:281

rAF callback — draws the animated contour field each frame.

#### Returns

`void`

---

### \_renderFrame()

```ts
_renderFrame(staticTime?): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:287

Renders the noise field; a fixed staticTime renders one settled frame.

#### Parameters

##### staticTime?

`number` \| `null`

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/loaders/menu-background-webgl.ts:293

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
