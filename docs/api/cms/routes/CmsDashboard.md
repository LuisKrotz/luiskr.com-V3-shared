# `cms\routes\CmsDashboard.tsx`

&lt;view-cms-dashboard&gt; — the authenticated CMS shell: header

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\routes\CmsDashboard.tsx`               |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `ViewCmsDashboard`

<view-cms-dashboard> — the authenticated CMS shell: header with
brand/avatar/logout, the tab strip routing between editors, and the
toast surface that child editors notify via `cms-notification`
events (bound on `this` so they bubble up through the shadow tree).

### (module scope)

Wires events, subscribes to auth state, and listens for child toasts.

### (module scope)

Unsubscribes auth + clears the pending toast timer on unmount.

### `handleLogout`

Signs the user out (drops back to <admin-login> via auth listener).

### `showNotification`

Transient toast — writes the message, then auto-dismisses after
3.5s (long enough to read a "saved!" confirmation, short enough to
not linger over the next edit). A second notification resets the
timer instead of stacking toasts.

### (module scope)

Tab clicks, logout, and the brand-back-to-site navigation.

### `renderTabComponent`

Tab → editor element mapping. The media-converter tab is localhost-
gated (IS_LOCALHOST): the conversion pipeline shells out to local
ffmpeg, so it only exists where the dev server runs.

### (module scope)

JSX template: sidebar + tab outlet.
