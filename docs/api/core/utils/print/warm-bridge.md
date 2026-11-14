# `core\utils\print\warm-bridge.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\print\warm-bridge.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Eager seam between the component layer's shadow roots and the lazily
loaded print module. The print warm-up fetches each printed image's
top-quality URL ahead of `beforeprint` so the src swap is cache-hot at
snapshot time — but `load` is a non-composed event: a document-level
listener never sees imgs resolving inside a shadow root. Components
register their roots here at construction (this module is small enough
to stay in the eager bundle); each root wires its capture listener
immediately, and `initPrintSupport` later hands the real warm hook to
the queued roots so their already-loaded imgs still get swept.

### `warmImg`

The print module's per-img warm hook — null until the lazy chunk runs.

### `queuedRoots`

Roots registered before the print module installed its hook.

### `onScopedLoad`

Shared capture listener — forwards every img that finishes loading
inside a registered shadow root to the installed warm hook. `load`
neither bubbles nor composes, so this must live per-root. Before
`installPrintWarm` runs the hook is null and the event is a no-op —
the install-time sweep re-warms every queued root's imgs anyway.

- `@param` event DOM event — only IMG targets do work.

### `bindPrintWarm`

Registers a component shadow root for print-source warming. Called from
the Component constructor: the capture listener attaches immediately
so no post-registration load escapes, and the root joins the pre-install
queue only while the lazy print hook is still absent.

- `@param` root Component shadow root to wire.

### `installPrintWarm`

Installs the real warm hook — called once by `initPrintSupport`. Hands
back every root queued before installation so the caller can sweep
their already-loaded imgs (load events that fired before the hook
existed). Roots bound afterward already carry their listener and route
loads straight into `warm`.

- `@param` warm The print module's per-img warm function.
- `@returns` Roots queued before installation — for the one-time sweep.
