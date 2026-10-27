# `core\tokens\events\dom.ts`

Native DOM event-name tokens split by input modality —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\events\dom.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MOUSE_EVENTS`

Frozen mouse event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `TOUCH_EVENTS`

Frozen touch event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `POINTER_EVENTS`

Frozen pointer event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `KEYBOARD_EVENTS`

Frozen keyboard event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `FOCUS_EVENTS`

Frozen focus event-name map — `focusin`/`focusout` bubble (needed for
delegation on shadow hosts) while `focus`/`blur` do not; both pairs are
kept so listeners pick the right variant for the propagation model.

### `FORM_EVENTS`

Frozen form event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `DRAG_EVENTS`

Frozen drag event-name map — the HTML5 drag-and-drop subset used by CMS
upload zones (`drop` fires on the target, `dragover` must be
preventDefault'ed for drop to be allowed per the DnD spec).

### `WINDOW_EVENTS`

Frozen window event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `MEDIA_EVENTS`

Frozen media event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `ENDED`

`ended` — media element reached the end of its current source.

### `PLAY`

`play` — playback began (autoplay, native controls or script).

### `PAUSE`

`pause` — playback paused (native controls or script).

### `ANIMATION_EVENTS`

Frozen animation event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `GL_EVENTS`

Frozen gl event-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.

### `ORBIT_EVENTS`

Frozen orbit-control event-name map — three.js OrbitControls lifecycle
events (user gesture start/end, per-frame change).

### `CLIPBOARD_EVENTS`

Frozen clipboard event-name map — copy/cut/selection events the docs
portal intercepts for its source-code copy guard.

### `PRINT_EVENTS`

App-level print lifecycle — `beforeprint`/`afterprint` are browser-native
window events (in CLIPBOARD_EVENTS for legacy grouping); these two let live
engines answer a canvas-capture request and views sync generated content
into the printable mirror before the print sheet opens.

### `CAPTURE`

Dispatched on a canvas before toDataURL — engines re-render then set detail.dataUrl.

### `PREPARE`

Dispatched on window before the print walk — views sync printable DOM first.

### `SW_EVENTS`

Frozen service-worker event/state map — registration lifecycle
(`updatefound` on the registration, `statechange`/`installed` on the
installing worker) plus window online/offline. Local replacement for
the retired `register-service-worker` dependency.

### `SW_STRINGS`

ServiceWorker state strings + registration plumbing constants.

### `SCRIPT_MIME`

Content-type fragment a valid SW script must answer with.

### `CONTENT_TYPE`

Response header read by the localhost validity probe.

### `PROBE_HEADER`

Request header sent by the localhost probe (mirrors real SW fetches).

### `PROBE_VALUE`

Probe header value — browsers tag SW script requests this way.
