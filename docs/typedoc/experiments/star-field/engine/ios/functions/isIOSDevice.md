[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/ios](../README.md) / isIOSDevice

```ts
function isIOSDevice(): boolean
```

Defined in: experiments/star-field/engine/ios.ts:24

Whether the runtime is an iOS-family device — direct iPhone/iPad/iPod
UA match, or iPadOS 13+ "desktop mode" which reports a Macintosh UA
while still exposing multi-touch (`maxTouchPoints > 0`).

## Returns

`boolean`

true on iPhone, iPad and iPod touch; false everywhere else.
