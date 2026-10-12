[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFFly

Defined in: experiments/star-field/engine/types.ts:627

Active camera fly-to tween — cubic ease-in-out over FLY_MS.

## Properties

### t0

```ts
t0: number
```

Defined in: experiments/star-field/engine/types.ts:629

Start time (performance.now snapshot).

---

### fromPos

```ts
fromPos: object
```

Defined in: experiments/star-field/engine/types.ts:631

Camera position at tween start.

#### x

```ts
x: number
```

#### y

```ts
y: number
```

#### z

```ts
z: number
```

---

### offset

```ts
offset: object
```

Defined in: experiments/star-field/engine/types.ts:633

Approach offset — destination sits this vector away from the body.

#### x

```ts
x: number
```

#### y

```ts
y: number
```

#### z

```ts
z: number
```

---

### fromTgt

```ts
fromTgt: object
```

Defined in: experiments/star-field/engine/types.ts:635

Controls target at tween start.

#### x

```ts
x: number
```

#### y

```ts
y: number
```

#### z

```ts
z: number
```

---

### track

```ts
track: () =>
  | {
  x: number;
  y: number;
  z: number;
}
  | null;
```

Defined in: experiments/star-field/engine/types.ts:642

Live body-position getter — rider-mounted anchors keep moving while
the tween runs, so the destination is re-resolved every frame; a
static snapshot would land the camera where the body was at arm
time. Returns null when the anchor is gone (dest frozen at last).

#### Returns

\| \{
`x`: `number`;
`y`: `number`;
`z`: `number`;
\}
\| `null`

---

### last

```ts
last: object
```

Defined in: experiments/star-field/engine/types.ts:644

Last resolved body position — destination anchor when track yields null.

#### x

```ts
x: number
```

#### y

```ts
y: number
```

#### z

```ts
z: number
```

---

### done?

```ts
optional done?: () => void;
```

Defined in: experiments/star-field/engine/types.ts:646

Optional follow-up when the tween completes (fire onSelect).

#### Returns

`void`
