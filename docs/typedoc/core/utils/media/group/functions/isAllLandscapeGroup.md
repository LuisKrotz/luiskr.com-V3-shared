[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/group](../README.md) / isAllLandscapeGroup

```ts
function isAllLandscapeGroup(group): boolean
```

Defined in: core/utils/media/group.ts:48

Whether every item in the group is flagged landscape — all-landscape
groups can't pair side-by-side in the two-up carousel layout, so they
force the scroll track (the `forceActive` contract shared by the
project binder and the mosaic's mobile carousel fallback).

## Parameters

### group

`unknown`

A media item array (shape-checked, not trusted).

## Returns

`boolean`

true when every item is landscape and the group is non-empty.
