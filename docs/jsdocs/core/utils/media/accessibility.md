# `core\utils\media\accessibility.ts`

Accessibility metadata URL builders — the single naming

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\media\accessibility.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

One `<track kind="descriptions">` source descriptor — everything the JSX
layer needs to emit the element: fetch URL, BCP-47 `srclang`, the
human-readable `label`, and whether this track is the `default` one the
browser activates when the user enables text descriptions.

### `src`

Fetch URL of the localized .vtt sibling.

### `srclang`

BCP-47 language tag stamped on `srclang` (hrk→hrx, tln→vec…).

### `label`

Human language name shown in caption pickers ('Português', 'Deutsch').

### `locale`

Site locale code this track serves — key for the file naming.

### `isDefault`

Whether the browser selects this track without user choice.

### `vttKey`

Bucket key (or URL) of a locale's descriptions track for a media stem —
`<stem>.vtt` for English (the spec's identical-name contract), dotted
`<stem>.<locale>.vtt` for every other language.

- `@param` stem Extensionless media stem — `<storage><folder><src>` form at
- `@param` locale Site locale code.
- `@returns` The sibling key/URL — same shape the caller handed in.

### `longdescKey`

Bucket key (or URL) of a locale's longdesc file — `<stem>_longdesc.txt`
English canonical, `<stem>_longdesc.<locale>.txt` localized.

- `@param` stem Extensionless media stem.
- `@param` locale Site locale code.
- `@returns` The sibling key/URL.

### `offerUrl`

Manifest gate mirroring the runtime convention — a derived sibling is
offered optimistically while the manifest is still in flight (the
generated a11y pipeline writes the siblings for every video, so a
pending proof must not strip tracks the file most likely has); once
landed, only manifest-PROVEN siblings emit (doomed 404s land in the
console audit).

- `@param` url Candidate sibling URL.
- `@returns` `url` when proven or still unproven, `''` when disproven.

### `descriptionTracks`

All sixteen description-track descriptors for a media stem — one per
supported locale, each manifest-gated. `default` lands on the visitor's
current UI locale when that track is offered, else on English (the
canonical file the spec's naming contract guarantees).

- `@param` stem Extensionless media stem — `storage + mediaSrc`.
- `@param` currentLocale Active UI locale ('' ⇒ English default).
- `@returns` Emittable tracks — possibly empty when the manifest proves

### `longdescUrl`

Localized longdesc URL for an image stem — the current locale's file
when offered, English canonical otherwise, `''` when the manifest
proves neither exists.

- `@param` stem Extensionless media stem — `storage + mediaSrc`.
- `@param` currentLocale Active UI locale.
- `@returns` Emittable `longdesc`/`aria-details` URL or ''.
