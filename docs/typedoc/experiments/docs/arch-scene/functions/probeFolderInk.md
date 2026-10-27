[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / probeFolderInk

```ts
function probeFolderInk(host): number[] | null
```

Defined in: experiments/docs/arch-scene.ts:886

Folder-ink probe — directory glyphs wear the treeview folder's own
`color` (the reference pack's gold), sampled off a `--folder` probe
span parked inside the portal's shadow root. The custom property
resolves to `currentColor` there, so the seam ink comes from the
computed text color — the real resolved rgb. Returns null where
styles can't compute (tests) — callers fall back to the accent ink.

## Parameters

### host

`Element`

Element inside the .docs shadow tree (canvas's parent).

## Returns

`number`[] \| `null`

[r,g,b] 0-1 channels, or null.
