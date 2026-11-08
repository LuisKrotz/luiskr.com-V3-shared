# `website\components\carousel\mentions-deck\autoplay.ts`

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\autoplay.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.     |

## Members

### `startAutoplay`

Starts the auto-advance ticker. Bails (and actively stops any running
cycle) under reduced-motion, before ≥50% visibility, or while a
page-covering overlay owns the frame — autoplay must never run on an
unseen, covered, or motion-sensitive deck. Re-bases the clock on each
start so a fresh cycle always gets a full dwell.

- `@param` host The MentionsDeck element.

### `stopAutoplay`

Stops auto-advance (reduced-motion, offscreen, overlay). Cancels the
pending RAF so no stray tick survives and clears the dwell accumulation.

- `@param` host The MentionsDeck element.

### `pauseAutoplay`

Freezes the dwell clock (hover, committed drag) — accumulates the
partially-spent dwell into autoplayElapsed and cancels the RAF, but
keeps autoplayRunning so resumeAutoplay can re-arm the ticker.

- `@param` host The MentionsDeck element.

### `resumeAutoplay`

Re-arms the dwell clock after a pause — a no-op when autoplay is not
running or a tick is already scheduled, and it never resurrects a cycle
the gates (reduced-motion, visibility, overlay) would refuse.

- `@param` host The MentionsDeck element.

### `tickAutoplay`

Autoplay RAF tick — advances once `duration` has elapsed. The elapsed
calculation `now - start + accumulated` lets pause/resume continue a
partially-spent dwell instead of restarting it. `activeIdx + 1` wraps
via goTo's ring normalization — no clone slides needed.

- `@param` host The MentionsDeck element.
