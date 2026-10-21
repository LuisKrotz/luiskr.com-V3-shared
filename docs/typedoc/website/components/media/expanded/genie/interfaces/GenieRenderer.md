[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie](../README.md) / GenieRenderer

Defined in: website/components/media/expanded/genie.ts:54

One transition backend — `frame` draws the warp at eased funnel
progress `f` after `dt` seconds; false reports a dead surface so the
driver force-settles instead of latching.

## Methods

### frame()

```ts
frame(dt, p): boolean;
```

Defined in: website/components/media/expanded/genie.ts:62

Draws one frame.

#### Parameters

##### dt

`number`

Frame delta seconds.

##### p

`number`

Eased funnel progress 0..1 — 0 = the modal sheet, 1 = the
figure funnel (the driver eases + flips it per direction).

#### Returns

`boolean`

False on a dead surface.

---

### dispose()

```ts
dispose(): void;
```

Defined in: website/components/media/expanded/genie.ts:64

Releases every resource the backend owns (context refs, widget).

#### Returns

`void`
