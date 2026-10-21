# `shared\src\app\modal.ts`

Modal-state DOM sync for AppRoot — toggles modal-open on html/body and copies the modifier class onto the wrapper. Scroll lock is native: the expand &lt;dialog&gt; runs showModal() so the document is inert behind the top layer — no fixed-position pin, no scroll shift, nothing to restore on close.

| | |
|---|---|
| **Source** | `src/shared\src\app\modal.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `updateAppModalState`

Updates app modal state.
- `@param` c — the component
