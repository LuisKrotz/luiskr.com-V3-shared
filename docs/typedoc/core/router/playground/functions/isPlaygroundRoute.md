[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/playground](../README.md) / isPlaygroundRoute

```ts
function isPlaygroundRoute(routeName?, pathname?): boolean
```

Defined in: core/router/playground.ts:108

True on either playground-experiment route — the "force dark, no theme
switching" surface test the theme resolver and preferences dialog use.

## Parameters

### routeName?

`string` \| `null`

Resolved route descriptor name, when the caller has one.

### pathname?

`string`

Path to check; defaults to the live `location.pathname`.

## Returns

`boolean`

Whether the route is a playground experiment.
