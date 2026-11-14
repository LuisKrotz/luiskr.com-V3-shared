# `website\tests\coverage\components\home\cardstack-print-wrapup-tails.test.js`

Coverage tails for home/cardstack/print.ts — the

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\home\cardstack-print-wrapup-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                           |

## Members

### `item`

Card-item factory — unique link/image/label per index, overrides merge in.

### `cleanups`

Teardown registry — mounts push cleanup fns; afterEach drains them.

### `realFetch`

Real fetch saved once — the failing stubs restore it per test.

### `realIdle`

Real idle scheduler saved once — the setTimeout arm restores it.

### `fbKey`

localStorage key for the db layer's offline mirror — fetchFirebaseDb
falls back to it when the network read throws (translation paths
absent from the boot snapshot take the network+cache route).

### `stubHost`

A stub host for warmPrintCopy — only _printCopy + deckItems are read.
