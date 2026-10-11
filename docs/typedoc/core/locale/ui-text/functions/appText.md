[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/locale/ui-text](../README.md) / appText

```ts
function appText(path): unknown;
```

Defined in: core/locale/ui-text.ts:41

Resolves a UI string from the live APP dictionary (store.lang.app, loaded
from Firebase for the current locale) with the English snapshot as fallback.

## Parameters

### path

`string`

dotted path, e.g. 'media.preview' or 'pref.devTools.showGrid'

## Returns

`unknown`
