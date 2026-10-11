[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/scene/surface-material](../README.md) / SurfaceMaterialArgs

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:17

Dependencies injected by the scene assembler (keeps this module mockable).

## Properties

### THREE

```ts
THREE: __module;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:19

The three.js namespace — Color/constructors used for uniforms.

***

### TSL

```ts
TSL: __module;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:21

The TSL node-graph namespace.

***

### mats

```ts
mats: object;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:23

The physical node material constructor.

#### MeshPhysicalNodeMaterial

```ts
MeshPhysicalNodeMaterial: typeof MeshPhysicalNodeMaterial;
```

***

### colorTex

```ts
colorTex: Texture;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:25

Day-side albedo texture (equirectangular).

***

### specTex

```ts
specTex: Texture;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:27

Specular mask — bright over oceans.

***

### normalTex

```ts
normalTex: Texture;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:29

Tangent-space normal map for terrain.

***

### cloudsTex

```ts
cloudsTex: Texture;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:31

Cloud coverage — also resampled for the fake shadow offset.

***

### nightTex

```ts
nightTex: Texture;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:33

Night city-lights emissive texture.

***

### sunDir

```ts
sunDir: UniformNode<"vec3", Vector3>;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:35

Shared sun-direction uniform.

***

### moonPos

```ts
moonPos: UniformNode<"vec3", Vector3>;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:37

Shared moon-position uniform (eclipse cone test).
