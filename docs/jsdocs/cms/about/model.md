# `cms\about\model.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\about\model.ts`                        |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `setGravatarSize`

Applies a Gravatar size — strips any existing `?s=`/`&s=` param from
the stored URL (and a bare trailing `?` it would leave behind), then
re-appends the new size so the stored URL always carries exactly one.

- `@param` host — the host component holding `aboutData.profilePicture`
- `@param` size — pixel edge Gravatar should return (drives `?s=N`)

### (module scope)

Builds a Gravatar URL from the email field — SHA-256 hashes the
trimmed/lowercased address (Gravatar's lookup key) and composes it
with the current size so the preview matches what the site serves.

- `@param` host — the host component holding `emailInput`/`gravatarSize`

### `addParagraph`

Appends an empty paragraph to a bio column — the input rows write by
index, so pushing an empty string creates the new row's bound slot.

- `@param` host — the host component holding `aboutData`
- `@param` col — `'col1'` (left) or `'col2'` (right)

### `removeParagraph`

Drops the paragraph at `idx` from a bio column and re-renders the list.

- `@param` host — the host component holding `aboutData`
- `@param` col — `'col1'` (left) or `'col2'` (right)
- `@param` idx — zero-based paragraph index

### `moveParagraph`

Swaps a paragraph with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early so the edge buttons are also safe.

### `addMentionItem`

Appends a blank mention (description/link/icon) — the three-field row
renders from these keys via `data-field` binding.

- `@param` host — the host component holding `aboutData.mention_items`

### `removeMentionItem`

Drops the mention at `idx` from the awards list and re-renders.

- `@param` host — the host component holding `aboutData.mention_items`
- `@param` idx — zero-based mention index

### `moveMentionItem`

Swaps a mention with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early.

- `@param` host — the host component holding `aboutData.mention_items`
- `@param` idx — zero-based mention index
- `@param` dir — -1 or +1
