[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/types](../README.md) / BurnClasses

Defined in: core/utils/burn/types.ts:14

The class-name contract a host component hands the burn pipeline —
the mosaic's `HOME_MOSAIC_CLASSES` and the card-stack's
`CARD_STACK_CLASSES` each satisfy this shape, so the effect is
portable between card components.

## Properties

### ITEM\_BURNING

```ts
ITEM_BURNING: string
```

Defined in: core/utils/burn/types.ts:16

Modifier toggled on the card while the canvas owns the hover.

---

### ITEM\_BURNED?

```ts
optional ITEM_BURNED?: string;
```

Defined in: core/utils/burn/types.ts:26

Optional modifier published the moment the forward pass has fully
consumed the title. Hosts that supply it relocate the title box in
CSS (the canvas re-anchors to the live box each frame, so the same
session then replays the consume front in reverse at the new
anchor — deposit motes knitting the glyphs back). Removed by
`disarmCardBurn` on un-hover; `teardownBurn` deliberately leaves it
on so the rebuilt title stays at its relocated spot while hovered.

---

### TITLE\_OVERLAY

```ts
TITLE_OVERLAY: string
```

Defined in: core/utils/burn/types.ts:28

Gradient panel the title h2 + burn canvas live inside.

---

### TITLE

```ts
TITLE: string
```

Defined in: core/utils/burn/types.ts:30

The title heading whose ink the canvas replaces.

---

### TITLE\_BURNING

```ts
TITLE_BURNING: string
```

Defined in: core/utils/burn/types.ts:32

Ink-hidden state on the title (color: transparent).

---

### TITLE\_BURN

```ts
TITLE_BURN: string
```

Defined in: core/utils/burn/types.ts:34

The combustion canvas element class.

---

### TITLE\_SLOT

```ts
TITLE_SLOT: string
```

Defined in: core/utils/burn/types.ts:36

Rewrite slot inserted above the details' first child.

---

### TITLE\_DUP

```ts
TITLE_DUP: string
```

Defined in: core/utils/burn/types.ts:38

Invisible spacer keeping the rewrite slot's layout box.

---

### TITLE\_REWRITE

```ts
TITLE_REWRITE: string
```

Defined in: core/utils/burn/types.ts:40

The <draw-text> clone replaying the title in the slot.

---

### DETAILS

```ts
DETAILS: string
```

Defined in: core/utils/burn/types.ts:42

Details container the rewrite slot prepends into.
