# `core\tokens\classes\card-stack.ts`

Card-stack deck class tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\card-stack.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CARD_STACK_CLASSES`

Frozen card-stack class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `CARD_STACK_INDEX_OPEN`

Section-level modifier published while the all-projects index is open —
dims the deck and reveals the index panel.

### `CARD_STACK_TOGGLE`

"View all" pill toggle in the header.

### `CARD_STACK_DECK`

The fanned deck region — pointer/swipe surface.

### `CARD_STACK_DECK_DRAGGING`

Modifier on the deck while a drag gesture is live — kills CSS
transitions so transforms track the pointer 1:1.

### `CARD_STACK_CARD_ACTIVE`

Front-card modifier — the lit, face-on card of the coverflow.

### `CARD_STACK_CARD_HIDDEN`

Off-fan modifier — the card left the visible coverflow window.

### `CARD_STACK_CARD_IMG_PLACEHOLDER`

Progressive-cover layers — intrinsic-size SVG reserves the painted
box, LQIP first paint, then the display ladder fades in over it.

### `CARD_STACK_CARD_IMG_LOADED`

Published on the high layer's `load` — the CSS crossfade trigger.

### `CARD_STACK_CARD_INFO`

In-card project copy (title/description/link) — the "entire card"
content of the stacked phone/portrait layouts; hidden on the fan
tiers where the text column carries the copy instead.

### `CARD_STACK_CARD_INFO_TITLE`

The card's own project name on stacked layouts.

### `CARD_STACK_CARD_INFO_DESC`

The card's own CMS description on stacked layouts.

### `CARD_STACK_CARD_INFO_CTA`

The card's own "Check out" affordance on stacked layouts (the card
link itself is the anchor — this is styled copy, not a nested
interactive element).

### `CARD_STACK_CARD_BURNING`

Modifier on the card while a burn session owns its in-card title.

### `CARD_STACK_CARD_INFO_TITLE_BURNING`

Ink-hidden state on the in-card title while the canvas owns its
pixels.

### `CARD_STACK_CARD_INFO_TITLE_BURN`

The combustion canvas absolutely positioned over the in-card
title box.

### `CARD_STACK_CARD_INFO_TITLE_SLOT`

Rewrite-slot class the burn contract requires — card-stack never
inserts the slot.

### `CARD_STACK_CARD_INFO_TITLE_DUP`

Spacer-dup class the burn contract requires (unused — no slot).

### `CARD_STACK_CARD_INFO_TITLE_REWRITE`

Draw-text rewrite class the burn contract requires (unused).

### `CARD_STACK_INFO`

Active-project text column — left of the fan on landscape/desktop
layouts, stacked under it on phones and portrait tablets.

### `CARD_STACK_INFO_TITLE`

Active project's name — plain text the paper-burn consumes and
re-knits on every nav (burn-out, text swap, burn-in).

### `CARD_STACK_INFO_DESC`

Body copy — the project's full CMS description.

### `CARD_STACK_INFO_CTA`

"Check out →" link to the active project's route.

### `CARD_STACK_INFO_BURNING`

Modifier on the text column while a burn session owns the title.

### `CARD_STACK_INFO_TITLE_BURNING`

Ink-hidden state on the title while the canvas owns its pixels.

### `CARD_STACK_INFO_TITLE_BURN`

The combustion canvas absolutely positioned over the title box.

### `CARD_STACK_INFO_TITLE_SLOT`

Rewrite-slot class the burn contract requires — card-stack never
inserts the slot (burn-in happens on the title itself).

### `CARD_STACK_INFO_TITLE_DUP`

Spacer-dup class the burn contract requires (unused — no slot).

### `CARD_STACK_INFO_TITLE_REWRITE`

Draw-text rewrite class the burn contract requires (unused — no slot).

### `CARD_STACK_COUNTER`

"PROJECT 01 OF 08" counter heading the text column.

### `CARD_STACK_HINT`

"Drag or swipe to explore" affordance copy.

### `CARD_STACK_HINT_ICON`

Animated hand-gesture SVG inside the hint.

### `CARD_STACK_ARROW`

Arrow glyph inside the prev/next foot buttons — nudges outward on
hover/focus (the carousel controls' ±4px affordance contract).

### `CARD_STACK_AUTOPLAY`

Autoplay play/pause transport in the foot nav — the border-light
countdown's only manual control.

### `CARD_STACK_AUTOPLAY_ARMED`

Button modifier while the countdown runs — swaps the play glyph
for pause bars (the button shows the ACTION it performs).

### `CARD_STACK_AUTOPLAY_PLAY`

The play-triangle glyph inside the autoplay button.

### `CARD_STACK_AUTOPLAY_PAUSE`

The pause-bars glyph inside the autoplay button.

### `CARD_STACK_TIMER`

The border-light band inside each card — a conic-gradient fill
masked to the rounded edge that draws itself while the autoplay
countdown runs (the 10s progress a user can see without a
numeric counter).

### `CARD_STACK_AUTO`

Section modifier while the countdown is armed — reveals the
active card's border light.

### `CARD_STACK_AUTO_PAUSED`

Section modifier while the countdown is frozen — a user pause or
the off-screen hold; the light hangs mid-orbit.

### `CARD_STACK_NAV_INDEX`

Deck-stack icon button between prev/next — the stacked layouts'
compact "view all" affordance (replaces the dot cluster there;
opens the same index overlay the header toggle does).

### `CARD_STACK_NAV_INDEX_ICON`

Stacked-cards glyph inside the nav-index button.

### `CARD_STACK_NAV_INDEX_NUM`

Live "1 / 13" position text beside the nav-index glyph — the
stacked layouts' counter (replaces the header counter there; the
aria-label carries the localized "Project 1 of 13" phrase).

### `CARD_STACK_NAV_INDEX_DEAL_NEXT`

Deal animation on the nav-index icon after a next nav — the top
card of the glyph flings forward and slides back under the stack.

### `CARD_STACK_NAV_INDEX_DEAL_PREV`

Deal animation mirrored for a prev nav.

### `CARD_STACK_DOT_NUM`

Visible position number inside each nav dot (shared dot-nav grid).

### `CARD_STACK_INDEX`

All-projects index overlay — strip rail on desktop, bottom sheet on mobile.

### `CARD_STACK_INDEX_NAV`

Prev/next arrow cluster in the index head — scrolls the rail.

### `CARD_STACK_INDEX_PREV`

Rail scroll-backward arrow.

### `CARD_STACK_INDEX_NEXT`

Rail scroll-forward arrow.
