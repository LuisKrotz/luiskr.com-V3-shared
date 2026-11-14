[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / resolveTierKey

```ts
function resolveTierKey(tiers, cls): 'mobile' | 'tablet' | 'desktop' | 'wide' | undefined
```

Defined in: core/utils/responsive-css.ts:75

Resolves which tier key to load for a viewport class: the highest
defined tier at or below it. Cumulative content means a higher key
would only add blocks the viewport cannot apply, so lower is correct —
e.g. tiers {mobile,desktop} on a tablet viewport resolves to `mobile`.

## Parameters

### tiers

`Partial`\<`Record`\<`"mobile"` \| `"tablet"` \| `"desktop"` \| `"wide"`, [`TierLoader`](../type-aliases/TierLoader.md)\>\>

### cls

`"mobile"` \| `"tablet"` \| `"desktop"` \| `"wide"`

## Returns

`"mobile"` \| `"tablet"` \| `"desktop"` \| `"wide"` \| `undefined`

the tier key, or undefined when nothing is defined.
