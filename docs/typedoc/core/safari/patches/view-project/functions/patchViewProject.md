[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/safari/patches/view-project](../README.md) / patchViewProject

```ts
function patchViewProject(): void;
```

Defined in: core/safari/patches/view-project.ts:30

Installs the view-project Safari patch once the element registers:
replaces `_updateModalDOM` with the lifted-dialog variant and wraps
`onDestroy` so a modal lifted into document.body is reaped when the
view unmounts (otherwise it orphans on top of the next page).

## Returns

`void`
