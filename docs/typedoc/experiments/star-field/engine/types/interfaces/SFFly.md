[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFFly

Defined in: experiments/star-field/engine/types.ts:372

Active camera fly-to tween — cubic ease-in-out over FLY_MS.

## Properties

### t0

```ts
t0: number;
```

Defined in: experiments/star-field/engine/types.ts:374

Start time (performance.now snapshot).

***

### fromPos

```ts
fromPos: object;
```

Defined in: experiments/star-field/engine/types.ts:376

Camera position at tween start.

#### x

```ts
x: number;
```

#### y

```ts
y: number;
```

#### z

```ts
z: number;
```

***

### toPos

```ts
toPos: object;
```

Defined in: experiments/star-field/engine/types.ts:378

Camera destination.

#### x

```ts
x: number;
```

#### y

```ts
y: number;
```

#### z

```ts
z: number;
```

***

### fromTgt

```ts
fromTgt: object;
```

Defined in: experiments/star-field/engine/types.ts:380

Controls target at tween start.

#### x

```ts
x: number;
```

#### y

```ts
y: number;
```

#### z

```ts
z: number;
```

***

### toTgt

```ts
toTgt: object;
```

Defined in: experiments/star-field/engine/types.ts:382

Controls target destination (body center).

#### x

```ts
x: number;
```

#### y

```ts
y: number;
```

#### z

```ts
z: number;
```

***

### done?

```ts
optional done?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:384

Optional follow-up when the tween completes (fire onSelect).

#### Returns

`void`
