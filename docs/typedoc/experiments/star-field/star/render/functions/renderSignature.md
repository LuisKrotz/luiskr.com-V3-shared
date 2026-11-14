[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/render](../README.md) / renderSignature

```ts
function renderSignature(dossier, t): Element | null
```

Defined in: experiments/star-field/star/render.tsx:203

Renders the provenance signature — acquisition and translation ISO
dates from the dossier `meta` block, so readers can audit when the
data was pulled and this locale's text produced.

## Parameters

### dossier

[`SFDossier`](../../../engine/types/interfaces/SFDossier.md)

The resolved body dossier.

### t

`Record`\<`string`, `unknown`\>

Locale label map (acquired/translated keys).

## Returns

\| [`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
\| `null`

The signature line, or null without a meta block.
