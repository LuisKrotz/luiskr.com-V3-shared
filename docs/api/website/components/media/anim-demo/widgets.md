# `website\components\media\anim-demo\widgets.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\widgets.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_THEME_STOPS`

Theme stops the demo walks — the production order (dark → system → light).

### `stageCanvas`

Finds the stage's widget canvas — the stages render exactly one per
widget demo (the flag row queries its own NodeList instead).

- `@param` stage The demo stage root.
- `@returns` The canvas element, or null.

### `unpool`

Detaches a demo widget's canvas from the shared WebGL context pool.
Production registers every widget canvas so offscreen surfaces can be
purged — but purge deliberately destroys the context and the
re-entry restore can land on a canvas whose re-probe resolves after
the async `webglcontextrestored` event, stranding the widget on its
CSS fallback forever. On the /animations route the showcase IS the
consumer: the stage's own IntersectionObserver already mounts the
widget only inside a 100px viewport band, so the pool reclaim buys
nothing here — and a demo that can be scrolled away mid-purge must
never come back blank. The widgets still degrade normally at mount
(no WebGL → their own is-fallback contract paints the CSS art);
unpool only removes the mid-life purge/restore cycle.

- `@param` canvas The stage's widget canvas.

### `armPrintCapture`

Arms a demo canvas for the print adapter's capture handshake: on
`printcapture` the widget repaints one frame into its GL buffer so the
synchronous toDataURL read that follows has real pixels (the widgets
render with preserveDrawingBuffer:false, so without the repaint the
still would be a transparent blank).

- `@param` canvas Stage demo canvas.
- `@param` repaint Zero-arg frame repaint the armed canvas calls per capture —

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

Locale flag row — one real FlagWebGL per LANG_OPTIONS entry, so the
record lists every flag the widget serves instead of sampling one
locale at a time. The wave is the whole animation; no state cycle.
Each widget shares the pooled flag renderer (refcounted acquire), so
the row costs sixteen small 2D canvases and one shared GL surface.
The flags keep their pool registration: purge/restore is honest for
them — the canvas only ever binds '2d', so re-entry re-acquisition
can't strand on the async WebGL restore the quad widgets hit.

- `@param` ctx The demo context (stage owns the flags row).
- `@returns` Teardown — destroys every mounted flag widget.

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
