# `website\components\carousel\mentions-deck\print.ts`

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\print.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.  |

## Members

### `preparePrint`

Arms the printable form: freezes the posers so no measure/applyPoses
call between the prepare event and the snapshot can restore the fan
geometry the adapter strips. Called from the `printprepare` window
event — inside print.ts's enter pass, before the media/style walk.

- `@param` host The MentionsDeck element.

### `restorePrint`

Tears the printable form down: the poser gate drops and applyPoses()
re-writes the strip geometry print.ts stripped (its exit pass also
restores recorded attrs — re-posing lands on the same values, so
listener order between exit() and this pass doesn't matter).
Idempotent — both restore channels may fire for one job.

- `@param` host The MentionsDeck element.
