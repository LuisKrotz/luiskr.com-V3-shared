# `website\components\portfolio\Related.tsx`

&lt;portfolio-related&gt; — "related projects" conveyor at the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\portfolio\Related.tsx`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `PortfolioRelated`

The PortfolioRelated — related class.

### `_onListKeydown`

Arrow-key steps while focus sits inside the conveyor — ↓ advances,
↑ rewinds. preventDefault stops the key from scrolling the page
under the user's hand.

### `storage`

CDN base URL for project media.

### `projectsList`

Maps the DB `related.projects` rows into display-ready cards — see
related/match.ts for the fuzzy link/image/title join against the
home portfoliolist.

### `_advanceList`

One conveyor step: the first unfolded row folds (1fr→0fr + inert), the
first folded row after the window unfolds. The DOM invariant is
[unfolded window][folded tail…] — kept by appending each folded node
to the tail once its collapse lands (zero height ⇒ invisible), so the
wrap back to the first item lands through the same
expand-from-collapsed accordion motion as every other step.

### `_scheduleListReorder`

Moves a just-folded node to the list tail once its 0fr collapse has
finished (REORDER_DELAY is sized past the .6s fold). A second step
landing before the watchdog — possible through back-to-back manual
steps — flushes the pending move first, keeping the
[open][closed…] invariant intact.

- `@param` container The .related-list node that owns the row.
- `@param` node The folded row to append to the tail.

### `_stepList`

One manual conveyor step: +1 runs _advanceList (top row folds, next
unfolds); −1 runs _retreatList — the most recently folded row (the
tail's end) moves to the top and unfolds while the window's bottom
row folds in place — the bellows played backwards. A pending
forward reorder flushes first so the [open][closed…] scan reads
settled DOM. No tail-append is needed on rewind: the folding row
already sits exactly where folded rows live (first slot after the
window).

- `@param` dir 1 advances, −1 rewinds.

### `_retreatList`

The reverse fold — see _stepList.

### `_flushListReorder`

Lands the pending collapsed-node move (watchdog or early flush).

### `_syncList`

Rebinds the conveyor key handler whenever a render recreates the
list node — the plain bind dies with the detached node. A list that
fits its window has no folded rows to step through, so no listener
is bound there.

### (module scope)

Lifecycle: seeds translations from the store (they may already be
loaded by the view), kicks the SWR fetch for the two DB nodes it
needs, and subscribes to the router — navigating between projects
re-runs the fuzzy match against the new page's related list.

### (module scope)

Lifecycle: removes the router subscription + conveyor state.

### `_syncAnimDescs`

Binds animation descriptions to the animated nodes the render just
produced — every related row's hover lift. Must run post-render
(never in the JSX): the desc node is injected per root, so applying
on detached nodes would spawn duplicate `lk-anim-desc-*` ids — a
WCAG failure. Re-rendered nodes are re-bound; idempotent on repeats.

### `_syncRingSheen`

Keeps the instanced ring-sheen overlay bound to the live
`.related-list` node — renders recreate the strip, so a session
mounted on a detached node is torn down and remounted. Without
WebGPU the mount is a no-op and the CSS pseudo rings stay.

### `fetchData`

Fires two SWR reads in parallel: the home page node (for the
portfoliolist join table) and the components/related node — see
related/data.ts.

### (module scope)

JSX template for the component's shadow DOM.
