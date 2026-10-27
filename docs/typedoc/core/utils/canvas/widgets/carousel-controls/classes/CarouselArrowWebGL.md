[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/carousel-controls](../README.md) / CarouselArrowWebGL

Defined in: core/utils/canvas/widgets/carousel-controls.ts:40

WebGL Carousel Arrow Controls with Circular Loading Progress & Gestural Microinteractions

- Prev button: Swipe-left gesture (tablet card outline + hand pointing left + arrow) with expanding kinetic ripples
- Next button: Swipe-right gesture (tablet card outline + hand pointing right + forward kinetic arrow burst)
- Circular WebGL loading ring with glowing leading particle head synchronized to autoplay timer
- Normalized coordinate space [-1.0 .. 1.0] scaling to all screen sizes without clipping
- Full Canvas 2D fallback

## Constructors

### Constructor

```ts
new CarouselArrowWebGL(
   canvas,
   type?,
   onAction?
): CarouselArrowWebGL;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:66

#### Parameters

##### canvas

`HTMLCanvasElement`

##### type?

`string` = `ARROW_TYPES.NEXT`

##### onAction?

(() => `void`) \| `null`

#### Returns

`CarouselArrowWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:41

---

### type

```ts
type: string
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:42

---

### onAction

```ts
onAction: (() => void) | null;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:43

---

### width

```ts
width: number = 44
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:44

---

### height

```ts
height: number = 44
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:45

---

### dpr

```ts
dpr: number = 2
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:46

---

### progress

```ts
progress: number = 0
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:47

---

### isHovered

```ts
isHovered: boolean = false
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:48

---

### hoverLevel

```ts
hoverLevel: number = 0.0
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:49

---

### isPlaying

```ts
isPlaying: boolean = true
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:50

---

### clickTime

```ts
clickTime: number = -10.0
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:51

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:52

---

### startTime

```ts
startTime: number
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:55

---

### ctx

```ts
ctx: CanvasRenderingContext2D | null | undefined
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:56

---

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:57

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:58

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:59

---

### \_paused

```ts
_paused: boolean = false
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:60

---

### boundTarget

```ts
boundTarget: HTMLElement | undefined
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:61

---

### onMouseEnter

```ts
onMouseEnter: EventListener | undefined
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:62

---

### onMouseLeave

```ts
onMouseLeave: EventListener | undefined
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:63

---

### onClick

```ts
onClick: EventListener | undefined
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:64

## Methods

### \_frameTick()

```ts
_frameTick(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:54

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

#### Returns

`void`

---

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:82

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:139

webglPool hook — viewport left: pauses the loop; GL stays warm (the pool owns context lifecycle).

#### Returns

`void`

---

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:150

webglPool hook — back in view: resumes the render loop; counterpart of purge().

#### Returns

`void`

---

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:158

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

#### Returns

`void`

---

### bindEvents()

```ts
bindEvents(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:170

Wires pointer/hover listeners that drive the widget's interactive state.

#### Returns

`void`

---

### setHover()

```ts
setHover(hovered): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:198

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

Defined in: core/utils/canvas/widgets/carousel-controls.ts:209

Programmatic activation — runs the bound onAction.

#### Returns

`void`

---

### setPlaying()

```ts
setPlaying(playing): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:219

Morphs the icon between play and pause states.

#### Parameters

##### playing

`boolean`

#### Returns

`void`

---

### setProgress()

```ts
setProgress(p, isPlaying?): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:228

Updates the progress ring's fill fraction (and syncs play state).

#### Parameters

##### p

`number`

##### isPlaying?

`boolean`

#### Returns

`void`

---

### setReducedMotion()

```ts
setReducedMotion(isReduced): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:246

Applies prefers-reduced-motion: swaps the animation loop for one static frame render.

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

Defined in: core/utils/canvas/widgets/carousel-controls.ts:259

Draws a single settled frame — used under reduced motion or when the loop is stopped.

#### Returns

`void`

---

### animate()

```ts
animate(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:271

Starts the requestAnimationFrame render loop (skipped under reduced motion).

#### Returns

`void`

---

### \_renderCanvas2D()

```ts
_renderCanvas2D(now): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:318

Per-frame Canvas2D fallback render — same visual language as the shader.

#### Parameters

##### now

`number`

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/carousel-controls.ts:341

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
