# `website\components\media\modal-trigger.ts`

Modal trigger-focus registry for &lt;media-figure&gt;/&lt;media-expanded&gt; —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\modal-trigger.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_trigger`

Pending focus-restore closure for the figure that opened the modal.

### `_pageTitle`

Document title parked before the media deep-link suffix went on.

### `setMediaModalTrigger`

Registers the focus-restore closure for the current modal open.

- `@param` fn — closure that focuses the trigger's expand control.

### `restoreMediaModalTrigger`

Runs the registered trigger-restore closure, then clears it — one-shot:
a stale closure must never fire on the next unrelated modal close.

### `setMediaPageTitle`

Appends the media label to document.title while its deep-link URL is
in the address bar — a /portfolio/<p>/<media> URL names its own asset
(watch page), so the live title mirrors the emitted page's
"… | <label>" <title>. The pre-modal title parks once (a second open
never stacks suffixes) for restoreMediaPageTitle to hand back.

- `@param` label — the media item's caption/label.

### `restoreMediaPageTitle`

Hands the parked pre-modal title back to the document — the media
slug leaves the URL on close, so the title reverts with it.
