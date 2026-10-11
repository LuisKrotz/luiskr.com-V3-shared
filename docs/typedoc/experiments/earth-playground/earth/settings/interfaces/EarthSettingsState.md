[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/earth/settings](../README.md) / EarthSettingsState

Defined in: experiments/earth-playground/earth/settings.ts:21

The mutable engine state the snapshot reads — mirrors the private
 fields on EarthBackground; everything nullable covers pre-bootstrap.

## Properties

### cg

```ts
cg: 
  | {
  contrast: number;
  saturation: number;
  blackLevel: number;
  blueGreenBoost: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:22

***

### moonCfg

```ts
moonCfg: 
  | {
  enabled: boolean;
  speed: number;
  distance: number;
  inclination: number;
  angle: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:23

***

### bloom\_

```ts
bloom_: 
  | {
  enabled: boolean;
  strength: number;
  radius: number;
  threshold: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:30

***

### vig

```ts
vig: 
  | {
  enabled: boolean;
  darkness: number;
  offset: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:31

***

### ca

```ts
ca: 
  | {
  enabled: boolean;
  strength: number;
  scale: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:32

***

### film

```ts
film: 
  | {
  enabled: boolean;
  intensity: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:33

***

### earth\_

```ts
earth_: 
  | {
  rotationSpeed: number;
  trueInclination: boolean;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:34

***

### sun

```ts
sun: 
  | {
  autoRotate: boolean;
  speed: number;
  inclination: number;
  intensity: number;
  color: number;
  angle: number;
}
  | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:35

***

### earthMatUniforms

```ts
earthMatUniforms: Record<string, UniformNode<"float", number>> | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:43

***

### camera

```ts
camera: PerspectiveCamera | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:44

***

### controls

```ts
controls: OrbitControls | null;
```

Defined in: experiments/earth-playground/earth/settings.ts:45

***

### render

```ts
render: object;
```

Defined in: experiments/earth-playground/earth/settings.ts:46

#### resolutionScale

```ts
resolutionScale: number;
```
