# `core\tokens\css\mosaic.ts`

Mosaic-related CSS custom-property names — grouped subset

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\css\mosaic.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MEDIA_MOSAIC_HEIGHT`

Pre-pack wall-height estimate published on the project section wrapper — the
media-mosaic wall reads it as min-height so deferred mosaics reserve their
final box instead of shifting siblings when the real pack lands.
