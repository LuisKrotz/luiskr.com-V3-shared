# `core\utils\print\print.ts`

Print-mode DOM adapter. `beforeprint` (and the matchMedia

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\print\print.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `touched`

Elements whose attributes were mutated — restored verbatim on exit.

### `marked`

Live canvas/video/thumb elements marked `print-src` — class removed on exit.

### `fallbackMarked`

Demo canvases whose walk-time fallback state was frozen into
`print-fallback` — class removed on exit.

### `bleedTagged`

Hero figures stamped `print-bleed`/`print-bleed--landscape` this pass — tags drop on exit.

### `bleedHeads`

Title h1s re-parented into their hero's bleed block this pass —
each record restores element, parent and position on exit.

### `bleedMoved`

Figures reparented into `.print-plate` wrappers — restored on exit.

### `videoParked`

Videos neutralized for the committed DOM — paper only ever shows
their still/copy, but Chromium's print pipeline walks every live
HTMLMediaElement and a wall of player objects turns the snapshot
into a multi-minute stall. Neutralizing in place (src + <source>
children stripped, load() resets the pipeline) costs the same zero
render work as detaching but keeps `previousElementSibling` honest
for the src-less promotion checks that follow the element — an
el.remove() mid-walk re-parents the "thumb sibling" relation onto
whatever precedes the gap and a bare img after a parked video would
promote off (then dedup-retire) an unrelated earlier layer. Element
children re-seat on exit; the src attr rides `touched` like every
recorded write.

### `hoistedPlates`

Hero plates queued for body-level seating after the covers exist.

### `copies`

Injected `.print-copy` stand-ins, `.print-caption` lines and QR links
— all removed on exit.

### `imgDecided`

Imgs the committed pass already upgraded — refreshMedia must never
re-decide them: the rung pick reads live box geometry, which changes
under print CSS, so a second pass re-points a decoded layer at a
colder rung and the snapshot prints the cold URL blank. Retired
(`marked`) layers stay OUT of the set so the rescue arm can still
un-retire one that wins a real src between passes.

### `STEM_KEY`

Layer identity key — rung suffixes AND the emission extension fold, so
`X.jpg`, `X.webp` and `X-mozjpg-75-mobile.jpg` all key to `X`: stacked
renderers pick the codec per layer (thumb ships jpg, high may ship
webp), which made extension-sensitive keys treat one stack's layers as
different media and print both. `-thumb` stays part of the key — a
thumb file is its own emission (a video still, an LQIP serving a
different role), retired via its still's src rewrite; folding it would
let a later `X-thumb` retire the real `X`.

### `stemKey`

One media's dedup key — rung-free, extension-free identity.

### `printing`

True while the printable form is applied — re-entry is a no-op.

### `darkWasOn`

Theme class state captured on entry so exit can put it back.

### `installed`

Module install guard — the boot path may run more than once in tests.

### `mmExitTimer`

Pending teardown for a matchMedia print-off edge — see the change
listener in initPrintSupport; a re-armed true edge (or an afterprint)
clears it before it can tear a live job down.

### `dialogGuardTimer`

Pending self-heal check armed once nativePrint() returns — engines
that swallow the call (headless shells, a throttled programmatic
print, a blocked activation) fire no beforeprint and flip no media
query, so no teardown owner ever arrives; the timer unwinds the
committed DOM by hand instead of stranding the page in its print
face. Cleared by exit() like mmExitTimer.

### `sawPrintChannel`

True once a real print channel engaged — beforeprint's enter() or
the matchMedia true edge. The post-nativePrint guard reads it: a
channel armed inside the grace owns the job's teardown; silence
means the call was swallowed and the job unwinds by hand.

### `pendingBeforeprintAt`

Timestamp of the most recent beforeprint — that event precedes the
media apply by an engine-internal beat (hundreds of ms observed in
headless printToPDF), so a matchMedia false edge inside the gap can
belong to a job that is already live rather than ended. The mm-exit
recheck re-arms while the stamp is inside MM_APPLY_GRACE instead of
erasing the committed DOM the second job is about to paginate.

### `gateVeil`

The gate veil node seated over the page for the gated job's whole
settle+prep+barrier window AND the open dialog — it drops only in
exit(), with the rest of the print face, so the mutated DOM never
reaches the screen.

### `emittedLinks`

Footer hrefs already emitted as `.print-qr-link` codes this pass — a
link repeated across footer regions scans once, not once per copy.

### `emittedRegionLinks`

Marked `[data-print-link]` hrefs already emitted this pass — kept
separate from the footer set so a directory row (sitemap) still shows
its own code when a footer happens to link the same route.

### `warmReady`

Media URLs the browser is known to have fetched already — marked at
each img's load resolution. The barrier-less beforeprint pass may
only swap toward one of these: a cold swap trades a decoded screen
src for a fetch that races the snapshot blank.

### `pendingPrint`

Fetch/decode promises kicked by the prep pass — the gated entry
(Ctrl/Cmd+P, window.print) awaits them before opening the dialog so
the snapshot can't race a cold rung into a missing image. The
beforeprint path never reads the list: menu-initiated jobs can't be
deferred, so they hold decoded sources and floor-rung swaps instead.

### `pendingSettled`

Count of pendingPrint entries that settled — the barrier's progress
signal. Promise state can't be polled, so each tracked entry stamps
`done` on itself: the barrier keeps waiting while the count moves and
bails only when nothing settles for a full PREP_CAP window.

### `trackPending`

Queues a fetch/decode promise in the tracked barrier bag. The wrapped
entry stamps its own `done` flag on settle so awaitPendingJobs can see
per-entry progress (a raw promise's state is opaque). Undefined
decodes (detached imgs, missing APIs) simply don't enqueue.

- `@param` job The fetch/decode promise to track.

### `pendingStyleStrip`

Media elements carrying screen-time inline styles. recordAttr saves
the value in prep (non-destructive) while the removal waits for
commit — stripping in prep would visibly un-pose carousels and
re-flow media during the decode wait.

### `jobRunning`

True while a gated job sits in its decode wait — a second trigger
during the wait joins silently instead of stacking dialogs.

### `PRINT_COVER_ONLY_ROUTES`

Routes with nothing a paper document can carry — the search surface and
the 404 are interactive chrome, not content. Printing on them still
runs, but the job emits exactly one sheet: the black cover with the
site scan code and the home link — nothing else.

### `coverOnlyRoute`

The cover-only gate — true when the current route carries no paper
content; prepPrint answers it with the single-sheet document.

### `siteHomeUrl`

The site-root URL every "home" surface points at — the back cover's
scan code and the cover-only sheet's QR + printed link share it.

- `@returns` `${origin}/` — the unlocalized site root.

### `VIDEO_STILL`

Trailing video-file grammar a src URL can carry — `X.mp4` plus the
`-scaledown-Nx` emission variants (and query/hash tails). Replacing
the match with `.mp4.jpg` lands on the poster still every emission
ships beside the video.

### `ISO_DATE_LEN`

Length of the `YYYY-MM-DD` prefix of an ISO-8601 timestamp — the
caption's print-date field reads `new Date().toISOString()` up to the
`T` separator.

### `BLEED_LANDSCAPE_RATIO`

Width/height ratio at which a bleed figure claims the landscape named
page — media wider than this reads better rotated 90° on a portrait
job than scaled into the shorter cross-axis.

### `countPendingContent`

Counts pending-content stand-ins across the composed tree — every
skeleton contract class (`skeleton--shimmer` boxes, `skeleton-host` /
`skeleton-overlay` section placeholders) means a route's data or a
lazy mount hasn't landed yet. Shadow roots are walked recursively so
a pending view skeleton (view-project's host) counts the same as a
light-DOM one.

- `@returns` Total skeleton stand-ins found.

### `nextFrame`

One animation-frame pause — the IO callback delivery + re-render beat
a scroll step needs before the next position counts.

### `dropGateVeil`

Drops the gate veil — idempotent; every teardown path calls it so the
node can never outlive its job.

### `showGateVeil`

Seats the gate veil over the page — the gated job's settle (scroll
sweep, figure climbs) and prep (plate reparents, src swaps, layer
retirements) all mutate the live tree across a seconds-long decode
barrier; watched raw, that build reads as the site glitching. The
veil covers the whole wait with the static sheet + orbital rings the
print face page carries, so the user sees intent instead of churn.
Screen chrome only — the print sheet hides it outright.

### `settleTick`

One poll-tick pause for the settle loop.

### `kickFigureLoad`

Kicks a figure's lazy high-layer climb directly — the IO observer only
arms it near the viewport, so below-fold figures reach print with no
layer mounted (the empty-mat failure). `loadHighRes` is the figure's
public mount+fetch; the returned promise lands when the rung the layer
can prove is painted. Video figures early-return — their print stills
come from swapVideo's derived thumbnail instead.

- `@param` figure Media-figure host element.
- `@returns` The climb promise, or null when the host can't climb.

### `settleForPrint`

Drives the document to its complete state for the gated print entry —
the "sometimes content is missing" race exists because lazy work is
viewport-gated: IntersectionObserver arms figure layers and deferred
sections only near the fold, and route data reveals on its own clock.
A print fired straight away snapshots whichever boxes happened to be
mounted. Three passes fix it deterministically:

1. Scroll sweep — steps the scroller through its full height so every
   IO callback fires (figure observers arm, draw-text reveals, lazy
   mounts enter the DOM), then restores the reader's position.
2. Content poll — waits until no skeleton stand-ins remain for a few
   consecutive ticks (route data landed and re-rendered), capped so a
   permanently-pending box can't hold the job hostage.
3. Figure climbs — `loadHighRes` on every media-figure forces the
   layers that printing actually paints; the climbs settle inside the
   caller's barrier cap.

### `recordAttr`

Records an element's current attribute value exactly once — the first
write wins so repeated entry passes can't overwrite the true original.

- `@param` el Element being mutated.
- `@param` name Attribute name.

### `writeAttr`

Mutates an attribute while recording its original for restoration.

- `@param` el Element being mutated.
- `@param` name Attribute name.
- `@param` value New attribute value.

### (module scope)

Depth-first generator over the light DOM and every nested shadow root —
canvas/video/img surfaces live inside component shadows (docs scenes,
menu chrome, widgets), and `querySelectorAll` cannot reach them. Recursion
per the traversal rule (rule 20); shadow links form a tree so no visited
set is needed.

- `@param` root Document or shadow root to walk.

### (module scope)

Depth-first generator yielding every `<media-figure>` host across the
composed tree — figures are light-DOM hosts but may nest inside deeper
component shadows, so the same recursion as walkMedia applies.

- `@param` root Document or shadow root to walk.

### (module scope)

Depth-first generator yielding every `<footer>` element across the
composed tree — the site footer lives inside `legal-footer`'s shadow
(and `awards-mentions` mounts its own), so the same shadow-piercing
recursion as walkMedia applies.

- `@param` root Document or shadow root to walk.

### (module scope)

Depth-first generator yielding every `[data-print-link]` anchor across
the composed tree — route indexes (sitemap) mark their primary route
anchors so each printed route earns a `.print-qr-link` code, the same
scan-code contract footers already get.

- `@param` root Document or shadow root to walk.

### `CHROME_HOST_TAGS`

Chrome hosts whose shadows never reach paper — the same set the print
sheet hides outright (nav shell, dialogs, toasts, HUD, decks). The TOC
walk skips recursing into them so their headings can't pollute the
contents list.

### (module scope)

Depth-first generator yielding every `h2` across the composed tree —
section heads and card titles are the contents list's entries, and
both live inside component shadows the plain query can't reach.
Chrome-host shadows (modals, nav chrome) are skipped: their headings
are interactive chrome, not document sections.

- `@param` root Document or shadow root to walk.

### `mediaStem`

Emission-encoded extensionless media stem for a media element — a
`<media-figure>` host reads its own `src` attribute; an element inside
the figure's shadow reads the same attribute off its host — matching
figure/load.ts (`encodeMediaUrl(storage + fig.mediaSrc)`). '' for
light-DOM media with no figure stem to derive from.

- `@param` el Figure host, or element possibly inside a figure shadow.
- `@returns` Extensionless CDN stem, or ''.

### `stemTopUrl`

Highest-quality URL for one media stem — the manifest-proven top rung
(`mediaRungs` orders lowest→highest, every rung `mediaKeyExists`-gated
so the answer can never 404). '' when the manifest proves nothing —
covers and video stems emit no `-mozjpg-uncompressed` object, so a
grammar guess would trade a working image for a broken one; the
element keeps whatever src already stands (the original when the
manifest hasn't landed, per the originals-only render contract).

- `@param` stem Extensionless emission-encoded stem.
- `@returns` Proven full-quality .jpg URL, or ''.

### `stemFloorUrl`

Smallest manifest-proven .jpg for one stem — the floor rung. The
un-gated print path can't wait on a fetch, so an undecoded img swaps
here instead of holding a multi-megabyte original: a ~100KB cold pull
clears the snapshot window a multi-megabyte one never does. '' when
the manifest proves nothing.

- `@param` stem Extensionless emission-encoded stem.
- `@returns` Proven floor .jpg URL, or ''.

### `PRINT_SMALL_BOX_RUNG_SKIP`

Rungs skipped below the top for a small box the `-mobile` ladder can't
serve — mirrors the screen climb's box term (`ladderCeiling` drops two
for ≤768px boxes: the raw original and uncompressed tiers). Rungs are
quality re-encodes at IDENTICAL pixel dimensions — a ~15–25MB
uncompressed full-page still resolves nothing a ~2MB q75 doesn't at
card size, so summoning it for a wall of tiles trades ~800MB of fetches
the barrier can't drain for paper-indistinguishable pixels.

### `stemPrintUrl`

Print-resolution URL for one media stem — the TOP rung of the
appropriate ladder. Paper resolves far more detail than a CSS pixel
does and the gated job waits for the pull, so print deliberately
ignores the screen budget's ceiling: every image lands at the best
tier the manifest proves. Small boxes (cards, tiles) take the
`-mobile` derivative ladder — its top rung is the highest resolution
that derivative exists at, which already oversamples a thumbnail on
paper — and when no mobile tier exists they still skip the full
ladder's multi-megabyte top rungs (see PRINT_SMALL_BOX_RUNG_SKIP).
Full-width and unmeasured media climbs to the uncompressed original.
Every returned URL is `mediaKeyExists`-proven — the pick can never
fabricate a 404.

- `@param` stem Extensionless emission-encoded stem.
- `@param` boxW Rendered width of the media box in CSS px (≤0 = unknown).
- `@returns` Proven top-tier .jpg URL, or ''.

### `printBoxWidth`

The img's laid-out box width — the rung pick's box term. During prep the
element still holds its screen geometry (print CSS applies at the
commit), which is the closest honest proxy for the printed tile size;
a 0/unknown box applies no small-media term.

- `@param` img Image being resolved.
- `@returns` Box width in CSS px, or 0 when unmeasurable.

### `printSourceUrl`

Best printable URL for an image — the figure-stem ladder for shadow
media, or the uncompressed tier derived off the img's own mozjpg URL
for article/reader images. '' when neither applies, so callers keep
whatever src already stands.

- `@param` img Image being upgraded.
- `@returns` Full-quality URL, or ''.

### `printImageUrl`

The fetch URL a printed image actually pulls — same derivation as
printSourceUrl but budget-aware: the rung comes from stemPrintUrl's
box/budget pick rather than the top of the ladder, so a wall of small
cards doesn't summon hundreds of uncompressed multi-megabyte pulls
that outrun the prepare cap and leave the tail of the job blank. The
caption still cites the canonical top URL via printSourceUrl — the
credit points at the full-quality file while the fetch stays sane.

- `@param` img Image being upgraded.
- `@returns` Proven print-resolution URL, or ''.

### `warmPrintSource`

Marks a resolved img's current URL as print-safe — `warmReady` is the
swap gate's "already fetched" proof, so it records what the browser
decoded rather than fetching anything itself. An idle pull of the
print rung is a page-speed tax a print pass may never repay: warming
only ever observes decoded bytes, never summons them. `currentSrc`
leads because it is the URL the network actually settled — the bare
attribute can still read a rung the loader swapped past.

- `@param` img Image element that just finished loading on screen.

### `sweepWarm`

Idle mark sweep over the whole composed tree — every resolved img's
current URL joins `warmReady` so a later barrier-less print pass can
prove the swap target is already fetched. Runs after install and
again whenever the MutationObserver sees new nodes (route renders
mount fresh media long after the first sweep). Marks only — repeated
sweeps cost a DOM walk and nothing else, and no idle pass ever pulls
bytes the screen didn't already need.

### `sweepQueued`

True while a sweep is queued for the next idle slice — coalesces bursts.

### `queueSweep`

Defers one `sweepWarm` to the next idle slice — requestIdleCallback
with a bounded timeout when available, the short setTimeout fallback
otherwise (the same scheduler contract route-warmer uses). DOM growth
fires this per mutation batch; the `sweepQueued` flag collapses a
route render's many mutations into a single sweep.

### `qrLink`

Builds one injected QR link — an `<a>` wrapping the `qrSvg` code so the
printed page deep-links into the full-size asset. Returns null when the
payload exceeds the encoder's capacity.

- `@param` url URL the QR encodes and the anchor links to.
- `@param` cls Print class tag (`print-qr` or `print-qr-page`).
- `@returns` The anchor element, or null.

### `retireFailedPrintImg`

Retires a printed img whose decode rejected — the asset is genuinely
broken (the gated entry awaited it and the fetch still failed), so a
blank box + orphaned credit line must not reach the paper. The img
drops to `.print-src`; when it was the LAST printable layer inside a
figure shadow, the emptied host collapses too and the caption/QR the
figure pass seated after it goes with it — a "Source:" line floating
alone reads as a bug, not a credit. Guarded on `printing`: a decode
that lands after teardown leaves the DOM untouched.

- `@param` img The img whose fetch+decode failed.

### `demotePrintImg`

Decode-failure rescue for a printed img — `mediaKeyExists` proves an
object EXISTS on the bucket, not that its bytes decode (a truncated or
corrupt tier still lists). A rejected rung therefore steps DOWN the
stem's proven ladder before the layer may retire; every candidate is
manifest-gated, so the rescue can't fabricate a 404. Only a ladder
src can step — an upgraded img always lands on a proven rung (a kept
non-rung src, like a share capture or unproven stem, has no ladder to
descend and retires as before), and a src already at the floor does
too. The re-tracked decode is bounded by the ladder's depth, so the
chain always terminates.

- `@param` img The img whose fetch+decode rejected.

### `addCaption`

Injects a `.print-caption` source line after a printed media surface —
"Source: <asset URL> · <print date> · <author>", so every listed
image/video attributes its file, the day the page was printed, and
Luis Krötz. The URL rides a real anchor so a digital PDF copy keeps
the link clickable; paper output reads the URL text itself.

- `@param` anchor Element the caption follows (media surface or its copy).
- `@param` url Asset URL the caption links to.
- `@param` before Seats the caption before the anchor instead — a bleed

### `addLinkQr`

Injects a small `.print-qr-link` code under a link — paper readers
scan into that link's own destination (a footer URL, or a card's own
project route when the card media lives inside its anchor). One code
per unique href across the whole page — deck cards and index-overlay
twins share theirs, so the first emitter wins. `#`/empty hrefs carry
nothing to scan; the code seats as the anchor's next sibling.

- `@param` anchor `a[href]` element (footer link or media card link).
- `@param` emitted Dedup set for this emission domain — footers + media

### `addLinkUrl`

Injects a `.print-link-url` line under a `[data-print-link]` anchor —
the real resolvable destination spelled out in type, so a paper reader
doesn't have to decode a QR or trust a rounded pill to know where the
row leads. Sibling of the `.print-qr-link` injection: the sitemap's
directory rows mark their title anchors with `data-print-link`, and
the row's print layout seats this line under the title while the QR
keeps the right edge. Every marked anchor gets its own line (no href
dedup — two rows pointing at one URL still each need the readable
destination under their own title).

- `@param` anchor Marked title anchor (`a[href][data-print-link]`).

### `figureSourceUrl`

Printable source URL for a `<media-figure>` — the `.mp4` file for
video figures (paper readers scan into the real media, not the
poster), the manifest-proven top rung for image figures, falling back
to the live shadow img's own src when the stem proves nothing.

- `@param` figure Media-figure host element.
- `@returns` http(s) source URL, or ''.

### `addFigureCaption`

Seats a figure's `.print-caption` after the host — or after the
poster-still copy the video swap injected next to it, so the caption
lands under the visible media rather than between host and still.

- `@param` figure Media-figure host element.

### `captureVideoFrame`

Data-URL of a video's CURRENT decoded frame — the pipeline's
`stem.mp4.jpg` poster captures t=0, which for screen recordings that
fade in from a blank page IS the blank page, so a played element's
live frame is the honest still. The element carries
`crossorigin=anonymous` and the storage bucket answers ACAO:*, so the
drawImage read never taints. '' when no frame is decoded yet
(readyState below HAVE_CURRENT_DATA keeps videoWidth at 0) or the
read throws.

- `@param` video Video element to read.
- `@returns` PNG data URL, or ''.

### `captureCanvas`

Asks the owning engine for a fresh frame, then falls back to reading the
preserved buffer. Engines that render-on-demand (docs arch-scene) listen
for `printcapture` and write detail.dataUrl after re-painting; engines
that keep the last frame (star-field, earth — preserveDrawingBuffer)
satisfy the direct toDataURL read.

- `@param` canvas Canvas to read.
- `@returns` PNG data URL, or '' when neither path produced pixels.

### `placeCopy`

Places a stand-in where it will actually print. Stand-ins for surfaces
inside the reader article replace in place. When the article IS the
print surface (live mirror — children, no parked `> div` wrapper),
stand-ins for app-chrome surfaces move into it since the print sheet
hides #app. Otherwise the live app prints and the still seats at the
media's own slot: a shadow source anchors after the host of the shadow
it lives in — one boundary crossing, so the still keeps the record or
card its source belongs to (a component-level print contract like
`.print-copy`/`caption` in the host sheet still styles it — the same
way shadow-seated captions already print). Only `hoist` climbs past
further ancestors to the outermost host: landscape plates wrap the
copy in a light-DOM `.print-plate` that the document sheet owns.

- `@param` src Live element being replaced.
- `@param` copy Injected stand-in element.
- `@param` hoist Climb to the outermost host instead of the immediate one.

### `swapInCopy`

Injects a `.print-copy` stand-in after/alongside `src` and tags `src` so
the print sheet hides the live version.

- `@param` src Live element (canvas or video).
- `@param` url Image URL the stand-in renders.
- `@param` hoist Seat the still after the outermost host (landscape plates
- `@returns` The injected stand-in img.

### `upgradeImage`

Upgrades a lazy/deferred image so it actually resolves at full quality
before the print snapshot: src-less layers inherit their sibling's URL,
then everything moves to the highest proven rung (uncompressed) through
the figure stem or the img's own mozjpg grammar; srcset ladders are
dropped so the chosen src can't be overridden, and loading/decoding go
eager/high/sync. When the upgrade lands on a media-figure high layer,
its LQIP/thumb siblings are tagged `print-src` so paper shows only the
sharp copy.

- `@param` img Image element (light DOM or inside a media-figure shadow).

### `decideImage`

Runs the committed pass's full upgrade on one img and records the
decision — refreshMedia skips every img in `imgDecided` so a second
beforeprint never re-points an already-decided layer at a colder rung
(the rung pick reads live box geometry, which print CSS just changed).
Layers upgradeImage retired to `print-src` stay undecided so the
rescue arm can still un-retire them if a real src lands between
passes.

- `@param` img Image element to process.

### `videoSourceUrl`

The source URL a printed video points back to — the element's own
loaded/src/source chain, falling back to the poster attribute.
'' when nothing resolves. Only un-figured videos reach this helper:
figure-shadow videos are described by their host's `.mp4` caption and
the swap only derives a still off this chain when no figure stem
exists, so a stem can never present here.

- `@param` video Video element (light DOM — never inside a figure shadow).
- `@returns` http(s) video URL, or ''.

### (module scope)

Swaps a video for its poster still — printers rasterize neither the
element nor its first frame, so the emitted `stem.mp4.jpg` still (or
the poster attribute / src-derived still for un-figured videos) is
the printable representation the pipeline ships. Inside a figure
shadow an already-rendered non-placeholder img layer IS that still
(the img pass upgrades it to `stem.mp4.jpg`), so the video just tags
out; otherwise the still is injected as a `.print-copy`. A video with
no derivable still retires instead of printing a dead player box.

- `@param` video Video element (light DOM or inside a media-figure shadow).
- `@returns` The injected `.print-copy` img when one was placed, else null.

### (module scope)

Caption work collected during the media walk and emitted once it
finishes — a queued entry reads its element's FINAL state, so a layer
the dedup arm retires mid-pass (same-stem siblings) never keeps a
caption under a hidden image.

### `anchor`

Element the caption seats after (img, picture or anchor wrapper).

### `media`

Element whose final src/state the caption reads.

### `nextStaticSibling`

The sibling a move record must anchor on — the first following node
that is NOT a print-injected still, caption or QR code. Injected
nodes are all removed before the records restore, so an anchor left
on one re-parents against a detached reference and throws, aborting
the whole exit pass (theme and attribute restores included). This is
not theoretical: a figure-shadow video/canvas swap seats its
`.print-copy` immediately after the figure host.

- `@param` el Element whose re-seat point is being recorded.
- `@returns` The first surviving sibling, or null at the parent tail.

### `tagBleedFigures`

Stamps internal-hero figures as full-bleed editorial spreads: each
figure moves inside a light-DOM `.print-plate` on the margin-zero
named page so the media paints edge-to-edge, and a figure wider than
tall additionally gets the `--landscape` arm — a quarter-turned
light-DOM still inside the portrait sheet, the magazine "turn the
page sideways" spread.

Orientation prefers the surviving layer's natural pixel ratio; an
unloaded layer falls back to the figure's laid-out box.

### `seatPlates`

Seats the queued hero plates immediately after the front matter —
cover, face, and (when present) the contents sheet — so the page-name
sequence stays cover → face → plate → article with no default-context
node between them to strand an empty sheet.

### `printHideSelectors`

Print-only `display:none` selectors harvested from the live sheets —
refilled every prep (the adopted set can swap sheets between jobs).

### `collectPrintHides`

Harvests every `display:none` selector declared inside `@media print`
across the document AND every shadow root's adopted sheets. The print
sheet hides chrome that is still display-visible on screen (the nav
shell, dialogs, the loader veil) — bleedAtStart's "is there content
ahead" test must answer for paper, not pixels, or an in-flow hero
plate strands an empty default sheet at the named-page transition.
Reading the live rules means the oracle can never drift from the
stylesheet. Pseudo-element selectors drop (they can't match a sibling).

### `printHidden`

Whether `el` is display:none under print media — judged against the
harvested @media print selector set, so a sibling that only hides on
paper (nav chrome, dialogs, the loader) counts as no content ahead.

- `@param` el Element to test against the print-hide selector set.
- `@returns` Whether any collected print-hide selector matches the node.

### `bleedAtStart`

True when `el` has no printable flow content ahead of it in the
flattened tree — walked ancestor-by-ancestor across shadow roots, so a
hero block buried inside view shells still detects the head-of-doc
case. A preceding element sibling that is neither a named-cover node
nor print-hidden ends the run.

- `@param` el Element whose flow-start status is under test.
- `@returns` Whether every preceding sibling up to `<body>` is a cover

### `coverTail`

The last contiguous cover-sheet node at the top of `<body>` — cover,
face, contents, and any plates already hoisted ahead of this pass —
so a new hoisted plate seats immediately after them.

- `@returns` The trailing cover node; `<body>`'s first child as the

### `refreshMedia`

Re-entry pass for a second beforeprint fired inside an already-entered
job — a manifest-land (or any) re-render after the first pass swaps in
fresh, untagged media layers, and doing nothing would print the whole
stack. Only the img branch re-runs: canvas captures and video stills
inject a stand-in per call and would duplicate, while upgradeImage is
idempotent for layers already processed (recordAttr is first-write-wins
and the stem dedup no-ops on retired siblings). Fresh clones get the
full upgrade, restoring the one-layer-per-well contract mid-flight.

### `prepPrint`

The printable form, preparation phase — everything that leaves the
on-screen render untouched: fires `printprepare` so views can sync
their generated DOM (docs rendered diagrams) into the reader mirror,
stamps the doc classes (print-media selectors only), walks every
media surface — canvases become captured stills, poster-carrying
videos become images, lazy images upgrade to eager/high at full
quality with decode kicks queued in pendingPrint. Every printed
surface then gets its source/date/author caption, footer links gain
their scan codes, and the document ends with the covers/TOC/back
sheets — all injected nodes carry `hidden`, so a gated job can sit
in this state awaiting decodes with the screen undisturbed. Cover-only
routes (search, 404) short-circuit all of it: the app host is stamped
out and the single injected cover sheet is the whole document.

### `commitPrint`

The printable form, commit phase — the screen-visible mutations held
back until the job is moments from the dialog: the dark theme drops
for ink-friendly light tokens and every media element's inline
style attribute (poser transforms, marquee offsets) strips to its
print geometry. Menu-initiated jobs run it straight after prep —
same single synchronous pass enter() always was; the gated entry
runs it only after the decode barrier settles, so the page never
flashes its print state while the user is still looking at it.

### `awaitPendingJobs`

The gated job's pending-work barrier — waits for every tracked job in
the bag to settle, then drops them so a later wait only sees work
queued since. Progress-aware: the gate stays open while entries keep
settling (a media index can legitimately queue hundreds of CDN
decodes — a flat cap would release it half-loaded) and releases when
nothing settles for a full PREP_CAP window (a wedged request must not
hold the dialog hostage) or when the PREP_CAP_HARD wall lands. A
failed decode still counts — a rejected entry prints whatever the
network served rather than holding the job.

### `runPrintJob`

The print entry for triggers the page can intercept — the Ctrl/Cmd+P
chord and programmatic window.print. Runs the prep pass, then HOLDS
the dialog behind a decode barrier: every image fetch/decode kicked
during prep plus the pending font loads must settle before the real
print starts, so the preview finds every asset painted instead of
racing whichever rungs resolve mid-render (the "sometimes images are
missing" flakiness). A failsafe cap releases a wedged fetch rather
than freezing the feature. Menu-initiated jobs can't be deferred —
they keep the synchronous beforeprint path.

- `@param` nativePrint The original window.print, invoked once the

### `enter`

The printable form's synchronous entry — the beforeprint/matchMedia
path. Menu-initiated dialogs can't be held, so prep and commit run
back-to-back exactly as the pre-gate pipeline did; the warmed HTTP
cache and the kicks inside prep are the only asset insurance there.

### `TOC_MIN_ITEMS`

Minimum entries a contents page needs to justify itself — a route
with fewer collected heads prints without the leaf rather than
shipping a nearly-empty sheet.

### `buildToc`

Builds the contents page seated between the face page and the first
content sheet — the magazine's answer to the discarded web nav. Every
h2 across the composed tree becomes an entry in document order:
section heads read as numbered items, card titles indent as
sub-entries under their section. Heads inside hidden subtrees
(collapsed, parked or aria-clipped content) and duplicates of a
title already listed are skipped; the page drops entirely when a
route collects fewer than TOC_MIN_ITEMS heads.

- `@returns` The `.print-toc` element, or null.

### `coverPortrait`

Finds the about portrait's Gravatar URL in the live composed tree and
returns the cover-star <img> re-requesting it at the cover rung — the
same CMS picture the about section shows fronts the printed issue,
seated over the masthead's lower half (the magazine "name behind the
cover star" move). The node is built fresh rather than cloned so it
drops with the cover on exit; eager/high-priority attrs plus a decode
kick make the preview hold on the in-flight fetch the way upgraded
media does. Routes without the about section (project internals,
legal, docs) simply print the masthead cover without the portrait.

- `@returns` The `.print-cover-photo` img, or null when no portrait exists.

### `featureTitle`

The issue's feature title — the non-brand half of `document.title`
("Luis Krötz | Transa" → "Transa", "Star Field - Earth | Luis Krötz"
→ "Star Field - Earth"). Routes that title the tab with the brand
alone (home) yield nothing so the localized Portfolio word stands.

- `@returns` The feature title, or ''.

### `buildCovers`

Builds the three cover sheets framing the printed document: the black
title cover (silver `Luis Krötz` masthead with the Gravatar portrait
seated over its lower half, the localized "Portfolio" word and the
print-date issue stamp), the face page echoing the intro loader's
orbital rings and brand line without the percent counter, and the
black back cover with a scan code to the site root centred and the
localized copyright line pinned to the sheet's foot. All three carry
`hidden` — the screen-hide contract now lives on the attr since print
css moved to its own media link — and they drop with the rest of the
injected DOM on afterprint.

- `@returns` [cover, face, back] in document order.

### `buildCoverOnlySheet`

The single sheet a cover-only route emits — the back-cover layout
(black margin-zero page) carrying just the centred site scan code and
the printed home link at the sheet's foot: a QR and a way back home,
nothing else. Carries `hidden` like every injected node — the print
sheet's `.print-back` rules paint it on paper.

- `@returns` The `.print-back` cover sheet element.

### `prepCoverOnly`

The cover-only prep — stamps `print-cover-only` on <html> so the print
sheet hides the app host (view chrome and the parked reader mirror
both live inside it), then seats the single sheet at the head of
<body>. The job's whole document is that one sheet.

### `exit`

Tears the printable form down: stand-ins are removed, `print-src` tags
drop, every mutated attribute restores its recorded value (or removal),
and the dark theme returns if it was on.

### `trackPrintJob`

Registers async print-composition work fired by a `printprepare`
listener — dossier fetches, generated mirror syncs, injected-DOM
builds whose nodes the walk must see whole. The promise is tracked in
the same bag the gated entry awaits before committing; its failures
are swallowed so one bad fetch can't take the job down.

- `@param` job Composition promise resolving after the listener's print

### `trackPrintNode`

Registers a listener-injected print node for the exit teardown — same
fate as the adapter's own copies and covers: the node is removed when
the job ends so screen state restores clean.

- `@param` el Root element the listener injected for print.

### `printJobActive`

True while a print job owns the document — set at prepPrint's stamp
and held through exit's restore. Screen-time DOM publishers (figure
ladder publishes, deferred layer mounts) must freeze inside this
window: a clone landing mid-snapshot stomps the print-upgraded src
with a cold screen rung and the page prints a blank frame where the
media should be.

- `@returns` Whether the print DOM is currently being prepped/committed.

### `initPrintSupport`

Installs the print hooks once: the native before/afterprint pair plus the
matchMedia('print') change channel — some engines skip the events but
always flip the media query, so both paths feed the same enter/exit.
A capture-phase `load` listener rides every img that resolves on screen
(load doesn't bubble — capture reaches it) and marks its resolved URL
in `warmReady`, so the beforeprint swap gate can prove a rung's bytes
already sit in cache instead of gambling on a cold multi-megabyte pull
at snapshot time. Marks only — the warm pass never summons a fetch the
screen didn't already need; lazy/late-mounted layers are covered the
moment their own load lands — no polling, no observer.
