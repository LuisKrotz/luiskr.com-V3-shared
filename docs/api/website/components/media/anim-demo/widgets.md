# `website\components\media\anim-demo\widgets.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\widgets.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_THEME_STOPS`

Theme stops the slider demo walks (dark → system → light, production order).

### `stageCanvas`

Finds the stage's widget canvas — the stages render exactly one.

- `@param` stage The demo stage root.
- `@returns` The canvas element, or null.

### `mountBurger`

Nav burger → ✕ liquid morph — the real BurgerButtonWebGL, cycling
hover-pool → open morph → calm-X → close, the four beats the nav
drives with pointer + menu state.

- `@param` ctx The demo context (stage owns the icon canvas).
- `@returns` Teardown — stops the cycle and destroys the widget.

### `mountMenuBackground`

Nav menu backdrop — the real MenuBackgroundWebGL contour field:
start() reveals it exactly like menu-open; release() dissolves it.
The cycle alternates the two so the reveal ease replays forever.

- `@param` ctx The demo context (stage owns the fullscreen canvas).
- `@returns` Teardown — stops the cycle and destroys the widget.

### `mountFlag`

Locale flag — the real FlagWebGL waving the first LANG_OPTIONS entry.
The wave is the whole animation; no state cycle needed.

- `@param` ctx The demo context (stage owns the flag canvas).
- `@returns` Teardown — destroys the widget.

### `mountSwitch`

Preference switch — the real SwitchWebGL ('stats' context, the ECG
variant) toggling itself on the cycle the preferences panel's pointer
would.

- `@param` ctx The demo context (stage owns the switch canvas).
- `@returns` Teardown — stops the cycle and destroys the widget.

### `mountTheme`

Theme slider — the real ThemeSliderWebGL walking the dark → system →
light stops via its own setTheme() spring. The onThemeChange callback
stays null: the demo animates the track without touching the site's
real theme preference.

- `@param` ctx The demo context (stage owns the theme canvas).
- `@returns` Teardown — stops the cycle and destroys the widget.

### `mountClose`

Modal close ✕ — the real CloseButtonWebGL cycling hover-fill (+ the
occasional click shockwave) exactly like a pointer would.

- `@param` ctx The demo context (stage owns the close canvas).
- `@returns` Teardown — stops the cycle and destroys the widget.
