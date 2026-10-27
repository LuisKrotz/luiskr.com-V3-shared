[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / CoverVariants

Defined in: core/utils/media/manifest.ts:177

Manifest-gated cover URL matrix — see coverVariants().

## Properties

### src

```ts
src: string
```

Defined in: core/utils/media/manifest.ts:179

URL for the LQIP <img src> — kodak blur thumb when proven, else the original.

---

### webp

```ts
webp: string
```

Defined in: core/utils/media/manifest.ts:181

webp matching `src`, '' when not proven.

---

### mobileJpg

```ts
mobileJpg: string
```

Defined in: core/utils/media/manifest.ts:183

≤768px LQIP jpg for a media-scoped <source>, '' when not proven.

---

### mobileWebp

```ts
mobileWebp: string
```

Defined in: core/utils/media/manifest.ts:185

≤768px LQIP webp — preferred over mobileJpg when both exist.

---

### rungs

```ts
rungs: CoverRung[];
```

Defined in: core/utils/media/manifest.ts:189

Ascending display-quality rungs the high layer climbs (coverLadderStep
walks them, highest proven quality last) — empty when no LQIP
exists, since `src` is then already the original.

---

### mobileRungs

```ts
mobileRungs: CoverRung[];
```

Defined in: core/utils/media/manifest.ts:194

Ascending rungs on the 768px `{stem}-mobile` derivative ladder —
the correct climb for boxes ≤768 CSS px (the same stem grammar, so
every rung is a fraction of its full-width twin's bytes). Empty when
the manifest proves no mobile tier.
