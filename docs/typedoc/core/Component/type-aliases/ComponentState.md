[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/Component](../README.md) / ComponentState

```ts
type ComponentState = Record<string, any>;
```

Defined in: core/Component.ts:48

Component state bag — keys are declared per-component and narrowed by
each subclass's own types; `any` is deliberate (unknown would force a
cast at every read site).
