# `cms\lang\CmsLangEditor.tsx`

&lt;cms-lang-editor&gt; — raw JSON dictionary editor: any

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\lang\CmsLangEditor.tsx`                |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `CmsLangEditor`

<cms-lang-editor> — the raw-JSON escape hatch: locale + node pickers
select a translations subtree, the textarea edits it as pretty-printed
JSON, and save parses-then-writes so a syntax error aborts before any
malformed blob reaches the site.

### (module scope)

Lifecycle: loads language data.

### `loadData`

Reads the language nodes for all locales.

### `saveData`

Writes the edited JSON back — parse failure aborts before the write
(an invalid blob would crash every consumer of that node), so the
editor surfaces the syntax error and keeps the stored copy intact.

### (module scope)

Save/lang/node/textarea bindings — scoped so re-render re-binds cleanly.

### (module scope)

Header + save, two pickers (locale, node), and the JSON textarea card.
