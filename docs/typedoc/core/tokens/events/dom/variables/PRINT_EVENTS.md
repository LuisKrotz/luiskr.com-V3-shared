[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / PRINT\_EVENTS

```ts
const PRINT_EVENTS: Readonly<{
  CAPTURE: 'printcapture'
  PREPARE: 'printprepare'
}>
```

Defined in: core/tokens/events/dom.ts:181

App-level print lifecycle — `beforeprint`/`afterprint` are browser-native
window events (in CLIPBOARD_EVENTS for legacy grouping); these two let live
engines answer a canvas-capture request and views sync generated content
into the printable mirror before the print sheet opens.
