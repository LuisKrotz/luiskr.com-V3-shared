[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/strings/docs](../README.md) / DOCS\_STRINGS

```ts
const DOCS_STRINGS: Readonly<{
  TITLE: 'In-depth project docs'
  DESC_FALLBACK: 'Available only in English'
  COPY_TOAST_FALLBACK: "This page doesn't allow copy, please refer to github to download the sourcecode or contact the page admin."
  CMS_COMPONENT: 'docs-portal'
  ASSET_BASE: '/docs-content/'
  ASSET_EXT: '.json'
  CRUMB_INPUT_LABEL: 'Edit path'
  CRUMB_INPUT_HINT: 'Type a docs path segment and press Enter'
  TREE_LABEL: 'Documentation tree'
  GRID_LABEL: 'Folders and files'
  MAIN_LABEL: 'Document content'
  NAV_TOGGLE: 'Browse the docs tree'
  VIEWER_BACK: 'Back'
  SOURCE_PROTECTED_LABEL: 'Copy protection active'
  MEDIA_UNAVAILABLE: 'Binary file too large to preview — download it from the GitHub repository.'
  NOT_FOUND_PATH: 'Not found in the documentation tree.'
  KEY_PRINT_SCREEN: 'PrintScreen'
  CRUMB_PLACEHOLDER: 'docs/…'
  CRUMB_INPUT_NAME: 'docs-path'
  SRC_ROOT: 'src'
  INDEX_FILE: 'index.html'
  EVENT_COPY_ATTEMPT: 'docs_copy_attempt'
  SCHEMA_DESCRIPTION: 'Source code, documentation and quality reports for luiskr.com — browsable and indexable.'
  LOADER_TITLE: 'Docs system boot'
  LOADER_MSG_INIT: 'Opening the documentation archive'
  LOADER_MSG_MANIFEST: 'Indexing modules and reports'
  LOADER_MSG_SCENE: 'Mounting the architecture graph'
  LOADER_MSG_FILE: 'Loading the document payload'
  LOADER_MSG_READY: 'Portal online'
  MERMAID_LOADING: 'Rendering diagram…'
  SCENE_HINT: 'Interactive file cloud — drag to orbit, click a node to navigate'
  MAP_LABEL: 'Interactive file cloud'
  MAP_ZOOM: 'Expand the interactive file cloud'
  MAP_CLOSE: 'Close the interactive file cloud'
  MAP_LOADING: 'Loading the file cloud'
  SCENE_ATTR_ALPHA: 'aAlpha'
  SCENE_ATTR_ACTIVE: 'aActive'
  SCENE_ATTR_OFFSET: 'aOffset'
  SCENE_ATTR_COLOR: 'aColor'
  SCENE_ATTR_PHASE: 'aPhase'
  SCENE_ATTR_SCALE: 'aScale'
  SCENE_ICON_INK_PROP: '--icon-ink'
  AGGREGATE_MARK: '+'
  INDEX_TITLE: 'All documents'
  INDEX_LABEL: 'Complete documentation index'
  VIEWER_HEADING_PREFIX: 'Viewing'
  GROUP_DOCS_LABEL: 'Documentation'
  GROUP_ARCH_LABEL: 'Architecture Docs'
  GROUP_SOURCE_LABEL: 'Source Code'
  GROUP_REPORTS_LABEL: 'Reports'
  GROUP_PATH_PREFIX: 'group/'
  ARCH_DIR: 'architecture'
}>
```

Defined in: core/tokens/strings/docs.ts:15

Frozen docs string map — sole declaration site for these tokens;
consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
