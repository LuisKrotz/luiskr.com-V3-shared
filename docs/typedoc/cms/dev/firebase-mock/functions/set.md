[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/dev/firebase-mock](../README.md) / set

```ts
function set(r, v): Promise<void>;
```

Defined in: cms/dev/firebase-mock.ts:119

Mock of firebase/database `set()` — persists the write to the local
overlay via the dev middleware, so CMS edits survive reloads.

## Parameters

### r

`MockRef`

Target ref.

### v

`unknown`

Value that would be written.

## Returns

`Promise`\<`void`\>
