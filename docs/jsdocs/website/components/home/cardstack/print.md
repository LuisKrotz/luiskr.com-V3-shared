# `website\components\home\cardstack\print.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\print.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `sectionsText`

Flattens a project node's `sections` into ordered body paragraphs —
each section's children are either a `string[]` text row or a media
row, and only the text rows print: the feature copy the internal
page shows on desktop, not the card's short portfoliolist blurb.

- `@param` data The resolved `projects/<slug>` node.
- `@returns` Paragraph strings in document order; empty for any other shape.

### `warmPrintCopy`

Idle-warms each deck item's `projects/<slug>` node into
`host._printCopy` — one boot chunk resolves every project, and the
db layer dedups the reads, so the loop costs a single lazy import.
Runs off the critical path (idle slice): the fill falls back to the
card blurb whenever the feature copy hasn't resolved by print time.
Re-arms on every call — a locale swap clears resolved entries so
paper never mixes languages.

- `@param` host The CardStack element.

### `preparePrint`

Arms the printable form: freezes the posers and fills every card's
description slot with its item copy. Called from the `printprepare`
window event — inside print.ts's enter pass, before the media walk
strips inline styles, so no poser may run between freeze and strip.

- `@param` host The CardStack element.

### `restorePrint`

Tears the printable form down: the poser gate drops first, the
injected description fills leave the shadow DOM, and applyPoses()
re-writes the fan geometry print.ts stripped (its exit pass also
restores recorded attrs — re-posing lands on the same values, so
listener order between exit() and this pass doesn't matter).
Idempotent — both restore channels may fire for one job.

- `@param` host The CardStack element.
