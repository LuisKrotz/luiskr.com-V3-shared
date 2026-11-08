# `website\components\media\anim-demo\types.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\types.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One driver's mount context — everything it needs from the host.

### `host`

The <anim-demo> host — exposes the shadow-scoped `$`/`$$` helpers
the genie + burn contracts require and owns the demo's lifecycle.

### `stage`

The stage root (`anim-demo` class element) rendered for this id.

### `id`

The ANIMATION_IDS entry being demoed — drivers read record copy
(alt/longdesc) through it when staged text is needed.

### (module scope)

A demo mount — wires the stage and returns a teardown (or nothing
when the animation needs no explicit teardown, e.g. the skeleton
layer the base component owns).
