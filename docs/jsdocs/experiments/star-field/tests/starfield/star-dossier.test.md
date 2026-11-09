# `experiments\star-field\tests\starfield\star-dossier.test.js`

Lazy dossier loader — fetchDossier caches per body id and

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\star-dossier.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.           |

## Members

### `flush`

Timer flush — drains queued dossier-load microtasks between actions.

### `jsonRes`

fetch-Response stub — ok:true with an async json() returning the body.

### `fileFetch`

fetch mock routing URL suffixes to dossier files; `missing` frags 404.
