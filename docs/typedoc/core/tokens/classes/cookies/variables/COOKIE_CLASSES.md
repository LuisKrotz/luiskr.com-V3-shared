[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/cookies](../README.md) / COOKIE\_CLASSES

```ts
const COOKIE_CLASSES: Readonly<{
  COOKIES: "cookies";
  COOKIES_INFO: "cookies-info";
  COOKIES_BUTTONS: "cookies-buttons";
  COOKIES_BUTTONS_ACCEPT: "cookies-buttons-accept";
  COOKIES_BUTTONS_REFUSE: "cookies-buttons-refuse";
}>;
```

Defined in: core/tokens/classes/cookies.ts:13

Frozen cookie class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
