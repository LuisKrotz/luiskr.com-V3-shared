[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/orbit-controller](../README.md) / OrbitController

Defined in: core/utils/gpu/orbit-controller.ts:68

Live orbit rig returned by `bindOrbit`.

## Properties

### autoRotate

```ts
autoRotate: boolean
```

Defined in: core/utils/gpu/orbit-controller.ts:70

Gesture latch — false stops the idle drift (OrbitControls.autoRotate).

---

### tx

```ts
readonly tx: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:72

Damped current pose — feed `surface.set_orbit` after update().

---

### ty

```ts
readonly ty: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:73

---

### tz

```ts
readonly tz: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:74

---

### distance

```ts
readonly distance: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:75

---

### yaw

```ts
readonly yaw: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:76

---

### pitch

```ts
readonly pitch: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:77

## Methods

### update()

```ts
update(dt): boolean;
```

Defined in: core/utils/gpu/orbit-controller.ts:85

One frame of integration — auto-rotate advances the target while
no pointer is captured, then every channel damps toward its
target. Allocation-free. Returns true when the pose changed (the
caller pushes `set_orbit` + fires CHANGE consumers).

#### Parameters

##### dt

`number`

Frame delta in seconds.

#### Returns

`boolean`

---

### getDistance()

```ts
getDistance(): number;
```

Defined in: core/utils/gpu/orbit-controller.ts:87

Current damped distance — the label-fade/zoom-reveal input.

#### Returns

`number`

---

### setTarget()

```ts
setTarget(
   x,
   y,
   z
): void;
```

Defined in: core/utils/gpu/orbit-controller.ts:89

Moves the orbit target (world point).

#### Parameters

##### x

`number`

##### y

`number`

##### z

`number`

#### Returns

`void`

---

### setPose()

```ts
setPose(
   distance,
   yaw,
   pitch
): void;
```

Defined in: core/utils/gpu/orbit-controller.ts:91

Jumps the pose (save/restore arms — targets AND currents snap).

#### Parameters

##### distance

`number`

##### yaw

`number`

##### pitch

`number`

#### Returns

`void`

---

### addEventListener()

```ts
addEventListener(type, fn): void;
```

Defined in: core/utils/gpu/orbit-controller.ts:93

Registers a START/END/CHANGE listener.

#### Parameters

##### type

`string`

##### fn

[`OrbitListener`](../type-aliases/OrbitListener.md)

#### Returns

`void`

---

### removeEventListener()

```ts
removeEventListener(type, fn): void;
```

Defined in: core/utils/gpu/orbit-controller.ts:95

Removes a registered listener.

#### Parameters

##### type

`string`

##### fn

[`OrbitListener`](../type-aliases/OrbitListener.md)

#### Returns

`void`

---

### dispose()

```ts
dispose(): void;
```

Defined in: core/utils/gpu/orbit-controller.ts:97

Unbinds every listener + clears pointer state.

#### Returns

`void`
