[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / Subscriber

```ts
type Subscriber = (_state) => void;
```

Defined in: core/store/state.ts:139

Subscriber callback — invoked by notify() with the state bag after every
commit that didn't suppress notification.

## Parameters

### \_state

[`StoreState`](../interfaces/StoreState.md)

The post-mutation state.

## Returns

`void`
