# `experiments\star-field\tests\starfield\star-print.test.js`

Print book composition — the `printprepare` listener seats

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\star-print.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `T`

Real English labels the compose reads — the fallback mock serves the
database snapshot's star-field node, same as the component tests.

### `jsonRes`

fetch-Response stub — ok:true with an async json() returning the body.

### `manifest`

Catalog manifest fixture — the three registry kinds the index plate counts.

### `starShard`

Star-shard payload — the synthesized registry dossier source rows.

### `dossierFor`

Dossier fixture — one full-shaped payload per catalog id.

### `bookFetch`

fetch mock — manifest + star shard + a generic dossier per /data/en/*.json.

### `host`

Minimal live-host stub — the fields the compose reads off StarField.

### `seated`

Injected book nodes still seated at body level, in document order.

### `waitFor`

Poll-until-true wait — async seats land at unbounded microtask times.

### `clearSeated`

Removes every injected book node — copies persist across tests otherwise.
