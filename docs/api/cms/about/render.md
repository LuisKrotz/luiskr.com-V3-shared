# `cms\about\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\about\render.tsx`                      |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `renderParagraphList`

Renders one bio paragraph column as an editable list — each row gets
reorder/remove controls (data-col/data-index drive the delegated event
handlers in `events.ts`) plus a textarea bound to the paragraph HTML.
An "Add Paragraph" button closes the list; used twice by `renderAbout`
for the left (`col1`) and right (`col2`) bio columns.

- `@param` host — the host component holding `aboutData`
- `@param` col — which bio column key (`'col1'` | `'col2'`) to render

### `renderMentionItems`

Renders the awards/mentions list — each item is a card with reorder/
remove controls and three bound inputs (description, link, icon) that
write back through `data-idx`/`data-field` delegation. Mentions are
non-localized (shared across languages), hence no lang suffix here.

- `@param` host — the host component holding `aboutData`

### `renderAbout`

Renders the full About-section editor — header card (sync/save actions),
language selector, Gravatar picture/size controls, localized title,
the two bio paragraph columns, and the non-localized mentions list.
This is the top-level template `CmsAboutEditor.render()` delegates to.

- `@param` host — the host component holding `aboutData`
