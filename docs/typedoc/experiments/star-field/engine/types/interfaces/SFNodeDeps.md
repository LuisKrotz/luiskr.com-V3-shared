[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFNodeDeps

Defined in: experiments/star-field/engine/types.ts:25

Lazily-loaded node-material context — the renderer is WebGPURenderer
(WebGPU or forced-WebGL backend), whose node pipeline rejects classic
GLSL ShaderMaterials. Every custom-shaded surface (fresnel limbs,
boundary shells, the accretion disc) is therefore built as a node
material: bootstrap injects the TSL namespace and the node material
ctor so the body builders stay pure/mockable.

## Properties

### TSL

```ts
TSL: __module;
```

Defined in: experiments/star-field/engine/types.ts:27

The `three/tsl` module namespace.

***

### mats

```ts
mats: object;
```

Defined in: experiments/star-field/engine/types.ts:29

Node-material constructors re-exported by `three/webgpu`.

#### MeshBasicNodeMaterial

```ts
MeshBasicNodeMaterial: typeof MeshBasicNodeMaterial;
```
