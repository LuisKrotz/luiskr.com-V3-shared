[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / registryWorldPos

```ts
function registryWorldPos(s, rec): 
  | {
  x: number;
  y: number;
  z: number;
}
  | null;
```

Defined in: experiments/star-field/engine/registry.ts:265

World-space position of a registry record — delegates to the shared
`sfGalacticVec` Cartesian path so fly-to lands exactly on the
rendered cloud point: records carry heliocentric galactic xyz, the
cloud mounts on the Sun's pivot at the scene origin, and the same
three-tier distance compression + disc tilt apply.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state (for the Milky Way disc tilt).

### rec

[`SFRegistryRecord`](../interfaces/SFRegistryRecord.md)

The registry record.

## Returns

  \| \{
  `x`: `number`;
  `y`: `number`;
  `z`: `number`;
\}
  \| `null`

`{x,y,z}` world position, or null without a scene.
