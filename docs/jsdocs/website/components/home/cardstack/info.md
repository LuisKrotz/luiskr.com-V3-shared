# `website\components\home\cardstack\info.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\info.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `BURN_CLS`

The class-name contract the burn pipeline runs against — the text
column doubles as the title overlay (the combustion canvas anchors
inside it) and the details container. ITEM_BURNED stays undefined so
the rebuild flip is driven by the swap callback instead of a class.

### `projectHref`

Localized destination URL for one project card — the language prefix
rides in front of /portfolio/<slug> on every non-English locale.

- `@param` item Project metadata containing the route slug.
- `@returns` Localized portfolio URL, or an empty string without a slug.

### `SUMMARY_CUT`

The first-sentence cut for the in-card summary — a sentence ender
(`.`, `!`, `?`) followed by whitespace/markup/end-of-string, or a
`<br>`/newline break. CMS descriptions lead with a one-line project
brief, so the first sentence IS the mobile summary.

### `mobileSummary`

The stacked-card summary of a CMS description — the text up to the
first sentence ender (the ender kept) or the first markup break.
The full description stays mounted in the desktop text column on
every tier (visually hidden on stacked layouts but present in the
DOM), so search engines index the long-form copy as the canonical
description while the card copy reads as its summary — same content
at two lengths, both valid. A description with no sentence break
passes through whole (the ≤4-line CSS clamp bounds the visual box).

- `@param` body The full CMS description (may carry `<br>` markup).
- `@returns` The leading-sentence summary, or the input unchanged when

### `cardInfo`

Everything the text column shows for one item.

- `@param` item The portfolio item (undefined before data lands).
- `@returns` The column copy — all-empty for a missing item.

### `setSlotText`

Re-targets one column slot's <draw-text> writer. Writing a new `text`
attribute replays the writer (DrawText resets + re-triggers on text
change); an unchanged value is a no-op there, so re-publishing the
same front never re-types. An empty text hides the whole slot — an
inline wrapper with no text would still take a line-height of room.

- `@param` host The CardStack element.
- `@param` sel The slot's selector.
- `@param` text The slot's new text.

### `burnTitle`

Publishes the next project name on the title — the paper-burn owns
the transition: the live session (or a freshly mounted one) consumes
whatever raster it holds, then at the consume beat the DOM text swaps
and the session flips into rebuild — `lastBox` is cleared so
syncPaper re-rasterizes the NEW title and deposit motes knit it back.
A live session is re-armed rather than stacked: mid-consume navs just
re-aim the beat to the latest name, and a mid-rebuild nav flips back
to consume from exactly where the knit left off (the same rebasing
armCardBurn applies on re-hover). Reduced motion or a degenerate box
(hidden column, zero rect) swaps instantly.

- `@param` host The CardStack element.
- `@param` item The item the burn paces itself on (description length).
- `@param` next The title text to land on.

### `CARD_BURN_CLS`

The burn contract for the in-card project title — the card element
doubles as the session host and the canvas overlay (it is already
absolutely positioned, so it is the containing block the canvas
anchors to). ITEM_BURNED stays undefined: each card's title is
fixed text, so the burn only knits in / consumes — never swaps.

### `_burnFront`

The card element that held the front on the previous chrome pass —
the card whose in-card title burns OUT on the next nav. Keyed by host
so a re-rendered deck resets the baseline.

### `burnCardTitles`

The in-card paper-burn on stacked tiers — the front card's title
knits IN (the loop runs dir −1 from prog 1: deposit motes rebuild
the glyphs, then teardown hands the pristine raster back to the DOM
ink), and the card that just left the front burns OUT (the default
forward consume) as it slides into the pile. Live sessions flip
direction rather than stack: a card mid-knit that loses the front
re-consumes from the knit point, and a consumed session knits back
when its card returns. Reduced motion or a degenerate box leaves
the title's plain ink.

- `@param` host The CardStack element.

### `holdBurns`

Scroll-visibility hold for every burn session the deck owns — the
in-card title knits/consumes AND the text column's burn swap. The
section's IntersectionObserver calls it with the inverse of
isIntersecting: a hold cancels each live session's rAF in place
(prog/dir survive — the knit freezes exactly where it was, which
also stops an off-screen mount's first frame spending the draw-in
before the user ever sees it), and a release re-arms any session
still active so the draw animation plays out on the frame the
deck scrolls back into view. Sessions that already ran to
completion (`active` false) stay parked — a finished burn must not
resurrect on re-entry.

- `@param` host The CardStack element.
- `@param` held True while the section is off-screen.

### `writeInfo`

Publishes the front card's copy into the text column without a
re-render — the title burns out/in, the description writer re-types,
and the "Check out" link follows the new route (`hidden` when the
item has none, so no dead link stays focusable). On stacked tiers
the same burn also fires on the in-card project titles.

- `@param` host The CardStack element.
