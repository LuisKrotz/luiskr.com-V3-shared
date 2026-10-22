# `website\components\home\mosaic\interactions.ts`

| | |
|---|---|
| **Source** | `src/website\components\home\mosaic\interactions.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `PROVISIONAL_BOTTOM_H`

Details-panel floor matching mosaic-layout's provisional height.

### `DETAIL_H_PAD`

Measured-height padding beyond the panel's scrollHeight.

### `cardIdxFromEvent`

Resolves the mosaic card element + its data-index from a DOM event.

### `detailEl`

The expanded details panel for card `i`, or null.

### `removeDesc`

Removes the hover-injected description paragraph from card `i`.

### `onHover`

Pointer-enter: expands the card's details region. Two-pass flow —
first layout() with a 130px provisional bottom, then after one frame
the real scrollHeight is measured into bottomHMap and the wall
reflows to its final geometry. npuPredict warms the likely route
(150ms debounce ≈ intentional hover vs cursor passing through).

### `onLeave`

Pointer-leave: clears hover state.

### `projectHref`

Builds the localized destination URL for one mosaic project card.
- `@param` item project metadata containing the route slug
- `@returns` localized portfolio URL, or an empty string without a slug

### `onClick`

Card activation. Desktop: straight to the project route. Touch:
first tap expands the details (records bottomH so the wall reflows),
second tap on the SAME card navigates — the two-tap pattern gives
touch users the hover preview desktop users get for free.
Keyboard/NVDA/Narrator activation synthesizes a click with `detail`
=== 0 (no pointer coordinates) — it must navigate outright, never
queue as a "first tap". 'ontouchstart' in window is true for every
touchscreen laptop, so without this gate Enter only expanded the
card and screen readers announced "no action".

### `cardCenter`

Center point of packed card `i` parsed from its absolute style box.

### `nextCardIdx`

Nearest card in the arrow direction — the packed wall is masonry, so
neighbors are resolved spatially from card centers, not DOM order.
The direction must dominate (dx for left/right, dy for up/down) and
the cross-axis distance is penalized 2× so ArrowDown prefers the card
directly below over a far diagonal.
- `@returns` The target card index, or null at the wall's edge.

### `onCardKeyDown`

Arrow-key navigation — moves focus to the nearest card in the arrow
direction (roving focus over the card anchors; the focusin handler
then expands it exactly like hover). Non-arrow keys pass through.
