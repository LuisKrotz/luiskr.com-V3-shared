[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [shared/src/app/types](../README.md) / RoutableView

```ts
type RoutableView = Element & object;
```

Defined in: shared/src/app/types.ts:40

A mounted view element that may implement onRouteParamChange — the
outlet calls it when a same-tag route updates params (project→project
navigation reuses the element).

## Type Declaration

### onRouteParamChange?

```ts
optional onRouteParamChange?: (_route) => void;
```

#### Parameters

##### \_route

  \| [`RouteDescriptor`](../../../../../core/router/types/interfaces/RouteDescriptor.md)
  \| `null`

#### Returns

`void`
