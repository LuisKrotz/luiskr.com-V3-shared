[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/print](../README.md) / preparePrint

```ts
function preparePrint(host): void
```

Defined in: website/components/home/cardstack/print.ts:118

Arms the printable form: freezes the posers and fills every card's
description slot with its item copy. Called from the `printprepare`
window event — inside print.ts's enter pass, before the media walk
strips inline styles, so no poser may run between freeze and strip.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
