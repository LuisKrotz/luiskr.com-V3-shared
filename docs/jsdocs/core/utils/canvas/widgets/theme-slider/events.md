# `core\utils\canvas\widgets\theme-slider\events.ts`

Pointer/click/keyboard wiring for ThemeSliderWebGL,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\theme-slider\events.ts`    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `bindThemeSliderEvents`

Wires pointer/click/keyboard handlers onto the slider's canvas.

### (module scope)

Keyboard stepping: ←/↓ step left (toward dark), →/↑ step right
(toward light), Home/End jump to the ends. Keys jump straight to
the snapped stop — the spring then animates the thumb into place.
The canvas carries `role="slider"` + a real `tabindex` in the
preferences render, so it is the actual focus target.

### `snap`

Snaps the track to an integer stop and commits the theme change —
shared by the arrow steps and the Home/End boundary jumps.
