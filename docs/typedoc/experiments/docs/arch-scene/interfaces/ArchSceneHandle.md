[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / ArchSceneHandle

Defined in: experiments/docs/arch-scene.ts:36

Live scene resources — destroy() frees renderer + listeners.

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: experiments/docs/arch-scene.ts:37

#### Returns

`void`

***

### setActive()

```ts
setActive(_path): void;
```

Defined in: experiments/docs/arch-scene.ts:44

Highlights the node matching `path` — the current docs location.
Safe to call before the async graph build lands; the highlight
applies to whatever nodes exist and is re-applied when they arrive.

#### Parameters

##### \_path

`string`

Manifest path of the active location ('' = portal root).

#### Returns

`void`
