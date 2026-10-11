[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [cms/tokens](../README.md) / CMS\_EVENTS

```ts
const CMS_EVENTS: Readonly<{
  NOTIFY: "notify";
  AUTH_CHANGED: "cms-auth-changed";
}>;
```

Defined in: cms/tokens.ts:60

Frozen cms event-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
