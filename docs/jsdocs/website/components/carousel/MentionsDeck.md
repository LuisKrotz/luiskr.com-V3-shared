# `website\components\carousel\MentionsDeck.tsx`

&lt;mentions-deck&gt; — the "Some mentions" card deck inside the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\MentionsDeck.tsx`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DEFAULT_MENTIONS_TITLE`

Bundled default heading for <mentions-deck> with any trailing colon stripped
so "Some mentions:" renders as "SOME MENTIONS" per the reference design.

### `MentionsDeck`

<mentions-deck> element — a looping flat strip for the award/mention
rows. Ring-offset geometry means the loop wraps natively (no clone
slides); a dwell-clock autoplay advances the front card while ≥50%
visible, and pointer drags slide the strip 1:1 with slop/flick settle.
All behavior delegates to `./mentions-deck/*`; this class is the state
holder + custom-element facade.

### `_items`

Mention rows pushed by the host — [] renders the skeleton strip.

### `_translations`

Locale strings for the deck chrome (pages/HOME node).

### `_title`

Section heading — defaults to the bundled about.mentions copy.

### `activeIdx`

Deck index of the front card.

### `duration`

Autoplay dwell per front card (ms) — pushes the strip when idle.

### `_cardW`

Measured card width px.

### `_anchor`

Front-card anchor x (px) — the strip centers on this point; it also
doubles as the edge distance the card dissolve measures against.

### `_fadeSpan`

Edge-dissolve lane px — card width × FADE_FRAC on wide decks, 0 on
mobile so partial neighbours peek at full opacity under the clip.

### `_sizesDirty`

Card width/height writes pending after a measure().

### `_dragX`

Live drag offset px — the strip's virtual front is activeIdx - _dragX/_step.

### `isEnteredViewport`

Any viewport visibility ever observed.

### `isFullyVisible`

≥50% visible — the autoplay gate.

### `autoplayRunning`

RAF cycle active flag.

### `autoplayStart`

performance.now() at cycle start.

### `autoplayElapsed`

Accumulated pause→resume offset so dwell survives interruptions.

### `autoplayRafId`

Autoplay RAF handle.

### `observer`

IntersectionObserver handle driving the visibility flags.

### `_dragTick`

The one-rAF-per-frame pose write armed by the drag path — a bound
field so the gesture loop allocates zero closures per frame.

### `items`

Setter/getter — mention rows pushed by the host (identity-guarded
so repeat pushes with identical data don't restart autoplay).

### `translations`

Setter/getter — locale strings for the deck chrome.

### (module scope)

Setter/getter — section heading text.

### `_t`

Resolved copy — live translations over the build-time English
snapshot, so the hint renders text before Firebase resolves.

### (module scope)

Mount: wire events/observer, subscribe to the store for reduced-motion/overlay.

### (module scope)

Re-caches card nodes + re-measures after every render, then republishes
poses/chrome against the fresh DOM.

### (module scope)

Pref commits → kill autoplay immediately (no residual RAF); an
overlay closing resumes a stopped cycle only when the deck is still
≥50% on screen. The !autoplayRunning guard matters: store commits
arrive for unrelated state too, and a bare _startAutoplay would
re-base the dwell clock on every commit.

### (module scope)

Teardown: stop RAF + observer — every async handle is released so nothing fires after disconnect.

### `measure`

Deck measurement — see mentions-deck/deck.ts.

### `applyPoses`

Strip pose write — see mentions-deck/deck.ts.

### `updateChrome`

Dots/a11y refresh — see mentions-deck/deck.ts.

### `goTo`

Navigate the strip to a deck index — see mentions-deck/interactions.ts.

### `onDotClick`

Dot-nav click.

### `onCardClick`

Card activation — side cards reposition, front card navigates.

### `onKeyDown`

Delegated keydown — arrows step the strip.

### `cardIdxFromEvent`

Card/index resolution for the click path — see interactions.ts.

### `onPointerDown`

Pointer-down drag arm — see mentions-deck/gestures.ts.

### `onPointerMove`

Pointer-move drag tracking — see mentions-deck/gestures.ts.

### `onPointerEnd`

Pointer-up/cancel settle — see mentions-deck/gestures.ts.

### `_startAutoplay`

Starts the autoplay RAF cycle (gated by visibility + reduced-motion).

### `_stopAutoplay`

Stops the autoplay RAF cycle.

### `_pauseAutoplay`

Freezes the dwell clock (hover, committed drag).

### `_resumeAutoplay`

Re-arms the dwell clock after a pause.

### `_tickAutoplay`

One autoplay frame — advances when dwell elapsed, then self-schedules.

### `_setupObserver`

Creates the IntersectionObserver driving isEnteredViewport/isFullyVisible.

### `_onResize`

Resize handler — remeasures card geometry and re-poses.

### (module scope)

JSX template (delegate — ./mentions-deck/render.tsx).
