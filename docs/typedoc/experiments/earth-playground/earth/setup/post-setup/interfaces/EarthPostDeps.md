[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/setup/post-setup](../README.md) / EarthPostDeps

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:26

earths post deps.

## Properties

### TSL

```ts
TSL: __module;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:27

***

### RenderPipeline

```ts
RenderPipeline: typeof RenderPipeline;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:28

***

### bloom

```ts
bloom: (node, strength?, radius?, threshold?) => BloomNode;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:29

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

***

### chromaticAberration

```ts
chromaticAberration: (node, strength?, center?, scale?) => ChromaticAberrationNode;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:30

#### Parameters

##### node

`Node`

##### strength?

`Node`

##### center?

`Vector2` \| `Node` \| `null`

##### scale?

`Node`

#### Returns

`ChromaticAberrationNode`

***

### film

```ts
film: (inputNode, intensityNode?, uvNode?) => FilmNode;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:31

#### Parameters

##### inputNode

`Node`

##### intensityNode?

`Node` \| `null`

##### uvNode?

`Node` \| `null`

#### Returns

`FilmNode`
