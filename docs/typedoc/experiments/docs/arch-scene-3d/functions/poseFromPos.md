[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / poseFromPos

```ts
function poseFromPos(p, t): [number, number, number]
```

Defined in: experiments/docs/arch-scene-3d.ts:117

Converts a saved world-space camera position into the orbit rig's
spherical pose — the inverse of the Rust rig's
`target + d·(cos p·sin y, sin p, cos p·cos y)`.

## Parameters

### p

readonly \[`number`, `number`, `number`\]

Saved eye position.

### t

readonly \[`number`, `number`, `number`\]

Saved orbit target.

## Returns

\[`number`, `number`, `number`\]

[distance, yaw, pitch].
