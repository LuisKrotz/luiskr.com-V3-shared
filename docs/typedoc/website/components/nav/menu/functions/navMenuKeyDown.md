[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / navMenuKeyDown

```ts
function navMenuKeyDown(host, e): boolean
```

Defined in: website/components/nav/menu.tsx:351

Arrow/Home/End roving inside the open overlay — Up/Left step back,
Down/Right step forward (both wrap), Home/End jump to the ends. The
anchor currently holding focus is the step origin; focus anywhere
else (burger, document body) starts the wrap from the edges.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

AppNav instance.

### e

`KeyboardEvent`

The keydown event routed by the component's window listener.

## Returns

`boolean`

True when the key was consumed — callers preventDefault only
for handled keys so all other keys keep their native behavior.
