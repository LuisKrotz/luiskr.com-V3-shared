[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / toggleNavMenu

```ts
function toggleNavMenu(host, e?, chip?): void
```

Defined in: website/components/nav/menu.tsx:117

Opens/closes the fullscreen menu overlay. The joust gate applies to the
closed → open edge only: on hover-less input the first pointer tap on a
collapsed chip pours the menu label out instead of opening the overlay,
and the second tap opens it. While the menu is already open the close
path stays single-tap — the gate is skipped entirely.

## Parameters

### host

[`NavMenuHost`](../interfaces/NavMenuHost.md)

AppNav instance.

### e?

`Event`

The click event from the fallback button or label span (absent
for programmatic toggles — those always fire).

### chip?

`Element` \| `null`

Explicit gate element for event-less callers — the burger
canvas widget's click callback passes its canvas so the wrap still
resolves through `closest`.

## Returns

`void`
