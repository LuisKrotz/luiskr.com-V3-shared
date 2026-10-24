# `website\views\project\modal.ts`

Auto-open logic for ViewProject — when the route slug matches a media item label, commits the expand-modal payload (source/thumb/size) to the store.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\project\modal.ts`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `openModalForItem`

Commits the expand-modal payload for a matched media item — the same
shape `openMediaModal` writes so deep-link opens and click opens
behave identically.

- `@param` storage CDN base URL from the store.
- `@param` folder Project folder segment for the media path.
- `@param` item The matched project media item.

### `checkAutoOpenModal`

Checks auto open modal.

- `@param` c — the component
