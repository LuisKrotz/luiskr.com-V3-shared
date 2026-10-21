[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makePickProxy

```ts
function makePickProxy(THREE, radius): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:54

Invisible pick bubble for bodies too small to hit reliably — planets
and moons under `SF_DETAIL.PICK_MIN` world units subtend a handful of
pixels at the home camera, so a slightly larger transparent sphere
(riding inside `mesh` to inherit orbit position and spin) gives the
raycaster a usable target. Marked `SF_USER_PROXY` so a real-mesh hit
along the same ray always wins; the caller stamps the body id on
`userData` since the proxy is shared across kinds.

## Parameters

### THREE

`__module`

The three.js module.

### radius

`number`

The body's true radius — the proxy scales with it so
honest stellar-scale bodies stay pickable without a fixed giant
bubble swallowing neighbouring stars.

## Returns

`Object3D`

The invisible proxy mesh.
