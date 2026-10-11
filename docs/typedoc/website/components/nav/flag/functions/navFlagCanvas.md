[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/components/nav/flag](../README.md) / navFlagCanvas

```ts
function navFlagCanvas(host): HTMLCanvasElement;
```

Defined in: website/components/nav/flag.tsx:43

Returns the persistent flag canvas for the current locale, rebuilding
it only when the locale changed — a new canvas means a new GL context,
so the old widget is destroyed first to keep total contexts bounded.

## Parameters

### host

[`NavFlagHost`](../interfaces/NavFlagHost.md)

AppNav instance.

## Returns

`HTMLCanvasElement`

The per-locale canvas element.
