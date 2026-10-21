# `website\components\portfolio\related\render.tsx`

| | |
|---|---|
| **Source** | `src/website\components\portfolio\related\render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SKELETON_TILES`

Skeleton-tile count matching the loaded mosaic's geometry.

### `SKELETON_SOCIALS`

Skeleton social-link placeholder count.

### `renderCard`

One related-project card (link + cover + title/description).

### `renderSkeletonMosaic`

Skeleton mosaic — tiles 1 and 3-6 carry the featured modifier so the shimmer matches the loaded layout.

### `renderHomeLink`

Back-home link — first item of the footer's link row (localized route +
    label), resolved through the same live-then-fallback path <legal-footer>
    uses. The -home modifier marks the link so tests can locate it.

### `renderCreditBlock`

Authorship block — animated hairline + self-made credit + copyright
    with ©/year set in bold.

### `renderSocials`

Social links + separator dots + the HTML disclaimer note.

### `renderSkeletonSocials`

Skeleton socials row — placeholder link pills + note bars.

### `renderRelated`

JSX template for the component's shadow DOM.
