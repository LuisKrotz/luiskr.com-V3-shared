[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/notify](../README.md) / notifyError

```ts
function notifyError(opts?): Promise<false | "native" | "toast">;
```

Defined in: core/utils/notify.ts:194

Generic failure shortcut — the localized "something went wrong" string.
Used by global handlers where the raw error detail belongs in the devlog
buffer (`core/devlog.ts`), not on screen.

## Parameters

### opts?

[`NotifyOpts`](../interfaces/NotifyOpts.md) = `{}`

## Returns

`Promise`\<`false` \| `"native"` \| `"toast"`\>
