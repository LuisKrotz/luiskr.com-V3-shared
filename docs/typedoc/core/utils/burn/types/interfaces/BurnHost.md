[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/types](../README.md) / BurnHost

Defined in: core/utils/burn/types.ts:46

Minimal host contract — the shadow-root `$(selector)` query method.

## Methods

### $()

```ts
$<E>(sel): E | null;
```

Defined in: core/utils/burn/types.ts:48

Queries the host's shadow root for the first match, or null.

#### Type Parameters

##### E

`E` _extends_ `Element` = `Element`

#### Parameters

##### sel

`string`

#### Returns

`E` \| `null`
