[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/weather](../README.md) / SF\_METEOR

```ts
const SF_METEOR: Readonly<{
  INTERVAL: 3.5
  LIFE: 0.9
  SIZE: 0.09
  POOL: 3
  COLOR: 16767392
}>
```

Defined in: core/tokens/starfield/params/weather.ts:280

Meteor strikes — airless cratered bodies (Moon, Callisto, Mercury,
the asteroid dwarfs) still take hits; a small pooled sprite flashes
at a random surface point every few seconds, the way a real impact
fireball flickers. Pool keeps allocation out of the frame loop.
