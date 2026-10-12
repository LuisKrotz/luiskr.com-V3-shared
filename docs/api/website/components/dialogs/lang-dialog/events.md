# `website/components/dialogs/lang-dialog/events.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/dialogs/lang-dialog/events.ts`  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `OPTION_SEL`

Selector matching any rendered option button (locale or theme row).

### `GRID_SEL`

Selector matching the options grid that wraps the buttons.

### `moveFollower`

Positions the glass follower over `btn` (transform only — no layout).

### `updateToActive`

Snaps the follower back onto the active locale's button.

### `BOUND_HOSTS`

Hosts whose once-only bindings exist — Escape/resize + delegated follower.

### `bindDelegatedFollower`

Tracks pointer/focus movement across the option grid through a single
delegated listener set on the persistent shadow root. Re-rendering swaps
the option nodes wholesale every store update, so per-node listeners
would both re-bind and strand dead disposers on the host until
disconnect; delegation resolves the live target at event time instead.

### `bindWindowDismissal`

Window-level dismissal + follower-reposition bindings plus the delegated
follower tracking. Bound once per element — re-running bindEvents after
each store update would otherwise pile duplicate window listeners onto
the persistent element (its disposers only drain on disconnect, which
never happens for a shell child). Handlers query the live shadow tree
so stale-node captures are impossible.

### `bindEvents`

Repositions the follower after each open/re-render and binds the
once-only window + delegated listeners. Option/backdrop/close clicks
are JSX `onClick` props on the rendered buttons — duplicating them
here would fire selectLang/close twice per click.
