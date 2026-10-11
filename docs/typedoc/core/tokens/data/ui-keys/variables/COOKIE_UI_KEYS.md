[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/data/ui-keys](../README.md) / COOKIE\_UI\_KEYS

```ts
const COOKIE_UI_KEYS: Readonly<{
  COOKIES_ACCEPT: "cookies.accept";
  COOKIES_REFUSE: "cookies.refuse";
  COOKIES_MESSAGE: "cookies.message";
}>;
```

Defined in: core/tokens/data/ui-keys.ts:53

Frozen cookie ui key map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
