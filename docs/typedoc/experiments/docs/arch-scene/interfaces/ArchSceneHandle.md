[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / ArchSceneHandle

Defined in: experiments/docs/arch-scene.ts:52

Live scene resources — destroy() frees renderer + listeners.

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: experiments/docs/arch-scene.ts:53

#### Returns

`void`

---

### setActive()

```ts
setActive(_path): void;
```

Defined in: experiments/docs/arch-scene.ts:60

Highlights the node matching `path` — the current docs location.
Safe to call before the async graph build lands; the highlight
applies to whatever nodes exist and is re-applied when they arrive.

#### Parameters

##### \_path

`string`

Manifest path of the active location ('' = portal root).

#### Returns

`void`

---

### resize()

```ts
resize(): void;
```

Defined in: experiments/docs/arch-scene.ts:65

Re-fits the renderer + camera to the canvas's current box — called
by the ResizeObserver on column↔dialog moves and any layout shift.

#### Returns

`void`

---

### setPaused()

```ts
setPaused(_paused): void;
```

Defined in: experiments/docs/arch-scene.ts:73

Stops/restarts the rAF loop — the host pauses while the map column
is display:none (≤1024) so no GPU frame or CPU wakeup is spent on
an invisible surface. Unpausing re-arms the loop; a resize() right
after re-fits whatever box the canvas re-seated into.

#### Parameters

##### \_paused

`boolean`

True to stop scheduling, false to resume.

#### Returns

`void`
