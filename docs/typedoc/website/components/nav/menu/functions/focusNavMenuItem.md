[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / focusNavMenuItem

```ts
function focusNavMenuItem(host, idx): void
```

Defined in: website/components/nav/menu.tsx:333

Moves focus to a menu item by index, wrapping past the ends. No-op
while the overlay is closed — the items only exist in the open
render, so an empty list is the whole guard.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

AppNav instance.

### idx

`number`

Target item index (negative/over-length values wrap).

## Returns

`void`
