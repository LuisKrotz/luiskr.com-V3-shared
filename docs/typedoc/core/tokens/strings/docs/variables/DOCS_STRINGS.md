[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/docs](../README.md) / DOCS\_STRINGS

```ts
const DOCS_STRINGS: Readonly<{
  TITLE: "In-depth project docs";
  DESC_FALLBACK: "Available only in English";
  COPY_TOAST_FALLBACK: "This page doesn't allow copy, please refer to github to download the sourcecode or contact the page admin.";
  CMS_COMPONENT: "docs-portal";
  ASSET_BASE: "/docs-content/";
  ASSET_EXT: ".json";
  CRUMB_INPUT_LABEL: "Edit path";
  CRUMB_INPUT_HINT: "Type a docs path segment and press Enter";
  TREE_LABEL: "Documentation tree";
  GRID_LABEL: "Folders and files";
  NAV_TOGGLE: "Browse the docs tree";
  VIEWER_BACK: "Back";
  SOURCE_PROTECTED_LABEL: "Copy protection active";
  MEDIA_UNAVAILABLE: "Binary file too large to preview — download it from the GitHub repository.";
  NOT_FOUND_PATH: "Not found in the documentation tree.";
  KEY_PRINT_SCREEN: "PrintScreen";
  CRUMB_PLACEHOLDER: "docs/…";
  SRC_ROOT: "src";
  INDEX_FILE: "index.html";
  EVENT_COPY_ATTEMPT: "docs_copy_attempt";
  SCHEMA_DESCRIPTION: "Source code, documentation and quality reports for luiskr.com — browsable and indexable.";
  LOADER_TITLE: "Docs system boot";
  LOADER_MSG_INIT: "Opening the documentation archive";
  LOADER_MSG_MANIFEST: "Indexing modules and reports";
  LOADER_MSG_SCENE: "Mounting the architecture graph";
  LOADER_MSG_FILE: "Loading the document payload";
  LOADER_MSG_READY: "Portal online";
  MERMAID_LOADING: "Rendering diagram…";
  SCENE_HINT: "Architecture map — drag to orbit, click a node to navigate";
}>;
```

Defined in: core/tokens/strings/docs.ts:15

Frozen docs string map — sole declaration site for these tokens;
consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
