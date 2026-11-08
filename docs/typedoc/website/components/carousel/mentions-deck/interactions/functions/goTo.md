[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/interactions](../README.md) / goTo

```ts
function goTo(host, idx): void
```

Defined in: website/components/carousel/mentions-deck/interactions.ts:39

Moves the strip's virtual front to `idx` — ring-normalized, so out-of-range
indices wrap like a carousel loop does. The pose write runs with CSS
transitions enabled (the --dragging class is absent outside a live
gesture) so every card glides along the strip to its new slot. Any
running autoplay dwell re-bases so a manual nav always gets a full dwell.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### idx

`number`

Target deck index — wraps via modulo.

## Returns

`void`
