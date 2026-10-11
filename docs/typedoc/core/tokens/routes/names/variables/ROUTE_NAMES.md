[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/routes/names](../README.md) / ROUTE\_NAMES

```ts
const ROUTE_NAMES: Readonly<{
  HOME: "Home";
  ABOUT: "About";
  CONTACT: "Contact";
  PRIVACY: "Privacy Policy";
  GDPR: "GDPR";
  TERMS: "Terms of Use";
  PROJECT: "DynamicProject";
  NOT_FOUND: "Not Found";
  ADMIN_LOGIN: "Admin Login";
  CMS_DASHBOARD: "CMS Dashboard";
  EARTH_PLAYGROUND: "Earth Playground";
  STAR_FIELD: "Star Field";
  DOCS: "In-depth project docs";
}>;
```

Defined in: core/tokens/routes/names.ts:11

Route name + localized title-prefix tokens. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
