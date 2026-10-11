[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/boot](../README.md) / applyPersistedSettings

```ts
function applyPersistedSettings(c): void;
```

Defined in: experiments/earth-playground/space/boot.ts:118

Replays the persisted settings object onto the live engine and panel:
each saved param runs through PARAM_HANDLERS (the same dispatch live
edits use), then the matching DOM input's value/checked + slider
track-fill + row label are synced so the panel reflects restored state.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

## Returns

`void`
