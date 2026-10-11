[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / askNotifyPermission

```ts
function askNotifyPermission(): Promise<void>;
```

Defined in: cms/media-convert/job.ts:164

Requests Notification permission up front (during run()) so the
completion notification can fire later — no-op unless the permission
is still 'default' (never re-prompts a denied user).

## Returns

`Promise`\<`void`\>
