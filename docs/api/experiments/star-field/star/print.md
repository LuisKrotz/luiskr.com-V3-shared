# `experiments\star-field\star\print.tsx`

Print composition for the star chart — on `printprepare`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\star\print.tsx`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One seated part of the book — a group section (face cover + its
dossier run) in `SF_GROUP_ORDER` position.

### `title`

Localized group title for the cover hub and the contents row.

### `dossiers`

Resolved dossiers in catalog order.

### `partNum`

The two-digit part number stamped on each section cover and contents
row — "01" … "07" across the six groups plus the deep catalog.

- `@param` index Zero-based part index in seating order.
- `@returns` Padded numeral.

### `mergedLabels`

Merged locale label map — the English snapshot under the loaded
translations, so a not-yet-translated key still prints real copy.

- `@param` host The live StarField — supplies the loaded translations.
- `@returns` The merged label map.

### `sectionCover`

Builds one section cover — a `.print-face` sibling on the same
margin-zero named page: the loader's glow, blueprint grid and twin
orbital rings behind the padded part number, the localized group
title, and the seated-record count. `hidden` keeps it off screen;
the print sheet's `.print-face` rules paint it on paper.

- `@param` num Padded part numeral ("01"…).
- `@param` title Localized group title for the hub.
- `@param` count "N records" furniture line — empty suppresses the span.
- `@returns` The seated cover element.

### `tocLeaf`

Builds the book's contents leaf — the shared `.print-toc` skin
(numbered part rows with each body's localized name indented under
its section, mirroring the front-of-book leaf the home route gets
from the live headings this route lacks). The deep catalog's row
lists no names — its records index on the part's own plate.

- `@param` host The live StarField — supplies the localized names table.
- `@param` parts Resolved group sections in seating order.
- `@param` t Merged locale label map.
- `@returns` The `.print-toc` element.

### `dossierPlate`

Builds one dossier plate — a full-sheet editorial card on the
margin-zero named page: headline + kind tag, the tagline as
standfirst, the facts list and prose, the image gallery (videos
contribute their posters — an MP4 can't paint on paper), the
provenance line, and an anchored QR to the body's live route.

- `@param` host The live StarField — supplies the route path, the slug
- `@param` dossier The resolved body dossier.
- `@param` t Merged locale label map (defaults + loaded translations).
- `@param` decodes Sink collecting gallery-image decode promises — the
- `@returns` The seated plate element (hidden until print media applies).

### `catalogIndexPlate`

Builds the deep catalog's index plate — the part that can't paginate
(~140k records, one shard fetch per thousand) closes on a dossier-
shaped index instead: the kind-by-kind record counts as facts, the
three catalogues' prose as sections, their provenance as the source
footer, and a QR back to the live chart where every record resolves.

- `@param` host The live StarField — supplies the route path.
- `@param` manifest Resolved registry manifest (null on a cold sync
- `@param` t Merged locale label map.
- `@returns` The seated index plate element.

### `seatBook`

Seats the composed book at `<body>` level in document order — the
`print-plate-doc` contract hides only `#app`'s own children, so
body-level nodes sit in the flow right where the capture plate ends:
the contents leaf first, then per part its cover and dossier run,
and the deep-catalog cover + index closing the volume. Every node
registers with `trackPrintNode` for the exit sweep.

- `@param` host The live StarField.
- `@param` parts Resolved group sections in seating order.
- `@param` manifest Resolved registry manifest, or null.
- `@param` t Merged locale label map.
- `@param` decodes Sink collecting gallery-image decode promises.
- `@param` isBook The full volume seats the contents leaf and the deep-

### `seat`

Appends one injected node at body level and registers it with the
exit sweep so the job's teardown removes it with the copies.

### `countLine`

The cover's "N records" furniture line — the part's seated count
against the locale's `records` word.

### `excerptPart`

Wraps one resolved dossier as the book's excerpt part — the selected
body's own section (its catalog group's title, or the kind label for
a registry record, which owns no group).

- `@param` selectedId The body id the excerpt was composed for — read
- `@param` dossier The selected body's resolved dossier.
- `@param` t Merged locale label map.
- `@returns` The single-part list.

### `bookParts`

Builds the book part list for the async arm — the full volume walks
`SF_GROUP_ORDER` collecting each group's resolved dossiers (empty
groups drop so a wholesale fetch failure can't strand an empty
section); a selection short-circuits to the excerpt part.

- `@param` host The live StarField.
- `@param` t Merged locale label map.
- `@param` selectedId The caller's selection snapshot (null for the full
- `@returns` The parts in seating order.

### `bookPartsSync`

Builds the book part list synchronously — same shape as the async
arm but reads only the resolved dossier cache so the beforeprint
path can seat what the idle warm already landed. A group seats only
when EVERY def resolved — a partially-warmed section printing half
its bodies would read as a data bug, so it defers to the async arm
wholesale.

- `@param` host The live StarField.
- `@param` t Merged locale label map.
- `@param` selectedId The caller's selection snapshot (null for the full
- `@returns` The parts in seating order, or null when any dossier is

### `composeBook`

The async compose pass — resolves every target dossier (and the
registry manifest the deep-catalog furniture reads), seats the book,
then awaits every gallery decode so the job's barrier counts them.

- `@param` host The live StarField.

### `bindPrintDossiers`

Binds the chart's print composition — a `printprepare` listener that
prints the whole catalog as a book (contents leaf, one section cover
per region group, a dossier sheet per body, the deep-catalog part's
cover + index), or the selected body as a one-sheet excerpt under
its group's cover. Returns the unbinder for the view's teardown.

- `@param` host The live StarField component.
- `@returns` Cleanup that removes the listener.
