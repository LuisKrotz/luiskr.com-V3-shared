# `cms\projects\sections.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\sections.ts`                  |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `normalizeSection`

Coerces a stored section into the canonical `[texts, media]` tuple —
accepts the tuple form directly, the legacy object form
(`{texts, media}`), and anything else as an empty pair. The renderer
and event writers index `[0]`/`[1]`, so every read path funnels
through here before touching the model.

- `@param` s — raw DB value (tuple, object, or garbage)
- `@returns` `[paragraphs, mediaItems]` — never null, always arrays

### `ensureSectionShape`

In-place normalize for a section the event handlers are about to
index into — guarantees `sections[sIdx]` is the `[texts, media]`
tuple before a `data-tidx`/`data-midx` write lands on it.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — section index to normalize

### `addSection`

Appends a fresh section — `[[''], []]` seeds one empty paragraph so
the card opens with an editable row instead of blank space.

- `@param` host — the host component holding `currentProject`

### `removeSection`

Deletes a section after a numbered confirm — the splice reindexes
later sections, so the render+rebind refreshes every `data-idx`.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index

### `moveSection`

Swaps a section with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early so the edge buttons are safe.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index
- `@param` dir — -1 or +1

### `addSectionText`

Pushes an empty paragraph into the text half (`[0]`) of a section —
`ensureSectionShape` first normalizes any legacy object form.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index

### `removeSectionText`

Drops paragraph `tIdx` from a section's text half and re-renders.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index
- `@param` tIdx — zero-based text index inside the section

### `addSectionMedia`

Pushes a fresh media slot (`newMediaSlot` — empty src/label, default
dimensions, image type) into the media half (`[1]`) of a section.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index

### `removeSectionMedia`

Drops media item `mIdx` from a section's media half and re-renders.

- `@param` host — the host component holding `currentProject`
- `@param` sIdx — zero-based section index
- `@param` mIdx — zero-based media index inside the section
