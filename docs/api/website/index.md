# `website\index.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\index.ts`                                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Website module barrel.

Public site's routable
surface (home, legal, not-found, project detail). Importing the barrel runs
each view module once, so every `<view-*>` element self-registers via its
`customElements.define` guard and every component the views pull in is
registered transitively. Re-export-only file: `istanbul ignore` because
there is no executable logic to cover.
