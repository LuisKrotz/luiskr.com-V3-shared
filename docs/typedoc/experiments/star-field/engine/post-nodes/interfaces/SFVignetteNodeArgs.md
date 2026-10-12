[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/post-nodes](../README.md) / SFVignetteNodeArgs

Defined in: experiments/star-field/engine/post-nodes.ts:13

Arguments for the star-field vignette node.

## Indexable

```ts
[key: string]: unknown
```

Fn argument-object constraint — nodes are opaque to the index.

## Properties

### color

```ts
color: Node<'vec4'>
```

Defined in: experiments/star-field/engine/post-nodes.ts:17

Incoming scene color (rgba).

---

### uv

```ts
uv: Node<'vec2'>
```

Defined in: experiments/star-field/engine/post-nodes.ts:19

Screen-space uv (0..1).

---

### darkness

```ts
darkness: Node<'float'>
```

Defined in: experiments/star-field/engine/post-nodes.ts:21

Curve exponent + lerp weight combined (photographic feel).

---

### offset

```ts
offset: Node<'float'>
```

Defined in: experiments/star-field/engine/post-nodes.ts:23

Radial reach — higher pulls the falloff toward center.
