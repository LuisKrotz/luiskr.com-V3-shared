# `cms\tests\coverage\media\cmsmediaconverter-tools-tails.test.js`

Coverage tails for the media-converter guided toolchain

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/cms\tests\coverage\media\cmsmediaconverter-tools-tails.test.js` |
| **UX surface** | Admin bundle — editors for every database node.                      |

## Members

### `ALL_OK`

Fixture: /tools report where every tool is present — healthy-panel branch.

### `MISSING_REQUIRED`

Fixture: required tools missing with a sudo-only install plan — gated branch.

### `PLAN_LESS`

Fixture: missing tools but no package manager detected — manual-install branch.

### `MISSING_OPTIONAL_RUNNABLE`

Fixture: optional tools missing with a runnable brew plan — install-button branch.

### `mount`

Mounts a fresh <cms-media-converter> element into the document body.

### `flush`

Timer-based flush — mounted probes/renders need real timers past microtasks.

### `shadow`

Shadow-DOM query shorthand — asserts against the component's rendered root.

### `mod`

Derives the modifier class (last token) from a compound state token.
