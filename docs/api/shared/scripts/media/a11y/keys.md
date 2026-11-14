# `shared\scripts\media\a11y\keys.mjs`

Bucket-key naming for generated accessibility artifacts —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\keys.mjs`                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `vttKey`

Descriptions-track key for a media stem — `<stem>.vtt` English
canonical, `<stem>.<locale>.vtt` localized.

- `@param` {string} stem Extensionless bucket-relative stem.
- `@param` {string} locale Site locale code.
- `@returns` {string}

### `longdescKey`

Longdesc key for an image stem — `<stem>_longdesc.txt` English
canonical, `<stem>_longdesc.<locale>.txt` localized.

- `@param` {string} stem Extensionless bucket-relative stem.
- `@param` {string} locale Site locale code.
- `@returns` {string}
