[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / openNavMenu

```ts
function openNavMenu(host): void;
```

Defined in: website/components/nav/menu.tsx:125

Opens the menu: flips the state flags and re-renders — the new DOM
mounts the menu canvases, then onUpdated → mountNavMenuWebGL attaches
the widgets. Scroll-lock is handled by the CSS class on the wrapper.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

## Returns

`void`
