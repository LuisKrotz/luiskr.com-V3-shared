# `website\components\media\anim-demo\elements.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\elements.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Duck-typed <card-stack> surface — the real props the home view pushes.

### (module scope)

Duck-typed <mentions-deck> surface — title + items + deckHint copy
(Omit re-bases `title` — the element widens HTMLElement's own
`title: string` accessor to accept null like the real component).

### (module scope)

Duck-typed <awards-carousel> surface — variant/dots/dwell config + slides.

### (module scope)

Duck-typed <custom-carousel> surface — the batch assign the project
view calls (optional: unregistered in test envs that skip the
component registry).

### (module scope)

Duck-typed <about-section> surface — the two props the home view pushes.

### `_DEMO_DWELL_MS`

Demo cadence for the awards-carousel autoplay dwell — the production
strip idles 30s per slide, which reads as a static frame inside a
demo box; the dwell is a host-configured prop, so the demo mounts
the real element with a demo-visible dwell. The scroll/momentum
animation itself is the production path either way.

### `processedItem`

The featured flag normalization the home view applies to
portfoliolist rows — explicit true/'true'/1 on the row, or membership
in the canonical featured-links set from components/projects.

- `@param` item The raw portfoliolist row.
- `@param` featuredLinks Links flagged featured in components/projects.
- `@returns` The row with a boolean `featured`.

### `featuredLinks`

The canonical featured-links set — the components/related rows
flagged featured; the same source the home view reads to fan the
deck.

- `@param` related The loaded components/related node.
- `@returns` Project links flagged featured in the CMS.

### `portfolioRows`

The portfoliolist rows of the loaded HOME node, normalized to the
array shape card-stack/custom-carousel consume (the DB stores the
list as either an array or a keyed object), featured flags resolved
the same way home's processedItems resolves them.

- `@param` home The loaded pages/HOME node.
- `@param` related The loaded components/related node (featured source).
- `@returns` The portfolio rows, featured flags resolved.

### `mentionRows`

The mention_items rows of the loaded ABOUT node — the same records
the real deck/awards strip fan (link + icon + description).

- `@param` about The loaded pages/ABOUT node.
- `@returns` The mention rows.

### `feed`

Guarded data write — resolves the shared demo data and assigns it
into the element only while the mount is still live (a demo that
scrolled away or unmounted discards the late payload).

- `@param` alive The liveness flag the teardown flips.
- `@param` apply Pushes the resolved node pair into the element.
- `@returns` The liveness flag's flip function — the driver teardown.

### `mountCardStackDemo`

Card-stack demo — mounts the real <card-stack> coverflow and pushes
the real portfoliolist (featured flags resolved like home's
processedItems). The deck's own autoplay/drag/spring machinery owns
the animation; the demo only supplies data.

- `@param` ctx The demo context (stage owns the element).
- `@returns` Teardown — blocks the late data write.

### `mountMentionsDeckDemo`

Mentions-deck demo — mounts the real <mentions-deck> and pushes the
real mention records + deck hint copy the contact section supplies.
The deck's drag-dismiss/autoplay choreography is the production path.

- `@param` ctx The demo context (stage owns the element).
- `@returns` Teardown — blocks the late data write.

### `mountAwardsCarouselDemo`

Awards-carousel demo — mounts the real <awards-carousel> in its
awards variant with the real mention slides; the dwell is shortened
to a demo-visible cadence (the momentum/clone-wrap animation is the
production path regardless).

- `@param` ctx The demo context (stage owns the element).
- `@returns` Teardown — blocks the late data write.

### `mountCustomCarouselDemo`

Custom-carousel demo — mounts the real <custom-carousel> with cover
slides built from the real portfoliolist (CDN stem + label), the
same item shape project galleries push.

- `@param` ctx The demo context (stage owns the element).
- `@returns` Teardown — blocks the late data write.

### `mountAboutSectionDemo`

About-section demo — mounts the real <about-section> and pushes the
real about node + profile picture; the section's own machinery
mounts the glitch session, the warp mesh and the draw-text bio — so
the glitch-portrait and about-mesh records demo the production
surface itself.

- `@param` ctx The demo context (stage owns the element).
- `@returns` Teardown — blocks the late data write.

### `mountScene3dDemo`

3D-scene demo — mounts the real mountScene3d WebGPU surface on the
stage canvas; where WebGPU/the wasm artifact is unavailable (the
common headless/fallback case) the 2D approximation driver keeps the
stage alive with the same motion vocabulary.

- `@param` ctx The demo context (stage owns the canvas).
- `@returns` Teardown — destroys whichever surface mounted.
