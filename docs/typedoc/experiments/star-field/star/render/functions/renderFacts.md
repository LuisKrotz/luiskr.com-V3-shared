[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/render](../README.md) / renderFacts

```ts
function renderFacts(dossier): Element
```

Defined in: experiments/star-field/star/render.tsx:72

Renders the dossier facts list — one row per {label,value} pair. A
malformed dossier payload renders the rest of the panel instead of
crashing the whole view.

## Parameters

### dossier

[`SFDossier`](../../../engine/types/interfaces/SFDossier.md)

The resolved body dossier.

## Returns

[`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)

The facts `<dl>` element.
