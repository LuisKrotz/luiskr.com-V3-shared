[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/footer](../README.md) / FOOTER\_CLASSES

```ts
const FOOTER_CLASSES: Readonly<{
  FOOTER_SOURCE: "footer-source";
  FOOTER_SOURCE_LINK: "footer-source-link";
  FOOTER_DOCS: "footer-source-docs";
  FOOTER_DOCS_LINK: "footer-source-docs-link";
  FOOTER_DOCS_DESC: "footer-source-docs-desc";
}>;
```

Defined in: core/tokens/classes/footer.ts:14

Frozen footer class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
