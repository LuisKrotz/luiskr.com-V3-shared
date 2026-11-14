[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/playground](../README.md) / isEarthPlaygroundRoute

```ts
function isEarthPlaygroundRoute(routeName?, pathname?): boolean
```

Defined in: core/router/playground.ts:74

True on the earth-playground route (or its space-playground alias).
The resolved route name is checked first — the fast path covers the
window before the URL's last segment re-resolves — then the last
segment falls back through canonical segments and every locale's
localized slug.

## Parameters

### routeName?

`string` \| `null`

Resolved route descriptor name, when the caller has one.

### pathname?

`string`

Path to check; defaults to the live `location.pathname`.

## Returns

`boolean`

Whether the route is the earth playground.
