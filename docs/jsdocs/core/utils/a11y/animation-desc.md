# `core\utils\a11y\animation-desc.ts`

Animated-element descriptions — places each animated

| | |
|---|---|
| **Source** | `src/core\utils\a11y\animation-desc.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PHRASING_HOSTS`

Phrasing-tag membership set — built once from the token map.

### (module scope)

The description record — components.animations.<id>.

### `record`

Reads one animation record from the live-then-fallback components
dictionary. Unknown ids yield empty strings — applying them is a
no-op, so callers never need a pre-check.
- `@param` id ANIMATION_IDS entry.
- `@returns` {alt, longdesc} — possibly empty strings.

### `animationAlt`

The one-sentence animation label — the `alt`-equivalent record field.
- `@param` id ANIMATION_IDS entry.
- `@returns` The localized alt text, or ''.

### `animationLongDesc`

The full animation description — element, behavior, triggers, tech
and purpose in one paragraph.
- `@param` id ANIMATION_IDS entry.
- `@returns` The localized longdesc text, or ''.

### `ensureDescNode`

Finds-or-creates the longdesc node inside `root` and refreshes its
text — locale switches land as text updates on the same node, so
crawlers always read the active locale. The node anchors as the
element's own sibling so it inherits whatever landmark wraps the
element. Elements with no element parent (detached or direct
shadow-root children) and document-level surfaces (the body, whose
`<html>` parent can't take a sibling) fall back to the root /
`<main>` / body hosts.
- `@param` root The element's root (ShadowRoot for the closed DOM tree,
- `@param` id ANIMATION_IDS entry.
- `@param` text The longdesc text to store.
- `@param` el The animated element — sibling anchor for the node.
- `@returns` The desc node id, or '' when the text is empty / the root

### `applyAnimationDesc`

Places an animated element's translated description into the DOM —
a crawler-only `<span class="sr-only" aria-hidden="true">` sibling
node carrying the longdesc. No ARIA wiring and no canvas fallback
text: the element's own accessibility is left untouched (inner text
on a labelled canvas would mismatch its accessible name — the
Label-in-Name failure).

Safe to call on every mount/locale-change: the desc node is created
once per (root, id) and only re-texted afterwards. Elements without
a resolvable description are left untouched.
- `@param` el The animated element (any Element — canvas, img, div, button…).
- `@param` id ANIMATION_IDS entry naming its animation.
