# `core\tokens\classes\contact.ts`

Contact section class tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\contact.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CONTACT_CLASSES`

Contact-section classes: `contact` block (title + subtitle + channel row +
mentions deck mount), `contact-social` block (profile links + separator),
`contact-other` block (secondary links), `contact-mail` block (primary
e-mail channel), `contact-links` block (secondary channel list). All
compose `_B_*` fragments from base.ts — never re-declared.

### `CONTACT_SUBTITLE`

Subtitle line under the title ('Let's create something extraordinary').

### `CONTACT_ROW`

The mail + secondary-links row under the heading block.

### `CONTACT_MAIL`

Primary mailto channel — desktop: label over large address; mobile: filled pill.

### `CONTACT_LINKS`

Secondary channel list — desktop: arrow links + captions; mobile: outline pills.

### `CONTACT_LINKS_ARROW`

The '→' glyph span inside each secondary channel link (desktop only).

### `CONTACT_MENTIONS`

Wrapper region the <mentions-deck> mounts into.
