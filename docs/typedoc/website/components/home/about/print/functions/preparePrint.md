[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/print](../README.md) / preparePrint

```ts
function preparePrint(host): void
```

Defined in: website/components/home/about/print.ts:60

Arms the printable form: walks the bio paragraphs in DOM order — the
intro statement first, then the profile-text items — and seats each
one's plain text. Runs inside the `printprepare` window event, before
print.ts's media walk, so the fills exist for the snapshot. Skips the
skeleton state outright (no translations means no real copy, and the
shimmer paras print as ruled boxes the sheet already handles).

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The AboutSection element.

## Returns

`void`
