# `core\utils\dom\orphan-seps.ts`

Footer-nav orphan-separator suppression. Dot+item pairs are

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\dom\orphan-seps.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `markWrapLeaders`

One pass over a nav's pair elements: toggles `leadCls` on every pair
whose box-top differs from the previous pair's — i.e. the first pair
of each wrapped line. Runs from the ResizeObserver callback and once
synchronously so the initial layout is classified before first paint
settles (fonts may still shift it — the observer re-fires).

- `@param` nav The footer nav element containing the pairs.
- `@param` pairCls The pair class (dot+item atomic unit).
- `@param` leadCls The modifier toggled on wrap-leading pairs.

### `watchOrphanSeps`

Watches a footer nav and keeps every wrap-leading pair marked so its
leading separator can be hidden. A ResizeObserver on the nav refires
whenever the row re-wraps (viewport resize, font load, locale switch);
the synchronous first pass covers the mount layout. Returns a teardown
that disconnects the observer.

- `@param` nav The footer nav element (query root for the pairs).
- `@param` pairCls The pair class (dot+item atomic unit).
- `@param` leadCls The modifier toggled on wrap-leading pairs.
- `@returns` Cleanup function disconnecting the observer.
