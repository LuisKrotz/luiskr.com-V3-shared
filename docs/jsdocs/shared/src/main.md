# `shared\src\main.ts`

Public-site entry point (modern ESM bundle).

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\src\main.ts`                                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FIRST_PAINT_BOOT_MS`

Absolute bound for waiting on the first-paint signal — a suppressed
paint (hidden tab, paint-less engine) must never stall the boot.

### `afterFirstPaint`

Runs `cb` once the first contentful paint has committed — the veil's
inline LQIP is the LCP candidate, so work started after that paint
falls outside its pessimistic request graph. The veil covers the boot
either way, so the wait costs no perceived latency. Paint entries are
the exact signal; paint-less engines keep the former double-frame
timing, and the bounded timer covers suppressed paints.

- `@param` cb work to start once the first paint has committed
- `@returns` Promise settling once the deferred callback has run.

### `warmCriticalPath`

Warms the critical path — the locale's data snapshot and the likely
route chunk — once the first frame has painted. Pathname parsing runs
at eval (a missing slug map must still reject the boot promise); only
the fetches defer — they are not needed until mount (~600ms+), so
firing them during parse just floods the LCP-critical request queue.
Two rAFs puts the work after frame one instead of racing it.

- `@param` {string} locale - resolved locale slug for warmBootstrap
- `@param` {string[]} segments - pathname segments minus the locale prefix
- `@param` {string} aboutSlug - localized "about" route segment
- `@param` {string} contactSlug - localized "contact" route segment

### `warmReady`

Deferred warm chain — bootPromise awaits it so tests can't tear down mid-import.

### `mount`

Inserts <app-root> into #app. Idempotent — safe to call on a timer while
the document finishes parsing. Prerendered pages ship a reader-content
<article> inside #app: it is hoisted to <body> (never deleted, parked
offscreen by the html.js stylesheet) before the swap so reader modes,
no-JS crawlers and AI agents keep the full document after the shell
mounts — Readability can't pierce the app's shadow DOM.
- `@returns` {boolean} true when the root element exists in the DOM

### `start`

Async boot sequence: loads Safari-specific workarounds only when needed,
starts the router, schedules idle route-chunk warming, and mounts the app
root (with a bounded retry loop for slow DOMContentLoaded edge cases).

### `bootPromise`

Boot promise — resolves once the full start sequence (Safari lazy chunk,
router init, mount/retry arming) has run. Tests await this so async boot
work never continues past a test boundary into a torn-down registry.
