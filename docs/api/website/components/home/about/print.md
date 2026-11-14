# `website\components\home\about\print.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\print.ts`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `fillPara`

Seats one hidden `.print-fill` span carrying `text` inside `para`, when
the paragraph doesn't already hold one — the idempotent guard lets a
second beforeprint inside the same job re-run the whole prepare.

- `@param` para The `.about-item-text` paragraph to fill.
- `@param` text Plain bio copy (DrawItem.text — markup-free by contract).

### `preparePrint`

Arms the printable form: walks the bio paragraphs in DOM order — the
intro statement first, then the profile-text items — and seats each
one's plain text. Runs inside the `printprepare` window event, before
print.ts's media walk, so the fills exist for the snapshot. Skips the
skeleton state outright (no translations means no real copy, and the
shimmer paras print as ruled boxes the sheet already handles).

- `@param` host The AboutSection element.

### `restorePrint`

Tears the printable form down: every injected `.print-fill` leaves the
shadow DOM. Idempotent — both restore channels (native afterprint and
the matchMedia false edge) may fire for one job.

- `@param` host The AboutSection element.
