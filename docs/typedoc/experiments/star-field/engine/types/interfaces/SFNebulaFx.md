[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFNebulaFx

Defined in: experiments/star-field/engine/types.ts:836

Living-nebula fx record — the per-layer swirl state for a deep-sky
sprite. Each entry owns one SpriteMaterial (primary photo, rotated
echo ghost, or wide underlay glow); `rate` is rad/scene-second (the
echo's is negative → counter-rotating shear), `phase` the seeded
start angle, `opBase` the resting opacity the shimmer wave scales.
`baseScale` captures the aspect-corrected sprite scale so the whole
sprite can breathe without losing the photo's aspect.

## Properties

### layers

```ts
layers: object[];
```

Defined in: experiments/star-field/engine/types.ts:837

#### material

```ts
material: object
```

##### material.rotation

```ts
rotation: number
```

##### material.opacity

```ts
opacity: number
```

#### rate

```ts
rate: number
```

#### phase

```ts
phase: number
```

#### opBase

```ts
opBase: number
```

---

### baseScale

```ts
baseScale: object
```

Defined in: experiments/star-field/engine/types.ts:843

#### x

```ts
x: number
```

#### y

```ts
y: number
```

---

### phase

```ts
phase: number
```

Defined in: experiments/star-field/engine/types.ts:845

Seeded phase offset for the whole-sprite breathing wave.
