[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/switch-slider](../README.md) / SwitchWebGL

Defined in: core/utils/canvas/widgets/switch-slider.ts:28

Contextual WebGL Switch Slider for Developer Tools
Renders custom animated graphical draw elements referent to each toggle's context:
- 'stats': Live ECG oscilloscope waveform + pulsing chip matrix (Stats for Nerds)
- 'grid': Glowing blueprint column grid lines + scanning crosshairs (Show Grid)
- 'motion': Subtle ambient drift (OFF) vs calm still horizon datum (ON) (Reduced Motion)
All switches share an identical solid centered knob indicator dot.

## Constructors

### Constructor

```ts
new SwitchWebGL(
   canvas, 
   contextType?, 
   initialActive?, 
   onToggle?
): SwitchWebGL;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:56

#### Parameters

##### canvas

`HTMLCanvasElement`

##### contextType?

`string` = `SWITCH_TYPES.STATS`

##### initialActive?

`boolean` = `false`

##### onToggle?

((`_active`) => `void`) \| `null`

#### Returns

`SwitchWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:29

***

### contextType

```ts
contextType: string;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:30

***

### onToggle

```ts
onToggle: ((_active) => void) | null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:31

***

### isActive

```ts
isActive: boolean;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:32

***

### width

```ts
width: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:33

***

### height

```ts
height: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:34

***

### targetP

```ts
targetP: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:35

***

### currentP

```ts
currentP: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:36

***

### knobX

```ts
knobX: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:37

***

### useWebGL

```ts
useWebGL: boolean = false;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:38

***

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:39

***

### startTime

```ts
startTime: number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:40

***

### dpr

```ts
dpr: number = 2;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:41

***

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:42

***

### ctx

```ts
ctx: CanvasRenderingContext2D | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:43

***

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:44

***

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:45

***

### aPos

```ts
aPos: number = -1;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:46

***

### uContext

```ts
uContext: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:47

***

### uKnobX

```ts
uKnobX: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:48

***

### uProgress

```ts
uProgress: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:49

***

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:50

***

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:51

***

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:52

***

### \_purged

```ts
_purged: boolean = false;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:53

***

### onClick

```ts
onClick: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:54

## Methods

### \_pToKnobX()

```ts
_pToKnobX(p): number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:101

Progress 0–1 → knob pixel X. The knob (radius 11) is inset 14px from
each end — exactly half the 28px track height — so it sits centered
inside the capsule's rounded caps at both extremes.

#### Parameters

##### p

`number`

#### Returns

`number`

CSS px

***

### \_contextCode()

```ts
_contextCode(): number;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:115

Context → shader's u_context float id (0=stats, 1=grid/cyan/space,
2=motion). The fragment shader branches on ranges (<0.5, <1.5, else)
so several visual aliases can share the grid animation.

#### Returns

`number`

***

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:130

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

#### Returns

`void`

***

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:136

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

#### Returns

`void`

***

### initWebGL()

```ts
initWebGL(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:142

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.

#### Returns

`void`

***

### bindEvents()

```ts
bindEvents(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:148

Wires pointer/hover listeners that drive the widget's interactive state.

#### Returns

`void`

***

### toggle()

```ts
toggle(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:160

Flips the switch and fires the onToggle callback.

#### Returns

`void`

***

### setActive()

```ts
setActive(active): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:172

Sets the knob position programmatically (animates the slide).

#### Parameters

##### active

`boolean`

#### Returns

`void`

***

### setReducedMotion()

```ts
setReducedMotion(isReduced): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:185

Applies prefers-reduced-motion: swaps the animation loop for one
static frame render, or restarts the loop when motion is re-allowed.

#### Parameters

##### isReduced

`boolean`

#### Returns

`void`

***

### \_renderStatic()

```ts
_renderStatic(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:197

Snap state to target and draw a single settled frame — used under
reduced motion or when the loop is stopped.

#### Returns

`void`

***

### animate()

```ts
animate(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:203

Starts the requestAnimationFrame render loop (skipped under reduced motion).

#### Returns

`void`

***

### \_renderWebGL()

```ts
_renderWebGL(now): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:209

Per-frame WebGL render: updates time/knob uniforms and draws the quad.

#### Parameters

##### now

`number`

#### Returns

`void`

***

### \_renderCanvas2D()

```ts
_renderCanvas2D(now): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:215

Per-frame Canvas2D fallback render — same visual language as the shader.

#### Parameters

##### now

`number`

#### Returns

`void`

***

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:224

webglPool hook — offscreen: stops the loop (GL or 2D) and force-loses
the GL context so offscreen widgets hold no context slots; restore()
rebuilds the GL program or re-acquires the 2D context on re-entry.

#### Returns

`void`

***

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:245

Recreates the GL context + program (or the 2D fallback) and resumes the loop after a purge.

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/switch-slider.ts:283

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
