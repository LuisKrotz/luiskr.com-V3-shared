[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/widgets/burger-button-webgl](../README.md) / BurgerButtonWebGL

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:84

WebGL liquid menu icon for the burger button.
Renders four rounded squares that drift with a liquid idle, pool toward
the center on hover/focus, and morph into the close X when the menu
opens (setOpen). Adapts to the current theme: dark icon in light mode,
bright icon in dark mode.

## Constructors

### Constructor

```ts
new BurgerButtonWebGL(canvas, onClick?): BurgerButtonWebGL;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:148

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

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:91

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

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:92

---

### program

```ts
program: WebGLProgram | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:93

---

### quadBuffer

```ts
quadBuffer: WebGLBuffer | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:94

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:95

---

### startTime

```ts
startTime: number
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:98

---

### uTime

```ts
uTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:99

---

### uResolution

```ts
uResolution: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:100

---

### uDark

```ts
uDark: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:101

---

### uHc

```ts
uHc: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:102

---

### uHover

```ts
uHover: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:103

---

### uOpen

```ts
uOpen: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:104

---

### uLiquid

```ts
uLiquid: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:105

---

### uRot

```ts
uRot: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:106

---

### uClickTime

```ts
uClickTime: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:107

---

### uSS

```ts
uSS: WebGLUniformLocation | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:108

---

### \_hover

```ts
_hover: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:110

Smoothed hover convergence — pointer enter/leave + focus/blur drive the target.

---

### \_hoverTarget

```ts
_hoverTarget: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:111

---

### \_open

```ts
_open: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:113

Smoothed menu-open morph — setOpen drives the target.

---

### \_openTarget

```ts
_openTarget: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:114

---

### \_liquid

```ts
_liquid: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:120

Close-state liquid pour (u_liquid) — the turquoise water fill every
close button shows on hover. Target follows hover ONLY while the
menu is open, so the fill never pre-charges behind the closed icon.

---

### \_rot

```ts
_rot: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:125

Close-state X rotation (u_rot) — the half-turn the real close
button's X performs while its liquid fills on hover.

---

### \_clickT

```ts
_clickT: number = CLICK_TIME_OFF
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:127

Seconds since startTime of the last press — drives the click shockwave.

---

### \_prevT

```ts
_prevT: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:129

Previous frame's t — the approach easings consume dt, not absolutes.

---

### \_onClick

```ts
_onClick: EventListener | null
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:130

---

### \_onKeyDown

```ts
_onKeyDown: ((e) => void) | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:131

---

### \_onHoverIn

```ts
_onHoverIn: EventListener
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:132

---

### \_onHoverOut

```ts
_onHoverOut: EventListener
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:133

---

### \_onContextLost

```ts
_onContextLost: EventListener | null = null;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:134

---

### \_onResize

```ts
_onResize: () => void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:135

#### Returns

`void`

---

### \_purged

```ts
_purged: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:136

---

### \_hasDeriv

```ts
_hasDeriv: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:137

---

### \_settleStreak

```ts
_settleStreak: number = 0
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:143

Consecutive frames with every eased scalar converged and no live
shockwave — once it clears SETTLE_GRACE_FRAMES the ambient liquid
drift repaints on alternating frames only.

---

### \_parity

```ts
_parity: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:145

Alternating-frame parity used by the settled-state half-rate path.

---

### useWebGL

```ts
useWebGL: boolean = false
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:146

## Methods

### \_frameTick()

```ts
_frameTick(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:97

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

#### Returns

`void`

---

### \_initGL()

```ts
_initGL(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:218

Creates the WebGL context + shader program; falls back to the CSS/DOM path on failure.

#### Returns

`void`

---

### \_initGLReal()

```ts
_initGLReal(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:229

The synchronous WebGL bootstrap — context, program, quad, uniform handles.

#### Returns

`void`

---

### \_triggerFallback()

```ts
_triggerFallback(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:310

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

#### Returns

`void`

---

### \_checkResize()

```ts
_checkResize(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:337

Re-syncs the drawing buffer to the canvas's CSS box × devicePixelRatio
(capped at 2). Only reallocates when the rounded size actually changed,
and repaints one frame immediately when the RAF loop isn't running —
in reduced-motion static mode a resize would otherwise leave the
cleared buffer blank until the next state change.

#### Returns

`void`

---

### setOpen()

```ts
setOpen(open): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:374

Menu-open driver — the nav calls this on toggle/close so the pooled
droplet morphs into the close X (and back). With no running loop
(reduced motion, pre-start) the state snaps and repaints once.

#### Parameters

##### open

`boolean`

Whether the menu overlay is open.

#### Returns

`void`

---

### \_setHover()

```ts
_setHover(hovered): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:382

Hover-convergence driver — pointer enter/leave and focus/blur feed it.

#### Parameters

##### hovered

`number`

#### Returns

`void`

---

### \_settleNow()

```ts
_settleNow(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:390

Snaps the smoothed state to its targets and repaints — the static path.

#### Returns

`void`

---

### \_start()

```ts
_start(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:406

Chooses reduced-motion static render vs the rAF loop.

#### Returns

`void`

---

### \_drawFrame()

```ts
_drawFrame(t): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:437

Renders one frame at time t (seconds) — shared by the RAF loop and the
static reduced-motion path. u_dark/u_hc are re-evaluated per frame from
the live DOM classes (dark theme OR nav-on-dark over the contact band,
and the high-contrast flag) so the icon recolors instantly on
theme/scroll/preference changes with no listener. Under HC u_dark
carries the DISC's pole instead of the theme's — see _drawFrame.

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

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:505

rAF callback — repaints each frame while running.

#### Returns

`void`

---

### purge()

```ts
purge(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:537

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

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:554

Recreates the GL context and resumes the loop after an offscreen purge.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/widgets/burger-button-webgl.ts:574

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.

#### Returns

`void`
