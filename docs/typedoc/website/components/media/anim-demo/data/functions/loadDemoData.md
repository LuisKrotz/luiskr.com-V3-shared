[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/data](../README.md) / loadDemoData

```ts
function loadDemoData(): Promise<AnimDemoData>
```

Defined in: website/components/media/anim-demo/data.ts:48

Loads (once per locale) the HOME + ABOUT page nodes the demo
elements read. Mirrors the home view's path grammar
(`lang.database + locale + lang.pagesPath + key`); a missing node
resolves null rather than rejecting so a demo still mounts with
whatever slice arrived.

## Returns

`Promise`\<[`AnimDemoData`](../interfaces/AnimDemoData.md)\>

The shared data promise for the current locale.
