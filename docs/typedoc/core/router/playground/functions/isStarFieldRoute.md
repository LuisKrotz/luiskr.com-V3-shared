[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/playground](../README.md) / isStarFieldRoute

```ts
function isStarFieldRoute(routeName?, pathname?): boolean
```

Defined in: core/router/playground.ts:93

True on the star-field experiment route — same resolution order as
[isEarthPlaygroundRoute](isEarthPlaygroundRoute.md).

## Parameters

### routeName?

`string` \| `null`

Resolved route descriptor name, when the caller has one.

### pathname?

`string`

Path to check; defaults to the live `location.pathname`.

## Returns

`boolean`

Whether the route is the star-field experiment.
