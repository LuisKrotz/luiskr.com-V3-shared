[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / navBurgerCanvas

```ts
function navBurgerCanvas(host): HTMLCanvasElement
```

Defined in: website/components/nav/menu.tsx:71

The burger icon's canvas element — lazily created once and kept for
the component's lifetime so its WebGL context is never churned by
re-renders (canvas recreation would force a fresh GL context).
Purely presentational: pointer presses reach its widget click
listener, but keyboard focus and the a11y tree belong to the real
<button> layered under it — a focusable overlay over a focusable
button gave the chip two tab stops, and the canvas's opacity-0 rest
state painted a ring around nothing. Each call still re-syncs the
on-dark class since it changes without recreating the element.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

AppNav instance.

## Returns

`HTMLCanvasElement`

The persistent canvas element.
