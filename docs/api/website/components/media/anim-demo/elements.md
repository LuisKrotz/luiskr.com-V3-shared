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

### `_SCENE_STARS`

Star count in the engine mini-scene — a compact cloud that still
reads as the playground's star field at the demo's small box.

### `_SCENE_RADIUS`

Star-cloud radius in world units — the disc the camera orbits.

### `_SCENE_DIST`

Orbit distance — the camera stands back far enough to frame the
whole cloud inside the demo's ~4:3 box.

### `_SCENE_FOV`

Vertical field of view, degrees — the engines' standard lens.

### `_CLIP_NEAR`

Camera near clip — inside the cloud's inner edge.

### `_CLIP_FAR`

Camera far clip — past the cloud's outer edge.

### `_POINT_SIZE`

Point-sprite diameter in world units.

### `_SCENE_DRIFT`

Star-cloud yaw drift (rad/s) — a slow turn, not a spin.

### `_SCENE_SWAY`

Orbit yaw sway amplitude (rad) — a gentle camera bob.

### `_SCENE_SWAY_RATE`

Orbit sway rate (rad/s).

### `_SCENE_PITCH`

Resting orbit pitch (rad) — lifted so the cloud reads as a disc,
not a line.

### `_SIDE_FRONT`

set_material_flags slots — front faces, additive blending (stars
accumulate light; the API takes the enum's numeric index).

### `seedScene`

Seeds the mounted scene3d surface with a mini star field — a flat
point cloud in an additive material on a slowly orbiting camera, the
same vocabulary the real playground scene speaks (points, orbit rig,
one rAF-driven `frame()`). Runs the engine's own API so the demo is
a real scene, not a canned recording; under reduced motion it paints
one settled frame and stops.

- `@param` canvas The GPU canvas (computed-style anchor for the ink).
- `@param` surface The live engine handle's surface.
- `@returns` The rAF id to cancel on teardown (0 when settled/mocked).

### `mountScene3dDemo`

3D-scene demo — the stage carries two stacked full-size canvases:
the first always paints the 2D starfield approximation (it is also
the fallback surface); the real scene3d engine mounts on the last
one and, where WebGPU is available, composites its own seeded mini
scene over the field. Splitting the surfaces keeps the fallback's
2D context alive — a shared canvas can't re-bind '2d' once the
engine claims it for WebGPU, which is how the single-canvas version
stranded the stage on a transparent blank.

- `@param` ctx The demo context (stage owns the canvas pair).
- `@returns` Teardown — destroys whichever surfaces mounted.
