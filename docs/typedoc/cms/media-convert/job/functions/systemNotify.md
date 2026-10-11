[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / systemNotify

```ts
function systemNotify(title, body): void;
```

Defined in: cms/media-convert/job.ts:148

Fires an OS-level Notification when permission is already granted —
silent no-op otherwise (the in-app toast always runs too, so this is a
progressive enhancement for backgrounded tabs).

## Parameters

### title

`string`

Notification title.

### body

`string`

Notification body text.

## Returns

`void`
