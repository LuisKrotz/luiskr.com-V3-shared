[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/firebase](../README.md) / getDbInstance

```ts
function getDbInstance(): Promise<Database>;
```

Defined in: core/firebase.ts:105

Lazily imports firebase/database once and returns the shared RTDB
instance. Only needed by the CMS write path — public reads use REST.

## Returns

`Promise`\<`Database`\>

The Database instance bound to `app`.
