[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/controls](../README.md) / loadSpaceSettings

```ts
function loadSpaceSettings(): SpSavedSettings | null;
```

Defined in: experiments/earth-playground/space/controls.ts:413

Reads the persisted panel settings, discarding blobs from another
SP_VERSION or corrupted JSON — both collapse to "no saved state" so a
stale/corrupt blob can never apply out-of-range engine values.

## Returns

[`SpSavedSettings`](../type-aliases/SpSavedSettings.md) \| `null`

The saved param map, or null.
