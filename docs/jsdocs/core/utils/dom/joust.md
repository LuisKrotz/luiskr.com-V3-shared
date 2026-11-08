# `core\utils\dom\joust.ts`

"Joust" — the click-to-reveal contract for round icon

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\dom\joust.ts`                             |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_open`

Chips currently pinned open by a joust tap — one member in practice (single-open).

### `_hoverless`

Hover-less-primary check — `(hover: none)` marks devices whose primary
input can't hold `:hover`, the only context where a tap must reveal
the label before it can activate. A missing `window`/`matchMedia`
(SSR, bare test shims) counts as hover-capable so scripted `.click()`s
and keyboard activations keep firing single-shot.

- `@returns` True when the gate should intercept pointer taps.

### `_pointerish`

Whether the event is a real pointer click. Only `MouseEvent` with a
positive `detail` (click count) counts — keyboard/programmatic clicks
carry `detail` 0, and plain `Event('click')` dispatches are scripted
by definition (same discrimination armResidualInputGuard applies).

- `@param` e The activation event, if one exists.
- `@returns` True when the activation came from a physical pointer click/tap.

### `_release`

Removes the pin modifier + set membership from one chip.

### `_arm`

Arms the dismissal listeners — identical addEventListener signatures
dedupe natively, so repeat pins never stack the sweep.

### `_disarm`

Disarms the dismissal listeners — a no-op when they were never armed.

### `joustCollapseAll`

Collapses every pinned chip and disarms the listeners — also called
when an owning surface takes over the screen (menu open, host destroy)
so no stale label stays poured behind it.

### `_onPress`

Capture-phase press sweep: any pointerdown lands BEFORE the click it
produces, so this runs ahead of the gate — a press outside a pinned
chip collapses it (the following click then jousts its own chip), a
press inside keeps it (the following click activates). Detached chips
— a re-render replaced them — are pruned on the same sweep.
`composedPath` is required because chip clicks bubble out of the
shadow root retargeted to `<app-nav>`; `e.target` alone would read
every inside-chip press as outside. The `Node.contains` fallback
covers environments without `composedPath`.

- `@param` e The pointerdown event.

### `_onKey`

Escape collapses every pinned chip without firing — same dismissal as an outside press.

### `joustChip`

The joust gate for a chip element — returns `true` when the chip's
action should fire, `false` when this tap was consumed to pour the
label. `chip` may be the `joust` root itself or any descendant
(icon, label span, canvas) — the root resolves through `closest`.
`pointerInitiated` distinguishes physical taps from scripted calls:
pass `false` for keyboard, programmatic or test activations, which
always fire single-shot.

- `@param` chip Element the activation landed on (or null — no chip → fire).
- `@param` pointerInitiated True for real pointer presses.
- `@returns` True = run the action; false = the click jousted the label open.

### `joustClick`

Event-flavored gate for DOM click handlers — resolves the chip from
`currentTarget` and derives pointer-vs-keyboard from `detail`, so a
single call slots in front of an existing handler:
`if (!joustClick(e)) return`.

- `@param` e The click event (undefined for programmatic calls → fires).
- `@returns` True = run the action; false = the click jousted the label open.
