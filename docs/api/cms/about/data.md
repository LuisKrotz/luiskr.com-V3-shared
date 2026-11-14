# `cms\about\data.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\about\data.ts`                         |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

Reads the locale's `pages/about` node into `aboutData` — the Gravatar
`?s=` size param is reverse-parsed out of the stored URL so the
preset buttons highlight the saved size instead of the default.

- `@param` host — the host component holding `aboutData`/`gravatarSize`

### (module scope)

Writes the whole `aboutData` model back to `pages/about` — the editor
owns the complete node shape so a single `set` replaces it atomically.

- `@param` host — the host component holding `aboutData`/`selectedLang`

### (module scope)

Propagates just the `profilePicture` URL (already carrying the chosen
`?s=` size) to every other locale's about node — the narrow sync for
"same face everywhere" without touching localized bio text.

- `@param` host — the host component holding `aboutData.profilePicture`

### (module scope)

Propagates the non-localized fields (profile picture, mentions title,
mention items) to every other locale — each target's node is read
first so localized `title`/`col1`/`col2` survive the merge.

- `@param` host — the host component holding the source `aboutData`
