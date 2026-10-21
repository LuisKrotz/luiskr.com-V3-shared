[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/flag/anim](../README.md) / wasmAnimType

```ts
function wasmAnimType(flag): number
```

Defined in: core/utils/canvas/widgets/flag/anim.ts:100

Picks the wasm flag shader's personality — locale code →
`GPU_FLAG_ANIMS` discriminant. The WebGL shader's four extra anim
slots (GL/CA/NL/GA) have no dedicated wasm personality and map to
the nearest regional effect.

## Parameters

### flag

[`FlagWebGL`](../../../flag-webgl/classes/FlagWebGL.md)

## Returns

`number`

Wasm anim discriminant for the widget's set_state call.
