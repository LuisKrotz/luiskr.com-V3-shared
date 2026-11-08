# `website\components\carousel\mentions-deck\render.tsx`

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `renderCard`

One strip card — the stretched outbound link carries the zero-padded
ordinal, the CMS description markup, and the badge image (or the icon
glyph when no media ships). Geometry arrives via applyPoses() writes.

- `@param` host The MentionsDeck element.
- `@param` item The mention row.
- `@param` i Deck index — drives the printed ordinal.
- `@param` len Deck length — drives the group aria-label denominator.
- `@param` ofLabel Localized "of" connector for the group label.

### `renderSkeleton`

Skeleton strip — three shimmer cards centered like the loaded deck so
the swap doesn't shift the section geometry. The poses come from the
same stripPose() the real cards use (center anchor + margined step);
the detached default skips the edge fade so all three stay visible.

### `renderMentionsDeck`

JSX template for the component's shadow DOM — the section title, the
absolutely-positioned strip cards, then the hint + dot nav chrome. An
empty item list emits the skeleton strip so the section keeps its box.

- `@param` host The MentionsDeck element.
