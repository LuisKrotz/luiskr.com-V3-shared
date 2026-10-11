[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / mountNavBurgerWebGL

```ts
function mountNavBurgerWebGL(host): void;
```

Defined in: website/components/nav/menu.tsx:179

Attaches BurgerButtonWebGL to the persistent burger canvas — or tears
it down when the canvas left the DOM (menu states that remove the
burger, e.g. 404). Idempotent: a live widget is never re-created.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

## Returns

`void`
