[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/burger-button-webgl](../README.md) / BurgerButtonWebGL

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:33

WebGL animated hamburger icon for the mobile burger button.
Renders three sleek horizontal lines with rounded pill caps and subtle wave animation.
Adapts to the current theme: dark icon in light mode, bright icon in dark mode.

## Constructors

### Constructor

```ts
new BurgerButtonWebGL(canvas, onClick?): BurgerButtonWebGL;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:65

#### Parameters

##### canvas

`HTMLCanvasElement`

##### onClick?

`EventListener` \| `null`

#### Returns

`BurgerButtonWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:40

#### Param

**canvas**

icon canvas inside the nav burger button

#### Param

**onClick**

optional click handler (the canvas becomes
interactive — cursor:pointer + click listener); pass null when the
parent button already handles clicks

---

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:41

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:42

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:43

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:44

---

### startTime

```ts
startTime: number
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:45

---

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:46

---

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:47

---

### uDark

```ts
uDark: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:48

---

### \_onClick

```ts
_onClick: EventListener | null
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:49

---

### \_onKeyDown

```ts
_onKeyDown: ((e) => void) | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:50

---

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:51

---

### \_onResize

```ts
_onResize: () => void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:52

#### Returns

`void`

---

### \_purged

```ts
_purged: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:53

---

### \_hasDeriv

```ts
_hasDeriv: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:54

---

### useWebGL

```ts
useWebGL: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:55

---

### \_wasm

```ts
_wasm:
  | WidgetHandle
  | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:57

Live WebGPU wasm handle — the preferred backend when it mounts.

---

### \_wasmFailed

```ts
_wasmFailed: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:59

Latch — a failed wasm mount never retries on this instance.

---

### \_wasmPending

```ts
_wasmPending: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:61

In-flight mount — restore() must not double-mount on re-entry.

---

### \_wasmT

```ts
_wasmT: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:63

Last wasm-painted t — frame(dt) consumes deltas, not absolutes.

## Methods

### \_tryWasm()

```ts
_tryWasm(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:118

Attempts the WebGPU wasm burger (~50KB artifact, own GPUDevice).
MANUAL drive: this class keeps its own loop/resize logic, so the
bridge only initializes the surface — state setters and frame(dt)
are forwarded by the existing draw path. On any failure the WebGL
path runs exactly as before; on success the canvas gets a webgpu
context (which is mutually exclusive with the webgl one, so the
mount MUST settle before _initGLReal touches getContext).

#### Returns

`void`

---

### \_initGL()

```ts
_initGL(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:168

Creates the WebGL context + shader program; falls back to the CSS/DOM path on failure.

#### Returns

`void`

---

### \_initGLReal()

```ts
_initGLReal(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:186

The synchronous WebGL bootstrap — ran directly on no-WebGPU browsers and after a wasm mount failure.

#### Returns

`void`

---

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:246

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

#### Returns

`void`

---

### \_checkResize()

```ts
_checkResize(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:273

Re-syncs the drawing buffer to the canvas's CSS box × devicePixelRatio
(capped at 2). Only reallocates when the rounded size actually changed,
and repaints one frame immediately when the RAF loop isn't running —
in reduced-motion static mode a resize would otherwise leave the
cleared buffer blank until the next state change.

#### Returns

`void`

---

### \_start()

```ts
_start(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:311

Chooses reduced-motion static render vs the rAF loop.

#### Returns

`void`

---

### \_drawFrame()

```ts
_drawFrame(t): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:340

Renders one frame at time t (seconds) — shared by the RAF loop and the
static reduced-motion path. u_dark is re-evaluated per frame from the
live DOM classes (dark theme OR nav-on-dark over the contact band) so
the icon recolors instantly on theme/scroll changes with no listener.

#### Parameters

##### t

`number`

seconds since construction

#### Returns

`void`

---

### \_loop()

```ts
_loop(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:386

rAF callback — repaints each frame while running.

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:399

webglPool hook — offscreen: stops the loop and releases the GL
context entirely; restore() rebuilds it on re-entry so offscreen
widgets never hold context slots.

#### Returns

`void`

---

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:424

Recreates the GL context and resumes the loop after an offscreen purge.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:452

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
