[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [cms/tokens/editors/deploy](../README.md) / CMS\_DEPLOY\_CLASSES

```ts
const CMS_DEPLOY_CLASSES: Readonly<{
  CMS_SCORE: 'cms-score'
  CMS_SCORE_GOOD: 'cms-score--good'
  CMS_SCORE_WARN: 'cms-score--warn'
  CMS_SCORE_BAD: 'cms-score--bad'
  CMS_SCORE_INFO: 'cms-score--info'
  CMS_DEPLOY_TABLE: 'cms-deploy-table'
  CMS_DEPLOY_URL: 'cms-deploy-url'
  CMS_GAUGES: 'cms-deploy-gauges'
  CMS_GAUGE: 'cms-deploy-gauge'
  CMS_GAUGE_NUM: 'cms-deploy-gauge-num'
  CMS_GAUGE_LABEL: 'cms-deploy-gauge-label'
  CMS_GAUGE_TRACK: 'cms-deploy-gauge-track'
  CMS_GAUGE_FILL: 'cms-deploy-gauge-fill'
  CMS_CHART: 'cms-deploy-chart'
  CMS_CHART_ROW: 'cms-deploy-chart-row'
  CMS_CHART_LABEL: 'cms-deploy-chart-label'
  CMS_CHART_BAR: 'cms-deploy-chart-bar'
  CMS_CHART_TRACK: 'cms-deploy-chart-track'
  CMS_CHART_FILL: 'cms-deploy-chart-fill'
  CMS_CHART_VAL: 'cms-deploy-chart-val'
  CMS_CHART_LEGEND: 'cms-deploy-chart-legend'
}>
```

Defined in: cms/tokens/editors/deploy.ts:13

Frozen cms deploy class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
