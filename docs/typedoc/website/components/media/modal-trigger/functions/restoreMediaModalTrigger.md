[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/media/modal-trigger](../README.md) / restoreMediaModalTrigger

```ts
function restoreMediaModalTrigger(): void
```

Defined in: website/components/media/modal-trigger.ts:32

Runs the registered trigger-restore closure, then clears it — one-shot:
a stale closure must never fire on the next unrelated modal close.

## Returns

`void`
