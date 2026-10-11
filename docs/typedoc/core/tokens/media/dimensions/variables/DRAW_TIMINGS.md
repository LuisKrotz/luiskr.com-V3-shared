[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/media/dimensions](../README.md) / DRAW\_TIMINGS

```ts
const DRAW_TIMINGS: Readonly<{
  DRAW_ANIM_EXTRA_MS: 800;
  DRAW_WORD_MAX_DELAY: 120;
  DRAW_DEFAULT_DELAY: 100;
  DRAW_OBSERVER_THRESHOLD: 0.05;
  DRAW_TARGET_MS: 1500;
  DRAW_DELAY_MIN_MS: 1;
  DRAW_DELAY_MAX_MS: 22;
  DRAW_INDEX_STEP_MS: 30;
  DRAW_FALLBACK_DELAY: 14;
  MENU_LABEL_CHAR_DELAY: 45;
  MENU_LABEL_STAGGER_MS: 140;
  MENU_LABEL_OFFSET_MS: 400;
}>;
```

Defined in: core/tokens/media/dimensions.ts:128

Frozen draw-text timing map (ms + observer fraction) — caps and defaults
for the per-character staggered reveal: `EXTRA_MS` is the slack after the
last char's scheduled start before spans collapse (no upper clamp — an
ordered document legitimately schedules items seconds out), `WORD_MAX_DELAY`/
`DEFAULT_DELAY` shape the per-word stagger, `OBSERVER_THRESHOLD` (0.05)
is the IntersectionObserver visibility fraction that triggers a draw,
and the `MENU_LABEL_*` triple paces nav-item labels so each item's
underline lands right after its last character.
