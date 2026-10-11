[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/router/navigate](../README.md) / handleNavigation

```ts
function handleNavigation(
   host, 
   path, 
   replace?
): Promise<void>;
```

Defined in: core/router/navigate.ts:130

Full navigation pipeline — the space-playground chunk is preloaded
when navigated to, since it's excluded from the idle route warmer
for size.

## Parameters

### host

[`Router`](../../router/classes/Router.md)

### path

`string`

### replace?

`boolean` = `false`

## Returns

`Promise`\<`void`\>
