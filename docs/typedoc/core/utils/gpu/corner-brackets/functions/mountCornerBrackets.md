[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/corner-brackets](../README.md) / mountCornerBrackets

```ts
function mountCornerBrackets(button, spec): () => void
```

Defined in: core/utils/gpu/corner-brackets.ts:152

Mounts the corner-brackets widget inside `button`. The canvas is a
`position:absolute; inset:0` child — it follows the button's box for
free, so only the backing size + arm lengths need mirroring.

## Parameters

### button

`HTMLElement`

The bracketed button/link element.

### spec

[`CornerBracketSpec`](../interfaces/CornerBracketSpec.md)

Per-surface parameters (canvas class, hover inset, ease).

## Returns

Teardown function; safe to call more than once.

() => `void`
