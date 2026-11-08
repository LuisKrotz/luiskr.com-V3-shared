# `website\components\home\cardstack\autoplay.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\autoplay.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `applyAutoChrome`

Publishes the countdown state to the DOM: the section's --auto /
--auto-paused modifiers drive the border light's visibility and
freeze, and the transport button's --armed class + aria-label swap
the pause-bars/play-triangle glyph so it always shows the action it
performs. Imperative (no re-render) — same contract as
applyIndexState.

- `@param` host The CardStack element.

### `paintAutoProgress`

The DOM rings' progress writer — --card-stack-timer-p on the HOST's
inline style inherits through the shadow boundary into the active
card's conic-gradient border band and the transport's rim ring, so
one write drives both lights off the same banked clock. A rAF loop
repaints while the countdown runs (@property + keyframe animation is
unusable — registered custom properties don't interpolate inside a
shadow-adopted sheet, so the gradient stop must be written, not
animated). Paused/held writes once and freezes; stopped removes the
property entirely.

- `@param` host The CardStack element.

### `autoplayAllowed`

The autoplay eligibility gate — the countdown is a fan-tier surface
only: the stacked mobile/tablet layouts get no countdown, no border
light, and no transport button (the stylesheet hides it under the
same 1280 boundary). Arms and the transport both check this so a
stacked tier can never start the clock.

- `@param` host The CardStack element.
- `@returns` True on a desktop fan tier with a populated deck.

### `restartClock`

(Re)starts the countdown clock — clears any pending tick and arms a
fresh timeout for the banked remainder. The DOM light needs no kick:
its animation's start/resume follows the section modifiers.

- `@param` host The CardStack element.

### `armAutoplay`

Arms the countdown from zero on the current card — the deck's
auto-start on mount (gated on reduced-motion by the caller) and the
play control's restart after a full stop.

- `@param` host The CardStack element.

### `autoTick`

The countdown's expiry — advances the fan one card and re-arms.
goTo() itself never kills autoplay (the manual-nav wrappers do), so
the orbit light hand-off is just the new front card's --active
modifier: its DOM timer span starts orbiting the moment the class
lands, in lockstep with this re-armed clock.

- `@param` host The CardStack element.

### `toggleAutoplay`

The play/pause transport: running → pause (banks the in-flight span,
the light freezes mid-orbit); paused → resume (the light continues
from its frozen point); off → a fresh 10s arm on the current card.

- `@param` host The CardStack element.

### `stopAutoplay`

Kills autoplay entirely — the manual-nav response (prev/next/dots,
card click, committed drag, view-all). The light hides and the bank
resets, so the next play starts a fresh countdown.

- `@param` host The CardStack element.

### `holdAutoplay`

The visibility hold — the section IO and the document's
visibilitychange freeze a running countdown while the deck can't be
seen (banked like a pause, but resuming by itself when the surface
returns — a user pause stays paused). The frozen state shares the
--auto-paused paint (a held light looks identical to a paused one).

- `@param` host The CardStack element.
- `@param` held True while the deck is off-screen/tab-hidden.
