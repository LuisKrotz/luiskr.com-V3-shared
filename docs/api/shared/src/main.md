# `shared/src/main.ts`

Public-site entry point (modern ESM bundle).

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared/src/main.ts`                                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `mount`

Inserts <app-root> into #app. Idempotent — safe to call on a timer while
the document finishes parsing. Prerendered pages ship a reader-content
<article> inside #app: it is hoisted offscreen (never deleted) before the
swap so reader modes, no-JS crawlers and AI agents keep the full document
after the shell mounts — Readability can't pierce the app's shadow DOM.
- `@returns` {boolean} true when the root element exists in the DOM

### `start`

Async boot sequence: loads Safari-specific workarounds only when needed,
starts the router, schedules idle route-chunk warming, and mounts the app
root (with a bounded retry loop for slow DOMContentLoaded edge cases).

### `bootPromise`

Boot promise — resolves once the full start sequence (Safari lazy chunk,
router init, mount/retry arming) has run. Tests await this so async boot
work never continues past a test boundary into a torn-down registry.
