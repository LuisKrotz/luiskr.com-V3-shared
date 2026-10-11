[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/theme-slider](../README.md) / ThemeSliderWebGL

Defined in: core/utils/canvas/widgets/theme-slider.ts:29

Full Animated Day/Night/System Theme Slider
Powered by WebGL with robust Canvas 2D fallback.
Uses normalized aspect coordinates (range 0.0 to 3.33) to prevent GPU float overflow on all platforms.
Position 0: Dark (Night - Lunar moon with craters, twinkling stars, starry canyon mesas)
Position 1: System (Twilight - Balanced orb, sun rings rising on left, crescent on right)
Position 2: Light (Day - Sun knob on right, peach/coral sky, radiant sun on left)

## Constructors

### Constructor

```ts
new ThemeSliderWebGL(
   canvas, 
   initialTheme?, 
   onThemeChange?
): ThemeSliderWebGL;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:65

#### Parameters

##### canvas

`HTMLCanvasElement`

##### initialTheme?

`string` = `THEME.SYSTEM`

##### onThemeChange?

((`_theme`) => `void`) \| `null`

#### Returns

`ThemeSliderWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:30

***

### onThemeChange

```ts
onThemeChange: ((_theme) => void) | null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:31

***

### currentTheme

```ts
currentTheme: string;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:32

***

### width

```ts
width: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:33

***

### height

```ts
height: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:34

***

### targetP

```ts
targetP: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:35

***

### currentP

```ts
currentP: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:36

***

### knobX

```ts
knobX: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:37

***

### isDragging

```ts
isDragging: boolean = false;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:38

***

### startX

```ts
startX: number = 0;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:39

***

### useWebGL

```ts
useWebGL: boolean = false;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:40

***

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:41

***

### startTime

```ts
startTime: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:42

***

### rippleTime

```ts
rippleTime: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:43

***

### ripplePos

```ts
ripplePos: number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:44

***

### gl

```ts
gl: WebGLRenderingContext | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:45

***

### ctx

```ts
ctx: CanvasRenderingContext2D | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:46

***

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:47

***

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:48

***

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:49

***

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:50

***

### uProgress

```ts
uProgress: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:51

***

### uKnobX

```ts
uKnobX: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:52

***

### uRippleTime

```ts
uRippleTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:53

***

### uRipplePos

```ts
uRipplePos: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:54

***

### aPos

```ts
aPos: number = -1;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:55

***

### \_resizeObserver

```ts
_resizeObserver: ResizeObserver | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:56

***

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:57

***

### \_purged

```ts
_purged: boolean = false;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:58

***

### onPointerDown

```ts
onPointerDown: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:59

***

### onPointerMove

```ts
onPointerMove: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:60

***

### onPointerUp

```ts
onPointerUp: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:61

***

### onClick

```ts
onClick: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:62

***

### onKeyDown

```ts
onKeyDown: ((_e) => void) | undefined;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:63

## Methods

### \_themeToP()

```ts
_themeToP(theme): number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:112

THEME → normalized track position. Positions are the integer stops
0/1/2 — fractional values only exist mid-animation.

#### Parameters

##### theme

`string`

#### Returns

`number`

***

### \_pToTheme()

```ts
_pToTheme(p): string;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:118

Maps a normalized track position back to the nearest THEME value.

#### Parameters

##### p

`number`

#### Returns

`string`

***

### \_pToKnobX()

```ts
_pToKnobX(p): number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:126

Normalized position → knob pixel X inside the track — see
theme-slider-math.ts for the inset geometry.

#### Parameters

##### p

`number`

#### Returns

`number`

***

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:132

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

#### Returns

`void`

***

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:138

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

#### Returns

`void`

***

### initWebGL()

```ts
initWebGL(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:144

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.

#### Returns

`void`

***

### bindEvents()

```ts
bindEvents(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:150

Wires pointer drag + tap-to-snap; supports keyboard arrows for a11y.

#### Returns

`void`

***

### \_xToContinuousP()

```ts
_xToContinuousP(x, rectWidth?): number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:158

Pointer pixel X → continuous (unclamped-drag) normalized position —
see theme-slider-math.ts for the 12%–88% active band.

#### Parameters

##### x

`number`

##### rectWidth?

`number` \| `null`

#### Returns

`number`

***

### \_xToP()

```ts
_xToP(x): number;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:166

Pointer pixel X → normalized position using the fixed 32px insets
(same span as _pToKnobX). Retained for non-drag hit paths.

#### Parameters

##### x

`number`

#### Returns

`number`

***

### setTheme()

```ts
setTheme(theme): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:172

Moves the knob to the given theme's stop (spring-animated).

#### Parameters

##### theme

`string`

#### Returns

`void`

***

### setReducedMotion()

```ts
setReducedMotion(isReduced): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:189

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

Defined in: core/utils/canvas/widgets/theme-slider.ts:201

Snap state to target and draw a single settled frame — used under
reduced motion or when the loop is stopped.

#### Returns

`void`

***

### animate()

```ts
animate(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:207

Starts the requestAnimationFrame render loop (skipped under reduced motion).

#### Returns

`void`

***

### \_renderWebGL()

```ts
_renderWebGL(now): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:213

Per-frame WebGL render: updates time/knob uniforms and draws the quad.

#### Parameters

##### now

`number`

#### Returns

`void`

***

### \_renderCanvas2D()

```ts
_renderCanvas2D(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:222

Canvas2D fallback renderer — dormant defensive code; the real
fallback hides the canvas and activates the CSS/DOM fallback
(see theme-slider-init.ts triggerFallback).

#### Returns

`void`

***

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:231

webglPool hook — offscreen: stops the loop and force-loses the GL
context so offscreen widgets hold no context slots; restore()
rebuilds the program on re-entry.

#### Returns

`void`

***

### restore()

```ts
restore(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:250

Recreates the GL context + program and resumes the loop after a purge.

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/theme-slider.ts:278

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
