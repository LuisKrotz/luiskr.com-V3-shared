[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / SceneCamState

Defined in: experiments/docs/arch-scene.ts:203

Persisted camera pose + rotation-off flag across scene remounts.

## Properties

### p

```ts
p: [number, number, number]
```

Defined in: experiments/docs/arch-scene.ts:205

camera.position xyz

---

### t

```ts
t: [number, number, number]
```

Defined in: experiments/docs/arch-scene.ts:207

controls.target xyz

---

### off

```ts
off: boolean
```

Defined in: experiments/docs/arch-scene.ts:209

true once the user has taken control — autoRotate stays off.
