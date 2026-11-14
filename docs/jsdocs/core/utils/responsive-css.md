# `core\utils\responsive-css.ts`

Runtime half of the breakpoint stylesheet split (?tiers).

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\responsive-css.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A lazily-imported tier module — resolves to the tier's css text.

### (module scope)

The `?tiers` module shape: embedded base text plus cumulative tier
loaders keyed by the highest class they cover (sparse — the runtime
resolves the viewport class to the highest defined tier ≤ it). `print`
carries the sheet's `@media print`/`@page` blocks behind the same lazy
loader contract — adopted onto the shadow root during idle, inert on
screen, live for paper output only.

### `isTieredStyles`

Type guard for the `?tiers` module shape vs a plain `?inline` string.

### `currentWidthClass`

The viewport's width class — evaluated widest → narrowest so the first
satisfied gate names the smallest cumulative tier that still covers the
viewport. Engines without matchMedia (jsdom, bots) report `wide` — the
full-content tier — since nothing can be ruled out.

### `resolveTierKey`

Resolves which tier key to load for a viewport class: the highest
defined tier at or below it. Cumulative content means a higher key
would only add blocks the viewport cannot apply, so lower is correct —
e.g. tiers {mobile,desktop} on a tablet viewport resolves to `mobile`.

- `@returns` the tier key, or undefined when nothing is defined.

### `_watchRank`

Highest width-class rank observed by the shared grow-watcher — seeded on
the first subscription so a late-mounting component only ever hears
about classes above the page's own baseline.

### `_watchSubs`

Subscriber callbacks invoked once per upward class crossing.

### `_watchOff`

Disposer for the shared matchMedia listeners while subscribers exist.

### `watchWidthClassGrow`

Shared upward-crossing watcher: at most three matchMedia listeners
(tablet/desktop/wide gates — mobile has no upward signal since every
crossing that changes the class passes one of those gates) serve every
subscriber, instead of each component instance installing its own set.
On any gate change the class is re-evaluated; subscribers fire only
when the class GREW — downward crosses never un-adopt a served
cumulative tier, whose higher blocks just stop matching.

- `@param` cb invoked once per upward cross with the newly-matched class.
- `@returns` unsubscribe function — also tears down the shared listeners

### `mergeTiered`

Merges several `?tiers` imports into one TieredStyles — the multi-sheet
equivalent of the old `` `${a}\n${b}` `` concat (MediaFigure). Bases are
joined in order; each merged tier resolves PER SHEET to the highest
defined tier at or below the class — the splitter omits a class whose
cumulative content equals the previous tier's ("the runtime falls back
to the highest defined lower tier"), so a sheet with only mobile/tablet
content must still contribute at desktop. Keying merged loaders by the
exact class alone orphaned those sheets — their narrower cumulative
rules would never be adopted once a wider tier existed on any sibling.
