[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/checkbox-webgl](../README.md) / CheckboxWebGL

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:16

Canvas-2D checkbox widget — see file header for the render/loop design.

## Constructors

### Constructor

```ts
new CheckboxWebGL(
   canvas, 
   initialChecked?, 
   onToggle?
): CheckboxWebGL;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:28

#### Parameters

##### canvas

`HTMLCanvasElement`

##### initialChecked?

`boolean` = `false`

##### onToggle?

((`_checked`) => `void`) \| `null`

#### Returns

`CheckboxWebGL`

## Properties

### canvas

```ts
canvas: HTMLCanvasElement | null;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:17

***

### isChecked

```ts
isChecked: boolean;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:18

***

### onToggle

```ts
onToggle: ((_checked) => void) | null;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:19

***

### animId

```ts
animId: number | null;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:20

***

### progress

```ts
progress: number;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:21

***

### targetP

```ts
targetP: number;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:22

***

### startTime

```ts
startTime: number;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:23

***

### pulseTime

```ts
pulseTime: number = 0;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:24

***

### ctx2d

```ts
ctx2d: CanvasRenderingContext2D | null = null;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:25

***

### \_ink

```ts
_ink: string | null = null;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:26

## Methods

### setChecked()

```ts
setChecked(val): void;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:52

Sets the checked state (animates the transition).

#### Parameters

##### val

`boolean`

#### Returns

`void`

***

### init()

```ts
init(): void;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:90

Sizes the backing store to 20 CSS px × devicePixelRatio (capped at 2× —
beyond that the extra pixels are invisible on a 20px control) and
acquires the 2D context. A failed context just leaves the box empty;
the label still communicates state.

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: experiments/earth-playground/space/checkbox-webgl.ts:213

Stops the loop and releases the canvas resources.

#### Returns

`void`
