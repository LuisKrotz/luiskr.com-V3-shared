[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / DRAG\_EVENTS

```ts
const DRAG_EVENTS: Readonly<{
  DRAGSTART: "dragstart";
  DRAGOVER: "dragover";
  DRAGLEAVE: "dragleave";
  DROP: "drop";
}>;
```

Defined in: core/tokens/events/dom.ts:89

Frozen drag event-name map — the HTML5 drag-and-drop subset used by CMS
upload zones (`drop` fires on the target, `dragover` must be
preventDefault'ed for drop to be allowed per the DnD spec).
