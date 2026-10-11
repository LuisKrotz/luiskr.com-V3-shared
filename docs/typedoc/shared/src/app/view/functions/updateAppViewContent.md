[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [shared/src/app/view](../README.md) / updateAppViewContent

```ts
function updateAppViewContent(
   c, 
   to?, 
   _from?
): void;
```

Defined in: shared/src/app/view.ts:29

Route-change reconciliation for the view outlet: when the target view
tag equals the mounted one (and the element is actually defined), the
view is kept alive and told about the new route via onRouteParamChange —
project→project navigation must not tear down GL state. A tag change
delegates to _flipToView for the swap.

## Parameters

### c

[`AppRoot`](../../../App/classes/AppRoot.md)

The AppRoot element.

### to?

[`RouteDescriptor`](../../../../../core/router/types/interfaces/RouteDescriptor.md)

Destination descriptor (falls back to router.currentRoute).

### \_from?

  \| [`RouteDescriptor`](../../../../../core/router/types/interfaces/RouteDescriptor.md)
  \| `null`

Origin descriptor — unused, kept for listener parity.

## Returns

`void`
