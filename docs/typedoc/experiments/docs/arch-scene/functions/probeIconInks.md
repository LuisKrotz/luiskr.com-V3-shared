[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / probeIconInks

```ts
function probeIconInks(host, kinds): Map<string, number[] | null>
```

Defined in: experiments/docs/arch-scene.ts:848

Per-kind ink probe — the map colors file nodes with the EXACT ink
the treeview icon pack paints that extension's glyph, sampled off
`docs-tree-icon docs-tree-icon--<kind>` probe elements parked inside
the portal's shadow root (icon SCSS is shadow-scoped; probes must
live inside it for --icon-ink to resolve). `hidden` keeps the probe
invisible — custom properties still compute. Returns null entries
for unparseable/no-stylesheet environments (tests) — callers fall
back to the dir accent ink.

## Parameters

### host

`Element`

Element inside the .docs shadow tree (canvas's parent).

### kinds

readonly `string`[]

Distinct icon kinds to sample.

## Returns

`Map`\<`string`, `number`[] \| `null`\>
