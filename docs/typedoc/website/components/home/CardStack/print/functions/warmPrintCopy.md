[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/print](../README.md) / warmPrintCopy

```ts
function warmPrintCopy(host): void
```

Defined in: website/components/home/cardstack/print.ts:73

Idle-warms each deck item's `projects/<slug>` node into
`host._printCopy` — one boot chunk resolves every project, and the
db layer dedups the reads, so the loop costs a single lazy import.
Runs off the critical path (idle slice): the fill falls back to the
card blurb whenever the feature copy hasn't resolved by print time.
Re-arms on every call — a locale swap clears resolved entries so
paper never mixes languages.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
