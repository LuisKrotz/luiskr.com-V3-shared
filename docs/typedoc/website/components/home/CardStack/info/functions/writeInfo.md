[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/info](../README.md) / writeInfo

```ts
function writeInfo(host): void
```

Defined in: website/components/home/cardstack/info.ts:391

Publishes the front card's copy into the text column without a
re-render — the title burns out/in, the description writer re-types,
and the "Check out" link follows the new route (`hidden` when the
item has none, so no dead link stays focusable). On stacked tiers
the same burn also fires on the in-card project titles.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
