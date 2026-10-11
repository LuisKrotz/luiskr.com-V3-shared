[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/dev/firebase-mock](../README.md) / onAuthChange

```ts
function onAuthChange(cb): Promise<() => void>;
```

Defined in: cms/dev/firebase-mock.ts:158

Mock onAuthChange — immediately reports the signed-in mock user and
returns a no-op unsubscribe.

## Parameters

### cb

(`_user`) => `void`

The auth-state callback.

## Returns

`Promise`\<() => `void`\>
