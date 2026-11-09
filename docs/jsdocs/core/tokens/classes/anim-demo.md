# `core\tokens\classes\anim-demo.ts`

Animations-demo stage class tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\anim-demo.ts`                    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ANIM_DEMO_CLASSES`

Frozen anim-demo class-name map — sole declaration site for these
tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `ANIM_DEMO`

Stage root — the framed box the demo renders inside.

### `CANVAS`

Full-stage canvas (shader/2D surfaces).

### `ICON`

Centered icon canvas (burger / close-button widgets).

### `ICON_WRAP`

Sized parent the icon canvas fills — the close widget's resize
observer watches parentElement (in production that IS the button
box), so the canvas can't sit directly on the full-width stage.

### `SCENE`

Generic inner scene wrapper for DOM-staged demos.

### `MENU`

Menu column the items stagger inside.

### `MENU_ITEM`

One menu item bar.

### `MENU_OPEN`

Menu open modifier — items rise/fade in staggered while set.

### `LOADER`

Mini loader overlay.

### `LOADER_RING`

Counter-rotating outer ring.

### `LOADER_RING_INNER`

Counter-rotating inner ring.

### `LOADER_COUNTER`

Percent counter readout.

### `LOADER_BAR`

Progress track under the counter.

### `LOADER_FILL`

ScaleX fill inside the progress track.

### `TOAST`

Toast stack container.

### `TOAST_ITEM`

One toast pill.

### `TOAST_IN`

Slide/fade entrance state.

### `TOAST_OUT`

Slide/fade exit state.

### `CARD`

Demo card the burn session mounts against (carries data-index).

### `CARD_BURNING`

Modifier toggled on the card while the canvas owns the hover.

### `OVERLAY`

Gradient panel the title + burn canvas live inside.

### `TITLE`

The title heading whose ink the canvas replaces.

### `TITLE_BURNING`

Ink-hidden state on the title.

### `TITLE_BURN`

The combustion canvas element.

### `TITLE_SLOT`

Rewrite slot inserted above the details' first child.

### `TITLE_DUP`

Invisible spacer keeping the rewrite slot's layout box.

### `TITLE_REWRITE`

The <draw-text> clone replaying the title in the slot.

### `DETAILS`

Details container the rewrite slot prepends into.

### `TILES`

Tile row container the ring-sheen canvas overlays.

### `TILE`

One demo tile.

### `TILE_HOVER`

Hover-state modifier driving the lift/zoom spring.

### `DIVIDER`

The <hr> the sheen travels.

### `BUTTON`

The bracketed action button.

### `BUTTON_HOVER`

Hover-state modifier expanding the corner brackets.

### `STRIP`

Clip viewport the track scrolls inside.

### `TRACK`

Translating slide track.

### `SLIDE`

One slide card.

### `PROGRESS`

Progress rail under the strip.

### `PROGRESS_FILL`

ScaleX fill inside the rail.

### `GLOW`

Surface whose ::before drifts the ambient glow wash.

### `BAR`

The bar element.

### `BAR_ACTIVE`

In-flight crawl state (scaleX → ~70%).

### `BAR_DONE`

Completion state (sweep to 100% + fade).

### `ORIGIN`

The trigger origin dot the dialog zooms from.

### `BACKDROP`

Backdrop carrying the enter/leave modifiers.

### `BACKDROP_ENTER`

Enter modifier — collapsed start state.

### `BACKDROP_LEAVE`

Leave modifier — collapse-back state.

### `DIALOG`

Dialog panel the genie transforms.

### `SKEL`

Content block holding the skeleton placeholders.

### `FLAG`

Flag widget canvas (waving flag, natural aspect).

### `SWITCH`

Switch slider widget canvas (54×28 pill).

### `THEME`

Theme slider widget canvas (280×64 track).

### `TILE_INNER`

Inner face of a demo tile (the sheen masks sit on the tile itself).

### `DIALOG_TEXT`

Placeholder line inside the genie dialog panel.

### `DRAW`

The <draw-text> replay element inside a demo stage.

### `FIGURE`

The <media-figure> sizing wrapper.

### `FAN`

Perspective scene the fanned cards deal through.

### `FAN_CARD`

One fanned card — slot comes from data-index (-2…2).

### `CHIPS`

Chip row the aura sweeps across.

### `CHIP`

One chip tile carrying the ring-fill trail.

### `CHIP_ARMED`

Armed modifier — the comet trail sweeps while set.

### `PANES`

Stacked mini "pages" that cross-fade.

### `PANE`

One page pane.

### `PANE_GONE`

Hidden modifier — the outgoing page fades to 0.

### `SEARCH`

The search field bar.

### `SEARCH_ICON`

The submit glyph — spins while loading.

### `SEARCH_TEXT`

The typed-query text bar inside the field.

### `SEARCH_DOTS`

Found-dots row — bounces while loading.

### `SEARCH_DOT`

One found dot.

### `SEARCH_LOADING`

Loading modifier on the field.

### `STRIP_PROJECT`

Project-carousel variant of the strip — wider, taller slides.

### `DECK`

The stacked deck.

### `DECK_CARD`

One deck card — stack slot comes from data-index (0 = front).

### `DECK_GONE`

Swipe-away modifier — the front card flies out before re-seating.

### `MODAL`

The lightbox panel.

### `MODAL_SPIN`

The spinner disc.

### `MODAL_SHEEN`

The shimmer wash sweeping the panel.

### `MODAL_READY`

Ready modifier — loading visuals hand off to the sheen.

### `FEED`

The staged feed anchor — carries the real feedGlyph the driver
prepends; the wave arcs pulse in CSS.

### `ELEMENT`

Host class on a mounted production element (card-stack,
mentions-deck, awards-carousel, custom-carousel, about-section) —
the element owns its internals; the class only frames the host
box inside the stage.
