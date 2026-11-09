# `cms\portfolio\CmsPortfolioList.tsx`

CMS portfolio-list editor: the home page's ordered project

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\portfolio\CmsPortfolioList.tsx`        |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `CmsPortfolioList`

<cms-portfolio-list> — the element facade for the portfolio editor:
holds the locale + normalized `items` model and delegates to
`data.ts` (load/save/cross-locale sync), `model.ts` (item mutations

- CDN preview), `events.ts` (wiring), and `render.tsx` (JSX).
  Methods are thin pass-throughs so test spies share the call path.

### (module scope)

Lifecycle: loads the portfolio list.

### (module scope)

JSX template (delegate — @cms/portfolio/render.tsx).
