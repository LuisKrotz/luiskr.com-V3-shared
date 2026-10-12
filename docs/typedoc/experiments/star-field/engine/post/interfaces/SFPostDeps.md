[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/post](../README.md) / SFPostDeps

Defined in: experiments/star-field/engine/post.ts:32

Post-chain dependencies — lazy-imported in bootstrap so the TSL graph
and the display nodes only load when the WebGL engine actually boots.

## Properties

### TSL

```ts
TSL: __module
```

Defined in: experiments/star-field/engine/post.ts:34

three/tsl namespace.

---

### RenderPipeline

```ts
RenderPipeline: typeof RenderPipeline
```

Defined in: experiments/star-field/engine/post.ts:36

RenderPipeline class from three/webgpu.

---

### bloom

```ts
bloom: (node, strength?, radius?, threshold?) => BloomNode
```

Defined in: experiments/star-field/engine/post.ts:38

Unreal-style bloom node.

#### Parameters

##### node

`Node`

##### strength?

`number`

##### radius?

`number`

##### threshold?

`number`

#### Returns

`BloomNode`

---

### film

```ts
film: (inputNode, intensityNode?, uvNode?) => FilmNode
```

Defined in: experiments/star-field/engine/post.ts:40

Film grain node.

#### Parameters

##### inputNode

`Node`

##### intensityNode?

`Node` \| `null`

##### uvNode?

`Node` \| `null`

#### Returns

`FilmNode`
