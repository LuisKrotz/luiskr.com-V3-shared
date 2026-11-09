# `cms\projects\data.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\data.ts`                      |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

Reads the locale's `projects/` node, sorts the key list, and auto-
selects the first project when none is chosen — then chains into
`loadProjectData` so the editor opens populated. Empty nodes clear
the selection and render the "no projects" state.

- `@param` host — the host component holding `projectKeys`/`currentProject`

### (module scope)

Reads one project's full record — normalizes `sections` (array or
keyed map) through `normalizeSection` into the `[texts, media]` tuple
shape the renderer and event writers both index into. Missing
`cover`/`seo` nodes get token defaults so the form never reads holes.

- `@param` host — the host component holding `selectedProjectKey`

### `createProjectPrompt`

Creates a new project locally (not yet persisted) — prompts for the
slug, sanitizes it to `[a-z0-9_-]`, seeds the model with a title,
folder prefix, default cover, and empty sections, then selects it.
The record lands in Firebase only on Save.

- `@param` host — the host component holding `projectKeys`/`currentProject`

### (module scope)

Deletes the selected project across every locale — loops languages
removing `projects/<key>` nodes (the slug is structural, so a partial
delete would orphan other languages' copies), then reloads the key
list so the selector lands on a valid entry.

- `@param` host — the host component holding `selectedProjectKey`

### (module scope)

Writes the current project back to its locale node — the whole record
(title/folder/seo/cover/sections) is replaced atomically since the
editor owns the complete shape.

- `@param` host — the host component holding `currentProject`
