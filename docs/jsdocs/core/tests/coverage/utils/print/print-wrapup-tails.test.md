# `core\tests\coverage\utils\print\print-wrapup-tails.test.js`

Coverage tail for core/utils/print/print.ts — the wrap-up

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-wrapup-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `CDN`

Opaque fixture CDN base — matches the literal hosts the sibling tails use.

### `RULE_MEDIA`

A `print:`-media rule's CSSRule.type — the happy-dom CSSOM never defines it.

### `RULE_STYLE`

A style rule's CSSRule.type inside the fake sheet fixture.

### `RULE_GROUP`

A non-media/non-style grouping rule (supports/layer grammar).

### `MANIFEST_KEYS`

Bucket keys the stubbed manifest claims exist. `proj/*` stems feed the
figure fixtures; `photo` carries the full four-rung ladder (q50 → q75 →
original → uncompressed); `mob` proves only its `-mobile` derivative so
small boxes pick the mobile stem; `warm` exists to prove the warmReady
swap gate writes proven rungs the cache already fetched.

### `HIDE_SELECTOR`

The print-class selector a fake @media print rule hides on paper.

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `wait`

Waits `ms` real milliseconds — settle ticks, debounces and dialog grace
all run wall-clock in the tails suite.

- `@param` {number} ms Milliseconds to wait.
- `@returns` Promise resolving after the delay.

### `mkFigure`

Creates a `<media-figure>` host — `src` is the figure grammar's
extensionless bucket stem attribute.

- `@param` {string} [src] Figure src attribute value.
- `@returns` The figure element.

### `mkImg`

Creates an img with the decode/loading props a retire/upgrade test
needs — complete/naturalWidth are defineProperty stubs because
happy-dom never loads real bytes (it reports complete=true/0 forever).

- `@param` {object} opts Fixture knobs.
- `@param` {string} opts.src The src attribute.
- `@param` {boolean} [opts.complete] complete flag stub.
- `@param` {number} [opts.naturalWidth] naturalWidth stub.
- `@param` {string} [opts.decode] 'resolve' | 'reject' | 'hold' decode stub.
- `@returns` The img element plus a release() for 'hold' decodes.

### `zeroRect`

Assert-free zero-rect helper — a sibling with no measurable box never
counts as content ahead in bleedAtStart.

- `@param` {HTMLElement} el Element to stub.

### `paintedRect`

Stubs a painted sibling box so bleedAtStart's flow check reads it as
real content ahead of the plate.

- `@param` {HTMLElement} el Element to stub.

### `SpyMutationObserver`

Recording MutationObserver — the idle sweep's callback is fired by hand.

### `constructor`

- `@param` {MutationCallback} cb The observer callback to capture.

### `observe`

Records the observe() call.

- `@param` {Node} target Observation root.
- `@param` {MutationObserverInit} options Observation options.

### `disconnect`

No-op disconnect.

### `takeRecords`

Empty record queue.

- `@returns` Empty record list.
