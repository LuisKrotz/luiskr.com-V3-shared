# `website\views\project\modal-dom.tsx`

Imperative expand-modal sync for &lt;view-project&gt;: mirrors

| | |
|---|---|
| **Source** | `src/website\views\project\modal-dom.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `updateModalDOM`

Store → DOM modal sync (open: showModal + mount media; close: release).

### `onProjectStoreUpdate`

Store change → reload on locale switch, otherwise sync modal DOM.
