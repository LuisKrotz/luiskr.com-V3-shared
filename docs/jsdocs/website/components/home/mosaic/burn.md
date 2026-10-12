# `website/components/home/mosaic/burn.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/mosaic/burn.ts`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `armCardBurn`

Arms the burn on card `i`: inserts the rewrite slot, then mounts the
combustion canvas IMMEDIATELY — the user expects the dissolve the
moment the pointer lands, not after the card's expand ease. The
canvas is measured against the title's hover-instant box and plays
the burn where the glyphs stood while the card grows behind it (the
h2's ink is hidden as soon as the canvas takes over, so the moving
DOM title never shows through). Reduced motion skips the canvas
entirely — the title swap happens instantly.

- `@param` host The <home-mosaic> component instance.
- `@param` i The card index inside the mosaic data set.
- `@param` item The card's mosaic item (label drives the rewrite slot).

### `disarmCardBurn`

Un-arms the burn by reversing it: the consume front descends and
un-chars the glyphs until the title raster is whole again — the same
effect played backwards, not an instant DOM-ink pop. `prog` captures
where the burn stopped so the front returns from exactly the consumed
edge; frame() runs the teardown once the text is rebuilt. A card with
no session (reduced motion, never armed) restores instantly — safe to
call unconditionally.

- `@param` host The <home-mosaic> component instance.
- `@param` i The card index inside the mosaic data set.
