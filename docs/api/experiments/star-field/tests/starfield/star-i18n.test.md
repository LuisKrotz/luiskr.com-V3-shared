# `experiments\star-field\tests\starfield\star-i18n.test.js`

Star-field label loading — the SWR fetch of

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\starfield\star-i18n.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.        |

## Members

### `dbData`

RTDB payload the fetch mock serves — title + hint strings the view applies.

### `fetchFirebaseDb`

Named jest.fn handle — the mock module re-exports it so tests can clear/re-impl.

### `store`

Shared store singleton — i18n reads locale/preference state from it.

### `flush`

Timer flush — drains queued i18n/store microtasks between actions.
