# `website\components\home\ContactSection.tsx`

&lt;contact-section&gt; — the home page's contact footer: heading,

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\ContactSection.tsx`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FALLBACK_CAPTIONS`

Build-time map of canonical channel link to fallback caption so live
Firebase RTDB payloads that predate the caption field still render
the English fallback's caption under the secondary links.

### `FALLBACK_CONTACT_TITLE`

Bundled post-redesign contact heading ("Contact / Get in Touch") used when
live Firebase RTDB returns the pre-redesign single-word "Contact" title.

### `ContactSection`

contacts section.

### `_mentionsTranslations`

pages/HOME translations forwarded into <mentions-deck> (deckHint).

### `mentionsTranslations`

Setter/getter — the pages/HOME locale node the deck hint reads.

### (module scope)

Pushes the live mentions slice into the embedded <mentions-deck> —
re-run after every render since the deck node is recreated per
_updateDom (its setters guard identity so repeat pushes are cheap).

### `_syncMentionsDeck`

Forwards mentions title/items + deck translations to the child element.

### (module scope)

JSX template for the component's shadow DOM.
