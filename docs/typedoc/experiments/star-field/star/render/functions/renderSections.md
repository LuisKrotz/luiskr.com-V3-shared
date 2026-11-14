[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/render](../README.md) / renderSections

```ts
function renderSections(dossier): Element | null
```

Defined in: experiments/star-field/star/render.tsx:180

Renders the dossier's named prose sections — deep-history bodies carry
titled subsections (formation, exploration, geology…) between the
summary paragraph and the media gallery.

## Parameters

### dossier

[`SFDossier`](../../../engine/types/interfaces/SFDossier.md)

The resolved body dossier.

## Returns

\| [`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
\| `null`

The sections wrapper, or null when none exist.
