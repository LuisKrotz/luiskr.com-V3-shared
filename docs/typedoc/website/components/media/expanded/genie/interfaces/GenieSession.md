[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie](../README.md) / GenieSession

Defined in: website/components/media/expanded/genie.ts:73

Live session record — stored on `el._genie` so close/destroy paths
can cancel mid-flight.

## Properties

### raf

```ts
raf: number
```

Defined in: website/components/media/expanded/genie.ts:75

The pending rAF handle — cancel() stops the clock.

---

### content

```ts
content: HTMLElement
```

Defined in: website/components/media/expanded/genie.ts:77

The veiled content element (visibility kept on bail-out).

---

### renderer

```ts
renderer: GenieRenderer | null
```

Defined in: website/components/media/expanded/genie.ts:79

The active renderer once the backend resolves (null while async-mounting).

---

### p

```ts
p: number
```

Defined in: website/components/media/expanded/genie.ts:81

Eased funnel progress — 0 = modal sheet, 1 = figure funnel.

---

### last

```ts
last: number
```

Defined in: website/components/media/expanded/genie.ts:83

rAF timestamp of the previous frame — dt source.

---

### started

```ts
started: number
```

Defined in: website/components/media/expanded/genie.ts:85

Session start (ms) — the GENIE_TIMING.MAX_MS watchdog.

---

### done

```ts
done: () => void;
```

Defined in: website/components/media/expanded/genie.ts:87

Runs once on settle — open: none (unveil suffices); close: teardown.

#### Returns

`void`

---

### cancelled

```ts
cancelled: boolean
```

Defined in: website/components/media/expanded/genie.ts:89

Set on cancel — the async backend pick short-circuits on it.

---

### opening

```ts
opening: boolean
```

Defined in: website/components/media/expanded/genie.ts:91

True while opening (origin → modal); false on the collapse.

---

### measured

```ts
measured: boolean
```

Defined in: website/components/media/expanded/genie.ts:98

Set once the first tick ran the measure+mount phase — the backend
pick defers there so the rect reads land in a fresh task instead of
interleaving with the caller's mount-task writes (forced-reflow
governance).

---

### cb

```ts
cb: () => void;
```

Defined in: website/components/media/expanded/genie.ts:104

The rAF callback — allocated once per session and re-armed every
frame (a per-frame `() => tick(el, s)` closure would allocate at
240Hz, violating the zero-allocation frame budget).

#### Returns

`void`

---

### landed

```ts
landed: boolean
```

Defined in: website/components/media/expanded/genie.ts:112

Set once the converged terminal frame (media exactly on the
destination rect) has painted — the next tick tears down. One
composite cycle must elapse between the landing draw and the
overlay removal or the funnel's last mid-flight frame pops
straight to the page: the close-direction "blink".
