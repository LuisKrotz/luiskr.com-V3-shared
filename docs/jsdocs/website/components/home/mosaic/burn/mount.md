# `website\components\home\mosaic\burn\mount.ts`

| | |
|---|---|
| **Source** | `src/website\components\home\mosaic\burn\mount.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `insertTitleSlot`

Inserts the rewrite slot above the description: an aria-hidden spacer
holds the layout space (zero reflow when the clone animates) and a
<draw-text> replays the title. The whole slot is aria-hidden — the
original h2 remains the single a11y source for the title.
- `@param` cardEl The expanded mosaic card.
- `@param` titleText The title string the slot replays.

### `mountBurn`

Mounts the combustion canvas over the title's current box: measures
the h2 and overlay at hover-instant and plays the dissolve exactly
where the glyphs stand. The DOM ink hides as soon as the canvas takes
over, so the card's expand ease running behind it can't double-draw
the title at its moving flex-end position.
- `@param` cardEl The expanded mosaic card.
- `@param` overlay The title overlay element (canvas parent).
- `@param` titleEl The h2 whose ink the canvas replaces.
- `@param` item The card's mosaic item (description length paces the burn).
