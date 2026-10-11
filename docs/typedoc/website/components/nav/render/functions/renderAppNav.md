[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/components/nav/render](../README.md) / renderAppNav

```ts
function renderAppNav(nav): 
  | ""
  | Element;
```

Defined in: website/components/nav/render.tsx:43

Renders the <app-nav> template: logo, burger strip, and the fullscreen
menu overlay. Returns '' while the media-expand modal is open — an empty
render wipes the nav DOM so its z-index/focus can never compete with the
modal chrome. The CTA label chain (contact → selected work at page bottom →
related on project routes) mirrors the menu item order.

## Parameters

### nav

[`AppNav`](../../AppNav/classes/AppNav.md)

AppNav instance — reads its getters/state, calls delegates.

## Returns

  \| `""`
  \| [`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)

JSX tree, or '' while a modal owns the screen.
