# `core\utils\dom\shared-observer.ts`

Shared IntersectionObserver pool for media figures. A media

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\dom\shared-observer.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Handle returned by observeShared — mirrors the disconnect() surface the
figure fields used when they held raw IntersectionObserver instances.
`callback` exposes the pool's entry dispatch so tests can inject entries
the same way happy-dom observers expose `.callback`.

### `disconnect`

Stops observing the element and drops its handler from the pool.

### `callback`

Routes raw entries through the pool's per-target dispatch (test surface).

### (module scope)

One pooled IntersectionObserver + the element→handler routing table.

### `pools`

Options-signature → pool. Instances never change options after construction.

### `poolKey`

Serializes observer options into a pool key — same signature means the
instances are interchangeable and one real IntersectionObserver can
serve every element.

- `@param` opts The IntersectionObserverInit the caller would have used.
- `@returns` Stable string key for the options signature.

### `observeShared`

Observes `el` through the pooled IntersectionObserver for `opts`,
invoking `handler` with each entry whose target is `el`. Returns a
handle whose disconnect() unobserves just this element — the pool and
its other observed targets stay alive.

- `@param` el The element to observe.
- `@param` handler Per-element entry callback.
- `@param` opts Options signature selecting the pool.
- `@returns` Handle with a disconnect() matching IntersectionObserver's.
