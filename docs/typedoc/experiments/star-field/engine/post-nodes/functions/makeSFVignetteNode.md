[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/post-nodes](../README.md) / makeSFVignetteNode

```ts
function makeSFVignetteNode(TSL): FnNode<[ProxiedObject<SFVignetteNodeArgs>], Node<'vec4'>>
```

Defined in: experiments/star-field/engine/post-nodes.ts:38

Builds the vignette node used at the end of the post chain.

Math:
d = |uv − 0.5|·2 → 0 at center, ~1.41 at corners.
v = 1 − |d|·offset, clamped → linear falloff scaled by reach.
factor = mix(1, v^darkness, min(darkness,1)) → darkness doubles as
curve exponent and amount so a single value feels photographic.

## Parameters

### TSL

`__module`

The three/tsl namespace (lazy-loaded in bootstrap).

## Returns

`FnNode`\<\[`ProxiedObject`\<[`SFVignetteNodeArgs`](../interfaces/SFVignetteNodeArgs.md)\>\], `Node`\<`"vec4"`\>\>

The vignette Fn ready to wrap a color node.
