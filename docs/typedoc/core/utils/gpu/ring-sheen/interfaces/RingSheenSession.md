[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/ring-sheen](../README.md) / RingSheenSession

Defined in: core/utils/gpu/ring-sheen.ts:66

Live ring-sheen overlay — the return surface callers hold.

## Properties

### refresh

```ts
refresh: () => void;
```

Defined in: core/utils/gpu/ring-sheen.ts:68

Re-measure tiles + repush the sheet NOW (host-driven repacks).

#### Returns

`void`

---

### destroy

```ts
destroy: () => void;
```

Defined in: core/utils/gpu/ring-sheen.ts:70

Tear down canvas/widget/observers/listeners.

#### Returns

`void`
