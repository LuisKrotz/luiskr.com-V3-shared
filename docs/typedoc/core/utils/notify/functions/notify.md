[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/notify](../README.md) / notify

```ts
function notify(message, opts?): Promise<false | "native" | "toast">;
```

Defined in: core/utils/notify.ts:151

Surfaces a message to the user — native notification when allowed, the
in-page toast otherwise.

## Parameters

### message

`string`

body copy (localized by the caller)

### opts?

[`NotifyOpts`](../interfaces/NotifyOpts.md) = `{}`

## Returns

`Promise`\<`false` \| `"native"` \| `"toast"`\>

which surface took the message
