# `experiments\star-field\tests\coverage\starfield\star\star-print-tails.test.js`

Coverage tails for star/print.tsx — the arms the

|                |                                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\star\star-print-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                             |

## Members

### `jsonRes`

fetch-Response stub — ok:true with an async json() returning the body.

### `REG_KINDS`

Registry kinds in seat order — index-plate fixture keys.

### `SPARSE_T`

Translations map with EVERY label key the compose reads set to
undefined — the merge spreads it over the English snapshot, so each
`t[key] ?? fallback` arm fires its raw fallback instead of a label.

### `BARE`

Bare dossier — no tagline/history/sections/media/source/meta and an
empty kind (falsy furniture + `media?.`/`?? []`/`kindLabel ?` arms).

### `RICH`

Rich dossier — full furniture plus a media matrix covering every
caption/credit arm and poster/no-poster video arms.

### `BARE_IDS`

Hierarchy-group ids — those dossiers serve the bare fixture.

### `starShard`

Star-shard payload — the registry excerpt's synthesized dossier row.

### `routes`

Route table — tests rewrite entries per dispatch.

### `tailsFetch`

fetch mock — manifest + registry shard + a per-id dossier route.

### `host`

Minimal live-host stub — the fields the compose reads off StarField.

### `seated`

Injected book nodes still seated at body level, in document order.

### `waitFor`

Poll-until-true wait — async seats land at unbounded microtask times.

### `clearSeated`

Removes every injected book node — copies persist across tests otherwise.

### `pending`

Live unbinders — a mid-test assertion failure must not leak its
PREPARE listener into the next dispatch (stale listeners re-seat a
whole book on top of the test's own).

### `bind`

Binds and registers the unbinder for the afterEach drain.
