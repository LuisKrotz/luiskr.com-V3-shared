# `website\components\carousel\mentions-deck\observer.ts`

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\observer.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.     |

## Members

### `setupObserver`

Autoplay only runs while ≥50% of the deck is on screen (threshold
[0, 0.5] gives a clean two-state signal); below that or under
reduced-motion it pauses — offscreen animation would burn frames the
user can't see. When IntersectionObserver itself is absent (very old
engines, some test DOMs) the deck degrades to always-visible so content
still shows.

- `@param` host The MentionsDeck element.

### `onResize`

Refits on container resize — re-measures the card box and rewrites
poses against the new geometry without animation.

- `@param` host The MentionsDeck element.
