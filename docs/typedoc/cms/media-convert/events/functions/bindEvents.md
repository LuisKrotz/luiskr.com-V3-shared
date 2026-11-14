[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: cms/media-convert/events.ts:19

Binds the media-converter's events — the drop-zone drag trio
(dragover paints the `--over` state, dragleave clears it only when the
pointer leaves the zone itself, drop collects the DataTransfer), the
hidden file input, and the single-purpose buttons: run/reset, tools
install + recheck, clear queue, and the ZIP download that deletes the
server job after a short grace period.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

— the host component exposing `addScopedListener` + `$`/`$$`

## Returns

`void`
