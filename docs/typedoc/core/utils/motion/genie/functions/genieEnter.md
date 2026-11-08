[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/genie](../README.md) / genieEnter

```ts
function genieEnter(component, classes?): void
```

Defined in: core/utils/motion/genie.ts:54

Genie open/close shared by the preferences, language and search dialogs.
The dialog scales from the control that opened it (store.modalOrigin) and
zooms back into it on close. Honors reduced motion (instant).

## Parameters

### component

`GenieHost`

host exposing the shadow-scoped `$` helper

### classes?

[`GenieClasses`](../interfaces/GenieClasses.md) = `PREF_GENIE_CLASSES`

class contract — defaults to the preferences dialog set

## Returns

`void`
