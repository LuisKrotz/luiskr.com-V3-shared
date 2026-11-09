# `website\tests\views\views-viewsitemap.test.js`

&lt;view-sitemap&gt; coverage — the SWR fetches (sitemap page

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\tests\views\views-viewsitemap.test.js`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `dbThrow`

Error the db mock throws — set to exercise the rejection arm.

### `dbReplies`

Path→payload fn the db mock consults — tests reassign per fixture set.

### `fetchThrow`

Flag — the fetch mock throws when true (CDN-fail arm).

### `fetchReplies`

URL→body map the fetch mock serves — CDN manifest replies.

### `flush`

Timer flush — drains the view's SWR/db queues between actions.

### `realFetch`

Real fetch saved before mocks install — restored in afterAll.

### `PROJECT`

Project fixture — nested section media rows the sitemap renders.

### `SITEMAP_PAGE`

Page-level RTDB fixtures — title/intro + per-experiment shareCapture copy.

### `EARTH_MANIFEST`

CDN manifest fixture — the sitemap lists these as share links.

### `fullReplies`

Routes the sitemap view's fetch surface to the test fixtures.

### `q`

Shadow-DOM query shorthands — assertions run inside the view's shadow root.
