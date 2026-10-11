[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/docs](../README.md) / DOCS\_CLASSES

```ts
const DOCS_CLASSES: Readonly<{
  DOCS: "docs";
  DOCS_HEADER: "docs-header";
  DOCS_TITLE: "docs-title";
  DOCS_UPDATED: "docs-updated";
  DOCS_GL: "docs-gl";
  DOCS_GL_FALLBACK: "docs-gl-fallback";
  DOCS_BODY: "docs-body";
  DOCS_NAV: "docs-nav";
  DOCS_TREE: "docs-tree";
  DOCS_TREE_ITEM: "docs-tree-item";
  DOCS_TREE_OPEN: "docs-tree-open";
  DOCS_MAIN: "docs-main";
  DOCS_CRUMBS: "docs-crumbs";
  DOCS_CRUMB: "docs-crumb";
  DOCS_CRUMB_EDIT: "docs-crumb-edit";
  DOCS_GRID: "docs-grid";
  DOCS_CARD: "docs-card";
  DOCS_CARD_LABEL: "docs-card-label";
  DOCS_CARD_ART: "docs-card-art";
  DOCS_FOLDER: "docs-folder";
  DOCS_FOLDER_THREAD: "docs-folder-thread";
  DOCS_VIEWER: "docs-viewer";
  DOCS_VIEWER_HEAD: "docs-viewer-head";
  DOCS_VIEWER_PATH: "docs-viewer-path";
  DOCS_VIEWER_BACK: "docs-viewer-back";
  DOCS_CONTENT: "docs-content";
  DOCS_FRAME: "docs-frame";
  DOCS_SCENE: "docs-scene";
  DOCS_SCENE_OFF: "docs-scene-off";
  DOCS_SCENE_HINT: "docs-scene-hint";
  DOCS_NAV_TOGGLE: "docs-nav-toggle";
  DOCS_NAV_OPEN: "docs-nav-open";
  DOCS_PROTECTED: "docs-protected";
  DOCS_MERMAID: "docs-mermaid";
  DOCS_MERMAID_LOADING: "docs-mermaid-loading";
  DOCS_FOOTER_NOTE: "docs-footer-note";
  DOCS_LOADER: "docs-loader";
  DOCS_LOADER_GLOW: "docs-loader-glow";
  DOCS_LOADER_GRID: "docs-loader-grid";
  DOCS_LOADER_CONTENT: "docs-loader-content";
  DOCS_LOADER_SPINNER_OUTER: "docs-loader-spinner-outer";
  DOCS_LOADER_SPINNER_INNER: "docs-loader-spinner-inner";
  DOCS_LOADER_COUNTER: "docs-loader-counter";
  DOCS_LOADER_PERCENT: "docs-loader-percent";
  DOCS_LOADER_VAL: "docs-loader-val";
  DOCS_LOADER_SYM: "docs-loader-sym";
  DOCS_LOADER_TITLE: "docs-loader-title";
  DOCS_LOADER_MSG: "docs-loader-msg";
  DOCS_LOADER_BAR: "docs-loader-bar";
  DOCS_LOADER_BAR_FILL: "docs-loader-bar-fill";
}>;
```

Defined in: core/tokens/classes/docs.ts:14

Frozen docs class-name map — sole declaration site for these tokens;
consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
