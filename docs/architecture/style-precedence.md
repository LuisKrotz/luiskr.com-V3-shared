# Style precedence

Which declaration wins when sizing/geometry sources collide. The
numbers themselves live in [sizing.md](sizing.md); fit behavior in
[fitting.md](fitting.md). The project's `!important` ban means every
precedence relationship below is **engineered** — through channel
ownership, sheet order, specificity, or source order — never forced.

## Value precedence — where a length comes from

When several sources could size the same box, they resolve in this
order (last wins):

```
token default  <  :root var  <  themed/contextual var  <  JS-published var  <  inline style
```

| Layer                   | Example                                                                                                                 | Beaten by                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Compile-time token      | `$space-md`, `CARD_W_MIN`                                                                                               | Everything — it is the default      |
| `:root` custom property | `--space-md`, `--z-modal-*`, themed surface vars                                                                        | A contextual override or JS publish |
| Contextual var          | `:host-context(.internal-extra-item)` vars, dark-theme surface vars                                                     | JS publish on the same element      |
| JS-published var        | `--carousel-media-height`, `--about-picture-w`, `--rs-list-avail`, `--genie-x/y`, `--mf-natural-*`, `--cookie-banner-h` | Nothing below it except inline      |
| Inline style            | `style.width`, `style.aspectRatio`, `style.transform`                                                                   | Final — JS owns it outright         |

Two rules keep the chain safe:

- **Fallbacks declare the default** — `var(--cover-max-h, 80vh)`,
  `var(--mf-h, auto)`, `var(--rs-list-avail, 100dvh)`: the literal
  fallback is the design value, the var is the measured refinement.
  Pre-JS-paint always has a sane box.
- **JS publishes on the nearest host** — a var is scoped to the subtree
  it describes (figure vars on the figure, strip vars on the carousel
  host), so two components never collide on one name.

## Stylesheet precedence

| Context                  | Mechanism                                          | Order rule                                                                                                                |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Document                 | `<link>`ed sheets (structure manifest)             | Manifest order; component-level document sheets come after `structure/` tokens                                            |
| Shadow root              | `adoptedStyleSheets`                               | `BASE_HOST_STYLES` first, component sheet after — component rules win at equal specificity                                |
| Multi-sheet components   | Concatenated `?inline` strings                     | `super(`${a}\n${b}\n${c}`)` — later sheets win at equal specificity (MediaFigure: `media-figure` → `internals` → `modal`) |
| Conditional patch sheets | Extra `?inline` adopted on demand (Safari patches) | Appended last — the patch wins over the base sheet it corrects                                                            |

## Selector precedence conventions

- **BEM specificity discipline** — one class per concept (`block`,
  `block--mod`, `block__el`); overrides compose via `&--modifier` from
  the same root so specificity stays flat and predictable.
- **Source order is the deliberate override** — at equal specificity
  the later declaration wins, and the codebase _uses_ this instead of
  specificity wars:
  - the ≤1024 half-natural block is declared **after** the general
    media rules so it wins on mobile;
  - `cqw` container-query blocks come **after** the `vw` ladder so
    element-relative sizing wins once a container exists;
  - `.--loaded` terminal states are declared after the skeleton rules
    they retire;
  - internal carousel overrides re-declare symmetric padding/margins
    **after** the generic `:first-child/:last-child` gutter rules that
    would remove them.
- **`:host` vs `:host-context()`** — `:host` sizes the element's own
  box; `:host-context(ancestor)` restyles it for a slot it landed in
  (`.internal-extra-item` inside a carousel). The context selector is
  more specific by construction — placement beats identity.
- **Attribute selectors** — `[fit]` on draw-text, `[classes*='…']`
  context fallbacks on media-figure ride the same flat specificity;
  the attribute is the mode switch.
- **The `revert` vs `initial` trap** — on a custom property `initial`
  is the _guaranteed-invalid value_: it severs inheritance (a slide
  whose `--carousel-media-height: initial` loses the host's published
  strip height and falls back to natural sizing — the ragged-heights
  bug). `revert` drops the declaration instead so the published value
  inherits down. "Back to designed" is always `revert` or
  re-declaration — never `initial` on geometry vars.

## Conditional override precedence

| Layer                     | Mechanism                                                     | Wins over                                                                   |
| ------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Dark mode                 | `[data-theme="dark"]` `:root` var overrides                   | Light tokens — components never branch                                      |
| Forced colors             | `forced-colors` media blocks                                  | Theme vars — system colors win for a11y                                     |
| Reduced motion            | `prefers-reduced-motion` blocks + store getter                | Animation/transition declarations; also vetoes autoplay/genie/deck autoplay |
| Cyrillic                  | `lang`-keyed font overrides                                   | Base font tokens                                                            |
| Safari patch              | Appended `?inline` sheet (`safari-*.scss`)                    | The base component sheet it patches — additive, never a fork                |
| Skeleton → content        | `.--loaded` / loaded-class terminal state                     | Shimmer rules — declared after, one-way                                     |
| CSS fallback → GPU canvas | `:has(> canvas:not(.is-fallback))` guard hides the CSS widget | The painted DOM fallback — canvas presence is the precedence signal         |

## Rendering-mode dispatch precedence

When several layout modes could claim the same content, the decider
order is:

1. **Expand modal** — explicit user intent; always wins (and always
   shows the file whole at natural size).
2. **`media-mosaic` wall vs carousel** — viewport >1024 packs the wall;
   ≤1024 renders `<custom-carousel>` with identical configure payload.
3. **`forceActive`** — a binder flag pinning the carousel to the
   scroll track below `MULTI_FIT_MIN_VW` (3840) — explicit config
   beats the fit projection; ≥3840 the projection still runs even for
   forced groups (a set that honestly fits gets no controls).
4. **Carousel strip vs side-by-side** — side-by-side requires ≤2 items
   (or the ≥3840 multi-fit gate for larger sets), viewport ≥960
   (`SIDE_BY_SIDE_BREAKPOINT`), and projected total (slides + padding
   - gap + margins) ≤ host width; any failure keeps the drag track.
5. **Reduced motion** — vetoes genie warps, deck autoplay, and ambient
   video regardless of what layout math decided.

## z-index precedence

`$z-indexes` → `var(--z-*)` is the **sole** layering table — components
never invent stacking values. Within a deck/strip, JS-managed
`z-index` strides (`Z_STRIDE`) keep the front card on top; modal layers
(`--z-modal-*`) sit above all page content by token, not by local
decision.

## Inline-style ownership boundary

- **JS may write**: `width`, `height`, `left`, `top`,
  `aspectRatio`, `transform`, `opacity`, `zIndex`, `visibility`,
  `transition` (the ring-teleport `none`), and geometry custom
  properties. These are layout answers — the cascade defers to them.
- **JS may never write**: colors, radii, fonts, shadows, spacing
  cosmetics — those stay in the sheet where specificity rules apply.
- **First-write wins then caches** — measurement memoization
  (`_scaledVideo`, `_ladderBox`, `WeakMap` pose baselines) means the
  inline value is stable across re-renders; a re-measure only happens
  on real signal (resize, fonts ready, item change).

## Why no `!important`

The ban is architectural, not aesthetic: every "later wins" need is
already expressible through channel ownership (inline > var > token),
sheet order (patch appended last), or source order (override block
after base). A lone `!important` would break the auditability of that
chain — a precedence you can't trace is a precedence you can't test.
