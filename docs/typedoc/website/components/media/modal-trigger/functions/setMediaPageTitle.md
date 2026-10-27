[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/media/modal-trigger](../README.md) / setMediaPageTitle

```ts
function setMediaPageTitle(label): void
```

Defined in: website/components/media/modal-trigger.ts:46

Appends the media label to document.title while its deep-link URL is
in the address bar — a /portfolio/<p>/<media> URL names its own asset
(watch page), so the live title mirrors the emitted page's
"… | <label>" <title>. The pre-modal title parks once (a second open
never stacks suffixes) for restoreMediaPageTitle to hand back.

## Parameters

### label

`string`

— the media item's caption/label.

## Returns

`void`
