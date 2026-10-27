[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/panel-render](../README.md) / renderSpAction

```ts
function renderSpAction(act, t): Element
```

Defined in: experiments/earth-playground/space/panel-render.tsx:135

One group-level action button (reset view / screenshot / copy settings).
Preceded by a sr-only h4 — every action is a heading so AT heading-jump
lists it like the controls; the button carries a describedby technical
line naming the dispatched action token.

## Parameters

### act

[`SpAction`](../../controls/interfaces/SpAction.md)

### t

`Record`\<`string`, `unknown`\>

## Returns

[`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
