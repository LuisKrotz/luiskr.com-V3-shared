# `core/safari/patches/view-project.ts`

ViewProject patch: manual modal positioning — iOS doesn't layer

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/safari/patches/view-project.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `patchViewProject`

Installs the view-project Safari patch once the element registers:
replaces `_updateModalDOM` with the lifted-dialog variant and wraps
`onDestroy` so a modal lifted into document.body is reaped when the
view unmounts (otherwise it orphans on top of the next page). `onMounted`
is wrapped to inject the safari-internals stylesheet — WebKit does not
reliably unskip `content-visibility: auto` subtrees, so the internal
sections render eagerly on Safari only.
