[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/debug](../README.md) / DEBUG\_PARAMS

```ts
const DEBUG_PARAMS: Readonly<{
  KEY: "debug";
  NOTIFICATION_TEST: "sendNotificationTest";
  WEBGL_MODE: "webGLMode";
}>;
```

Defined in: core/tokens/strings/debug.ts:13

URL `debug` parameter vocabulary. `?debug=<value>` may appear multiple times on a URL; every value listed here is parsed by core/debug/params.ts at boot. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
