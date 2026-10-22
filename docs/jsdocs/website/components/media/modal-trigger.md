# `website\components\media\modal-trigger.ts`

Modal trigger-focus registry for &lt;media-figure&gt;/&lt;media-expanded&gt; —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\modal-trigger.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `setMediaModalTrigger`

Registers the focus-restore closure for the current modal open.

- `@param` fn — closure that focuses the trigger's expand control.

### `restoreMediaModalTrigger`

Runs the registered trigger-restore closure, then clears it — one-shot:
a stale closure must never fire on the next unrelated modal close.
