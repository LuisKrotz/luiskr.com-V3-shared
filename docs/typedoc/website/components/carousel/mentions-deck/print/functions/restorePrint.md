[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/print](../README.md) / restorePrint

```ts
function restorePrint(host): void
```

Defined in: website/components/carousel/mentions-deck/print.ts:40

Tears the printable form down: the poser gate drops and applyPoses()
re-writes the strip geometry print.ts stripped (its exit pass also
restores recorded attrs — re-posing lands on the same values, so
listener order between exit() and this pass doesn't matter).
Idempotent — both restore channels may fire for one job.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
