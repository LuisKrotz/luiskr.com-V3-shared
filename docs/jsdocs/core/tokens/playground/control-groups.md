# `core\tokens\playground\control-groups.ts`

Declarative control-panel schema for the Earth Playground —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\playground\control-groups.ts`            |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `key`

SP_*_PARAMS member name (e.g. 'FOV' → SP_CAMERA_PARAMS.FOV).

### `label`

Translation key looked up in the earth-playground node (and the CMS `defaults` map key).

### `min`

Slider minimum.

### `max`

Slider maximum.

### `step`

Slider step granularity.

### `def`

Shipped numeric default — CMS defaults and saved values override it.

### (module scope)

Checkbox row — same `key`/`label` contract, `checked` carries the shipped state.

### `key`

SP_*_PARAMS member name (e.g. 'BLOOM' → SP_POST_PARAMS.BLOOM).

### `label`

Translation key looked up in the earth-playground node (and the CMS `defaults` map key).

### `checked`

Shipped checkbox state — same override precedence as `def`.

### (module scope)

One control row — slider or checkbox by shape.

### (module scope)

Group-level action button — `key` names the SP_ACTIONS member that owns the wire action string.

### `key`

SP_ACTIONS member name (e.g. 'RESET' → SP_ACTIONS.RESET).

### `label`

Translation key looked up in the earth-playground node.

### (module scope)

One collapsible panel group — `label` is the group's translation key.

### `label`

Translation key for the group header.

### `collapsed`

Whether the group starts folded.

### `controls`

The group's input rows.

### (module scope)

Optional buttons rendered under the controls.

### `SP_CONTROL_GROUPS`

Control-panel group tree — sole declaration site for the panel's
structure (group order, fold state, per-control range geometry and
shipped defaults). `space/controls.ts` expands it into SLIDER_GROUPS
by resolving `key` through the param/action token maps and deriving
the FORM_ATTRS input type from each row's shape; the build scripts
expand it the same way to describe the canvas-rendered control
surface to crawlers and agents.
