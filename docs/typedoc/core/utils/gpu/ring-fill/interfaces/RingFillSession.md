[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/ring-fill](../README.md) / RingFillSession

Defined in: core/utils/gpu/ring-fill.ts:70

Live ring-fill overlay — the return surface callers hold.

## Properties

### setProgress

```ts
setProgress: (_index, _target) => void;
```

Defined in: core/utils/gpu/ring-fill.ts:72

Set one button's fill target (0 collapsed, 1 filled); eases over FILL_SECONDS.

#### Parameters

##### \_index

`number`

##### \_target

`number`

#### Returns

`void`

---

### refresh

```ts
refresh: () => void;
```

Defined in: core/utils/gpu/ring-fill.ts:74

Re-measure buttons + repush the sheet NOW (list re-renders).

#### Returns

`void`

---

### destroy

```ts
destroy: () => void;
```

Defined in: core/utils/gpu/ring-fill.ts:76

Tear down canvas/widget/observers/listeners.

#### Returns

`void`
