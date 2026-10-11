[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / escapeHtml

```ts
function escapeHtml(str): string;
```

Defined in: core/utils/string.ts:45

Escapes HTML-significant characters for safe insertion into innerHTML or
double-quoted attributes. `&` must be replaced first so the entities
emitted by the later replacements are not double-escaped.
Pure ESM utility function, tree-shakeable.

## Parameters

### str

`string`

— raw text that may contain &, <, >, ", '

## Returns

`string`

entity-escaped text safe for markup contexts
