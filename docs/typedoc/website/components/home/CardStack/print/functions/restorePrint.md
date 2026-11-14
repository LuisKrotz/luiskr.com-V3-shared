[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/print](../README.md) / restorePrint

```ts
function restorePrint(host): void
```

Defined in: website/components/home/cardstack/print.ts:186

Tears the printable form down: the poser gate drops first, the
injected description fills leave the shadow DOM, and applyPoses()
re-writes the fan geometry print.ts stripped (its exit pass also
restores recorded attrs — re-posing lands on the same values, so
listener order between exit() and this pass doesn't matter).
Idempotent — both restore channels may fire for one job.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
