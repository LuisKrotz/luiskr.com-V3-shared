[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/print](../README.md) / preparePrint

```ts
function preparePrint(host): void
```

Defined in: website/components/carousel/mentions-deck/print.ts:28

Arms the printable form: freezes the posers so no measure/applyPoses
call between the prepare event and the snapshot can restore the fan
geometry the adapter strips. Called from the `printprepare` window
event — inside print.ts's enter pass, before the media/style walk.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
