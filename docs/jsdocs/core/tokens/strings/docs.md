# `core\tokens\strings\docs.ts`

Docs-portal string tokens — English-only UI literals, the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\docs.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DOCS_STRINGS`

Frozen docs string map — sole declaration site for these tokens;
consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `TITLE`

Page + footer link title — English-only by product spec.

### `DESC_FALLBACK`

English fallback for the CMS-provided description + toast copy.

### `CMS_COMPONENT`

database.json component node: translations/<locale>/components/<key>.

### `ASSET_BASE`

URL prefix under which rendered file payloads are served/emitted.

### `ASSET_EXT`

JSON suffix appended to every emitted content payload.

### `CRUMB_INPUT_LABEL`

Accessibility labels for the editable breadcrumb + copy feedback.

### `MAIN_LABEL`

aria-label on the docs content area — the shell already owns the
sole <main> landmark, so the portal's content region is a named
section (region landmark) rather than a second main.

### `KEY_PRINT_SCREEN`

Keyboard key the print-screen guard reacts to.

### `CRUMB_PLACEHOLDER`

Editable-breadcrumb input fallback when the URL path can't resolve.

### `CRUMB_INPUT_NAME`

`name` attr for the editable-breadcrumb field (form-field audit).

### `SRC_ROOT`

Root-bucket folder exempt from index-file auto-open (source tree).

### `INDEX_FILE`

Index filename that auto-opens when its folder is entered.

### `EVENT_COPY_ATTEMPT`

Analytics event name for copy-guard attempts.

### `SCHEMA_DESCRIPTION`

JSON-LD description for the portal root/folder pages.

### `LOADER_TITLE`

Boot-loader overlay copy — mirrors the space playground's system
boot sequence with docs-context wording (English-only portal).

### `MERMAID_LOADING`

In-place skeleton label while a mermaid diagram renders.

### `SCENE_HINT`

Visible chip captioning the backdrop scene so the interactive
architecture map is obvious to a first-time viewer.

### `MAP_LABEL`

Landmark label for the right-hand map column and its zoom dialog.

### `MAP_ZOOM`

Zoom trigger aria-label — opens the enlarged modal scene.

### `MAP_CLOSE`

Close control aria-label inside the map zoom dialog.

### `SCENE_ATTR_ALPHA`

Instanced-attribute names on the scene's node geometries — the
names are part of the patched GLSL program (attribute decls read
them too), so a rename must land in both streams at once.

### `INDEX_TITLE`

sr-only heading + landmark names for the complete document index —
every manifest node rendered as a heading link so AT heading-jump
and crawlers reach all docs without walking the tree.

### `VIEWER_HEADING_PREFIX`

Viewer heading shown when a file is open — labels the content region.

### `DOCS_LOADER_PCT`

Staged boot-loader progress marks — the manifest is inlined at build
time so real fetch percentages don't exist; discrete stage numbers
keep the bar honest (manifest scanned → scene mounted → file fetched
→ portal usable).

### `DOCS_UNITS`

Unit tokens used by docs layout/scene math.

### `GL_STRIP_TIME_SCALE`

gl-strip thread-field drift — 1/16 real-time so lines barely move

### `FOLDER_HASH_MOD`

deterministic folder-art hash modulus

### `TAP_SLOP_PX`

tap-vs-drag pick slop in px — taps move < this many CSS px

### `LABEL_W`

label sprite canvas box (px) and font size (px)

### `LABEL_SCALE_X`

world-space sprite size + lift above the node sphere

### `LABEL_REVEAL_BASE`

zoom reveal: labels fade in when controls distance drops under
(LABEL_REVEAL_BASE − depth·LABEL_DEPTH_STEP), over LABEL_FADE px

### `SCENE_LABEL_MAX_DEPTH`

deepest ring that gets a sprite label — each label is a canvas
texture (~85kB VRAM), so an unlabeled deep tier keeps the scene
inside low-power GPU memory; deep dirs stay navigable via the
treeview and the dots themselves.

### `SCENE_BASE_RADIUS`

radial-tree geometry shared with the wasm worker op

### `SCENE_ROTATE_SPEED`

slow backdrop motion — autorotate deg/frame-ish + node pulse.
Speeds run far under OrbitControls' default (2.0) so the graph
reads as a calm ambient layer, not a spinner.

### `INDEX_CHUNK`

semantic-index streaming — elements appended per idle slice (~a few
ms each, far under a frame budget), the rIC starvation bound per
slice, and the setTimeout fallback delay where rIC is absent

### `TREE_SHEET_CAP`

folder paper-stack cap — beyond this many children the pile stops
growing so the glyph stays readable instead of a wall of paper

### `SCENE_DIR_RADIUS`

node sphere radii (chart units) — sized to read at the mid-zoom
camera distance without smearing into blobs at near clip

### `SCENE_DIR_OPACITY`

node/edge alpha — faint enough to stay a backdrop layer, strong
enough that the radial tree reads as a structure, not a smudge

### `SCENE_EDGE_HALF`

scene3d edge ribbons — half-width of the cross-quad strips that
stand in for 1px LineSegments under the engine (chart units)

### `SCENE_ACTIVE_OPACITY`

active-location highlight — the node matching the open docsPath pops
to near-full alpha with a larger pulse; ancestor dirs along its path
lift a notch above the base dir alpha so the branch reads.

### `SCENE_INTRO_TURN`

intro settle — a first (unrestored) mount eases the whole graph in
from SCENE_INTRO_TURN radians over SCENE_INTRO_MS, then hands off to
the ambient autorotate. Restored poses skip the intro entirely.

### `SCENE3D_MOUNT_TIMEOUT`

scene3d/WebGPU mount deadline — adapter+device+artifact acquisition
can wedge on a wedged GPU process; past this bound the canvas mounts
the proven three.js arm instead of waiting forever on a blank map.

### `SCENE_CAMERA_FIT`

Camera framing — distance = graphR·FIT and height = dist·LIFT.
FIT is deliberately under the full-fit ratio: deep manifests push
graphR past 100, and fitting the whole tree shrinks every ring to
a speck — framing the inner rings keeps the navigable structure
(root, buckets, first levels) legible while the outer rings bleed
off-frame (orbit/zoom still reaches them). LIFT ≈ 40° elevation
lets the concentric ring layout read as a map.

### `SCENE_FOCUS_DAMP`

location-driven focus — when the docs location changes the map
glides its orbit target onto the active node and dollies to a
depth-scaled distance so the current branch fills the frame.
DAMP is the per-frame lerp share toward the goal, MIN/STEP shape
the focus distance (base + depth·step, capped at camDist so the
root overview never zooms), EPS is the settle epsilon that ends
the glide.

### `SCENE_FOCUS_Y_BIAS`

vertical framing bias — the orbit target rides this far below the
focused point so the graph renders in the TOP half of the map
panel instead of dead-center (content top-anchored by design).
Sized against the fov-55 half-frame (~0.52·dist): ~20% up-shift at
the full-graph distance, ~30% at node-focus distances.
