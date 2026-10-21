[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/burn](../README.md) / disarmCardBurn

```ts
function disarmCardBurn(host, i): void
```

Defined in: website/components/home/mosaic/burn.ts:131

Un-arms the burn by reversing it: the consume front descends and
un-chars the glyphs until the title raster is whole again — the same
effect played backwards, not an instant DOM-ink pop. `prog` captures
where the burn stopped so the front returns from exactly the consumed
edge; frame() runs the teardown once the text is rebuilt. A card with
no session (reduced motion, never armed) restores instantly — safe to
call unconditionally.

## Parameters

### host

[`HomeMosaic`](../../../HomeMosaic/classes/HomeMosaic.md)

The <home-mosaic> component instance.

### i

`number`

The card index inside the mosaic data set.

## Returns

`void`
