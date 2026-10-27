[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/close-button](../README.md) / CloseButtonWebGL

Defined in: core/utils/canvas/widgets/close-button.ts:32

WebGL Animated Close Button
Features:

- Liquid fills slower and procedural rising bubbles with specular highlights
- Rotating X during hover/liquid animation
- Razor-sharp vector anti-aliased X line strokes (zero blur)
- Kinetic shockwave ripple on click
- Resilient Canvas 2D fallback

## Constructors

### Constructor

```ts
new CloseButtonWebGL(canvas, onClickAction?): CloseButtonWebGL;
```

Defined in: core/utils/canvas/widgets/close-button.ts:89

#### Parameters

##### canvas

`HTMLCanvasElement`

overlay canvas inside the host
<button>; pointer events are bound to the parent button, not the canvas

##### onClickAction?

(() => `void`) \| `null`

forwarded after each click (the
shockwave always fires; the host's close handler runs alongside)

#### Returns

`CloseButtonWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/canvas/widgets/close-button.ts:33

---

### onClickAction

```ts
onClickAction: (() => void) | null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:34

---

### width

```ts
width: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:35

---

### height

```ts
height: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:36

---

### isHovered

```ts
isHovered: boolean
```

Defined in: core/utils/canvas/widgets/close-button.ts:37

---

### hoverLevel

```ts
hoverLevel: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:38

---

### drawProgress

```ts
drawProgress: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:39

---

### rotation

```ts
rotation: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:40

---

### clickTime

```ts
clickTime: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:41

---

### useWebGL

```ts
useWebGL: boolean
```

Defined in: core/utils/canvas/widgets/close-button.ts:42

---

### animId

```ts
animId: number | null
```

Defined in: core/utils/canvas/widgets/close-button.ts:43

---

### startTime

```ts
startTime: number
```

Defined in: core/utils/canvas/widgets/close-button.ts:46

---

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:47

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:48

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:49

---

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:50

---

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:51

---

### uLiquid

```ts
uLiquid: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:52

---

### uDraw

```ts
uDraw: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:53

---

### uRot

```ts
uRot: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:54

---

### uClickTime

```ts
uClickTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:55

---

### uHc

```ts
uHc: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:56

---

### uDark

```ts
uDark: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:57

---

### aPos

```ts
aPos: number = 0
```

Defined in: core/utils/canvas/widgets/close-button.ts:58

---

### \_ro

```ts
_ro: ResizeObserver | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:59

---

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:60

---

### \_purged

```ts
_purged: boolean = false
```

Defined in: core/utils/canvas/widgets/close-button.ts:61

---

### \_wasm

```ts
_wasm:
  | WidgetHandle
  | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:63

Live WebGPU wasm handle — the preferred backend when it mounts.

---

### \_wasmFailed

```ts
_wasmFailed: boolean = false
```

Defined in: core/utils/canvas/widgets/close-button.ts:65

Latch — a failed wasm mount never retries on this instance.

---

### \_wasmPending

```ts
_wasmPending: boolean = false
```

Defined in: core/utils/canvas/widgets/close-button.ts:67

In-flight mount — restore() must not double-mount on re-entry.

---

### \_wasmT

```ts
_wasmT: number = 0
```

Defined in: core/utils/canvas/widgets/close-button.ts:69

Last wasm-painted t — frame(dt) consumes deltas, not absolutes.

---

### boundTarget

```ts
boundTarget: Element | null = null;
```

Defined in: core/utils/canvas/widgets/close-button.ts:70

## Methods

### \_frameTick()

```ts
_frameTick(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:45

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

#### Returns

`void`

---

### onMouseEnter()

```ts
onMouseEnter(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:71

#### Returns

`void`

---

### onMouseLeave()

```ts
onMouseLeave(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:74

#### Returns

`void`

---

### onClick()

```ts
onClick(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:77

#### Returns

`void`

---

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:126

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

#### Returns

`void`

---

### initWebGL()

```ts
initWebGL(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:132

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.

#### Returns

`void`

---

### bindEvents()

```ts
bindEvents(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:141

Wires hover + click on the parent button (not the canvas) — the canvas
is a decorative overlay so interaction belongs to the semantic button.
boundTarget is remembered for destroy().

#### Returns

`void`

---

### setHover()

```ts
setHover(hovered): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:159

Updates hover state — the shader renders the hover accent when true.

#### Parameters

##### hovered

`boolean`

#### Returns

`void`

---

### triggerClick()

```ts
triggerClick(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:173

Records the click timestamp — the shader reads u_click_time to expand
the shockwave ring over its 0.4s window. The onClickAction callback is
invoked separately by the click handler, not here.

#### Returns

`void`

---

### setReducedMotion()

```ts
setReducedMotion(isReduced): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:189

Applies prefers-reduced-motion: swaps the animation loop for one
static frame render, or restarts the loop when motion is re-allowed.

#### Parameters

##### isReduced

`boolean`

#### Returns

`void`

---

### \_renderStatic()

```ts
_renderStatic(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:201

Draws one settled frame with the X fully drawn — used under reduced
motion or when the loop is stopped.

#### Returns

`void`

---

### animate()

```ts
animate(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:207

Starts the requestAnimationFrame render loop (skipped under reduced motion).

#### Returns

`void`

---

### \_renderWebGL()

```ts
_renderWebGL(now): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:213

Per-frame WebGL render: updates time/hover uniforms and draws the quad.

#### Parameters

##### now

`number`

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:222

webglPool hook — offscreen: stops the loop and force-loses the GL
context so offscreen widgets hold no context slots; restore()
rebuilds the program on re-entry.

#### Returns

`void`

---

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:247

Recreates the GL context + program and resumes the loop after a purge.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/close-button.ts:279

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
