# `website\components\home\about\titlefit.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\titlefit.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Live fit session parked on the host.

### `ro`

Observer on the h2 — re-targeted every render pass.

### `fontsWired`

One-shot guard — the fonts-ready re-sync is wired once per session.

### `_LAST_TEXT_W`

Last measured title width per host — also the "already read this
task" dedupe: present ⇒ syncTitleFit republishes instead of
re-reading. Cleared on the task boundary via queueMicrotask.

### `syncTitleFit`

Measures the title's rendered text width and writes it to the portrait
wrapper's --about-picture-w. Reads the h2's first element child — the
inline <draw-text> host whose border box IS the text line — and skips
degenerate reads (no nodes yet, zero-width layout in tests). The write
is dirty-checked so repeat syncs never churn inline style.

- `@param` host The <about-section> component the session parks on.

### `attachTitleFit`

Arms the fit session: seeds the parked session, (re)targets the h2
observer — the node is re-created on every render — and wires the
one-shot fonts-ready re-sync, then runs a synchronous measure so the
portrait's first paint already carries the title-matched width.
Idempotent — safe to call from every render pass.

- `@param` host The <about-section> component the session parks on.

### `disarmTitleFit`

Stops the observer and drops the session — the element is leaving the
DOM, so the next mount re-arms from scratch.

- `@param` host The <about-section> component the session parks on.
