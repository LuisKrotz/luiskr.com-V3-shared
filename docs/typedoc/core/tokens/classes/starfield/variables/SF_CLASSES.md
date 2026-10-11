[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/starfield](../README.md) / SF\_CLASSES

```ts
const SF_CLASSES: Readonly<{
  SF_LOADER: "sf-loader";
  SF_LOADER_GLOW: "sf-loader-glow";
  SF_LOADER_GRID: "sf-loader-grid";
  SF_LOADER_CONTENT: "sf-loader-content";
  SF_LOADER_SPINNER_OUTER: "sf-loader-spinner-outer";
  SF_LOADER_SPINNER_INNER: "sf-loader-spinner-inner";
  SF_LOADER_COUNTER: "sf-loader-counter";
  SF_LOADER_TITLE: "sf-loader-title";
  SF_LOADER_MSG: "sf-loader-msg";
  SF_LOADER_BAR: "sf-loader-bar";
  SF_LOADER_BAR_FILL: "sf-loader-bar-fill";
  SF_LOADER_PERCENT: "sf-loader-percent";
  SF_LOADER_VAL: "sf-loader-val";
  SF_LOADER_SYM: "sf-loader-sym";
  SF_CANVAS: "sf-canvas";
  SF_FALLBACK: "sf-fallback";
  SF_HUD: "sf-hud";
  SF_HINT: "sf-hint";
  SF_LIVE: "sf-live";
  SF_TIP: "sf-tip";
  SF_TIP_LINE: "sf-tip-line";
  SF_TIP_LABEL: "sf-tip-label";
  SF_NAV: "sf-nav";
  SF_NAV_OPEN: "sf-nav--open";
  SF_NAV_TOGGLE: "sf-nav-toggle";
  SF_NAV_PANEL: "sf-nav-panel";
  SF_NAV_HEAD: "sf-nav-head";
  SF_NAV_HEADING: "sf-nav-heading";
  SF_NAV_CLOSE: "sf-nav-close";
  SF_NAV_GROUP: "sf-nav-group";
  SF_NAV_GROUP_TITLE: "sf-nav-group-title";
  SF_NAV_LIST: "sf-nav-list";
  SF_NAV_ITEM: "sf-nav-item";
  SF_NAV_ITEM_ACTIVE: "sf-nav-item--active";
  SF_NAV_ITEM_META: "sf-nav-item-meta";
  SF_NAV_MORE: "sf-nav-more";
  SF_NAV_SEARCH: "sf-nav-search";
  SF_PANEL: "sf-panel";
  SF_PANEL_OPEN: "sf-panel--open";
  SF_PANEL_HEAD: "sf-panel-head";
  SF_PANEL_TITLE: "sf-panel-title";
  SF_PANEL_TAG: "sf-panel-tag";
  SF_PANEL_CLOSE: "sf-panel-close";
  SF_PANEL_BODY: "sf-panel-body";
  SF_PANEL_TAGLINE: "sf-panel-tagline";
  SF_PANEL_HISTORY: "sf-panel-history";
  SF_FACTS: "sf-facts";
  SF_FACT: "sf-fact";
  SF_FACT_KEY: "sf-fact-key";
  SF_FACT_VAL: "sf-fact-val";
  SF_PANEL_SOURCE: "sf-panel-source";
  SF_PANEL_LOADING: "sf-panel-loading";
  SF_PANEL_SECTIONS: "sf-panel-sections";
  SF_PANEL_SEC: "sf-panel-sec";
  SF_PANEL_SEC_TITLE: "sf-panel-sec-title";
  SF_PANEL_SEC_BODY: "sf-panel-sec-body";
  SF_PANEL_SIG: "sf-panel-sig";
  SF_MEDIA: "sf-media";
  SF_MEDIA_FIG: "sf-media-fig";
  SF_MEDIA_IMG: "sf-media-img";
  SF_MEDIA_CAP: "sf-media-cap";
  SF_MEDIA_VIDEO: "sf-media-video";
  SF_MEDIA_AUDIO: "sf-media-audio";
  SF_ACTIONS: "sf-actions";
  SF_BTN: "sf-btn";
}>;
```

Defined in: core/tokens/classes/starfield.ts:14

Frozen sf class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
