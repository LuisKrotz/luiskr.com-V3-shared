[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/dom/joust](../README.md) / joustClick

```ts
function joustClick(e): boolean
```

Defined in: core/utils/dom/joust.ts:167

Event-flavored gate for DOM click handlers — resolves the chip from
`currentTarget` and derives pointer-vs-keyboard from `detail`, so a
single call slots in front of an existing handler:
`if (!joustClick(e)) return`.

## Parameters

### e

`Event` \| `null` \| `undefined`

The click event (undefined for programmatic calls → fires).

## Returns

`boolean`

True = run the action; false = the click jousted the label open.
