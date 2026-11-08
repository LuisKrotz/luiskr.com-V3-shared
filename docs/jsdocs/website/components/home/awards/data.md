# `website\components\home\awards\data.ts`

Data helpers for &lt;awards-mentions&gt;: the legal-links list

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\awards\data.ts`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

A CMS-stored link row — both fields optional at the data boundary.

### (module scope)

Destination URL/path.

### (module scope)

Page name the link points at (used for the visible label).

### `ensureAwardsData`

Loads the components dictionary node for the current locale when missing
(stale-while-revalidate) — commits SET_COMPONENT_LANG so the footer
links/mentions re-render once the snapshot lands.

- `@param` _el The AwardsMentions element (unused — data flows via the store).
