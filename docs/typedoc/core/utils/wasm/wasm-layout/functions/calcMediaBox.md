[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcMediaBox

```ts
function calcMediaBox(naturalW, naturalH, boundW, boundH): object
```

Defined in: core/utils/wasm/wasm-layout.ts:326

Capped media box in px: natural dims multiplied by calcMediaScale —
the largest box that both fits the bounds and never exceeds the
source's natural size. Used to mirror the CSS min(--mf-_, --mf-natural-_)
caps in JS projections (carousel fit measurement) so the side-by-side
decision and the published slide heights match the rendered layout.

## Parameters

### naturalW

`number`

Source file width in px.

### naturalH

`number`

Source file height in px.

### boundW

`number`

Layout width bound in px.

### boundH

`number`

Layout height bound in px.

## Returns

`object`

box in px, or 0×0 for degenerate input.

### width

```ts
width: number
```

### height

```ts
height: number
```
