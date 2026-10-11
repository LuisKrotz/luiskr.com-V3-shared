[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/deploy-info/data](../README.md) / loadReports

```ts
function loadReports(host): Promise<void>;
```

Defined in: cms/deploy-info/data.ts:37

Fetches the manifest then all five reports in parallel — the index
is the gate (missing bundle → "run yarn deploy:info" hint), each
report degrades independently so a partial bundle still renders.

## Parameters

### host

[`CmsDeployInfo`](../../CmsDeployInfo/classes/CmsDeployInfo.md)

## Returns

`Promise`\<`void`\>
