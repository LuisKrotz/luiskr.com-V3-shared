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

### `SCENE_ATTR_OFFSET`

Wireframe-glyph instanced attributes — per-instance world offset,
per-kind ink color, bob phase, and initial spin angle. Same
name-contract as the alpha/active pair: rename in GLSL + buffers
together.

### `SCENE_ICON_INK_PROP`

`--icon-ink` custom property — the icon pack's per-kind themed
color; the map probes it off `docs-tree-icon--<kind>` elements so
scene nodes wear the exact palette the treeview icons do.

### `AGGREGATE_MARK`

`+N` aggregate-leaf name prefix — surplus file leaves collapsed
by the scene leaf cap; the scene colors them with the dir ink.

### `INDEX_TITLE`

sr-only heading + landmark names for the complete document index —
every manifest node rendered as a heading link so AT heading-jump
and crawlers reach all docs without walking the tree.

### `VIEWER_HEADING_PREFIX`

Viewer heading shown when a file is open — labels the content region.

### `GROUP_DOCS_LABEL`

Portal section labels — the flat root buckets re-seat under four
disclosure groups in the treeview and sectioned portal grid.

### `GROUP_PATH_PREFIX`

Synthetic path prefix for the section-group rows — ids under it are
view-only (a section has no manifest path), so tree bookkeeping
('group/docs'…) can never collide with a real docs route.

### `ARCH_DIR`

The docs-root child promoted into its own Architecture section.

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

### `SCENE_MIN_ORBIT`

hierarchical-sphere layout (the procedural-directory reference):
every node's children orbit it on a Fibonacci sphere at the
parent's cluster radius — shared with the wasm worker op. Cluster
radii come from subtree-extent packing: MIN_ORBIT floors a cluster
so a lone child never collapses onto its parent glyph; MIN_SEP is
the guaranteed clear-space gap between sibling subtree clouds
(≥20px at the fit-zoom framing — the hairball fix).

### `SCENE_CHILD_SCALE`

reference shrink ratio — a dir's child orbit is never smaller
than this fraction of the orbit the dir itself sits on (the
procedural-directory map's 12→5 ≈ 0.42 taper), so nested clouds
compress geometrically instead of summing subtree extents.

### `SCENE_GLYPH_MAX`

Largest rendered glyph radius in chart units — the scale cap for
the orbit-proportional glyph size AND the sibling-clearance term
(orbits are sized so two max-size glyphs keep MIN_SEP between
their wireframe edges).

### `SCENE_RELAX_ITERS`

Pairwise relax iterations after placement — sibling-chord sizing
covers siblings, but deep subtree clouds can interpenetrate
cross-branch; a few Jacobi passes push the rare colliding glyphs
apart (each pass moves a pair by the full deficit, so the loop
count covers only chained collisions — layout-time O(n²·iters)
on the capped scene tree).

### `SCENE_BASE_RADIUS`

orbit clamp — also the camera's minimum distance token (reused
as SCENE_BASE_RADIUS's successor on the scene3d arm).

### `SCENE_Y_HASH`

golden angle (π(3−√5) ≈ 2.399963 rad) — the Fibonacci-sphere
azimuth step AND the decorrelation hash for bob phases.

### `SCENE_ROTATE_SPEED`

slow backdrop motion — autorotate deg/frame-ish + node pulse.
Speeds run far under OrbitControls' default (2.0) so the graph
reads as a calm ambient layer, not a spinner.

### `SCENE_NODE_SPIN`

Per-node wireframe motion (the procedural-directory reference):
every glyph yaws about its own Y at SPIN rad/s with a hashed
initial angle, and bobs ±BOB_AMP chart units at BOB_SPEED rad/s
off a decorrelated phase. SPIN_HASH walks the node index through
a golden-angle-ish sequence so neighbors never spin in lockstep.

### `SCENE_FOG_DENSITY`

Exponential fog — density = FOG_DENSITY / graphR, so the far rim
fades into the page backdrop (light or dark) like the reference's
dark-slate depth cue, scaled to whatever radius the manifest
actually spans. Kept low enough that the cloud's center mass stays
inked — on light surfaces pastel inks washed >80% toward the fog
color disappear entirely.

### `INDEX_CHUNK`

semantic-index streaming — elements appended per idle slice (~a few
ms each, far under a frame budget), the rIC starvation bound per
slice, and the setTimeout fallback delay where rIC is absent

### `TREE_SHEET_CAP_CLOSED`

folder paper-stack caps — closed folders peek at most this many
page tops above the tab; open folders fan up to this many colored
sheets, so the pile stops growing before it walls off the glyph

### `SCENE_DIR_RADIUS`

node sphere radii (chart units) — base glyph sizes before the
per-node proportional scale. SCENE_GLYPH_FIT = the reference's
icon-to-orbit ratio: a node's rendered glyph inflates to this
fraction of the orbit it sits on, so every icon stays readable
and proportional to its local spacing at any depth — the big
center hub + shrinking satellites look.

### `SCENE_FILE_CAP`

File leaves drawn per dir before the rest collapse into a `+N`
aggregate — the cap that keeps 300-file dirs from combing out. It
shrinks by SCENE_FILE_CAP_STEP per ring: buckets get the full cap,
deep dirs aggregate everything.

### `SCENE_DIR_CAP`

Dir fan-out + depth budgets — the raw manifest is ~4.4k nodes,
which no guaranteed-separation layout can render readably, so dir
children past SCENE_DIR_CAP (shrinking by _STEP per ring down to
_MIN) and whole subtrees past SCENE_DEPTH_CAP collapse into the
same `+N` aggregate leaf the file cap uses. The aggregate keeps
its parent dir's path — picking it still opens that dir's page.

### `SCENE_DIR_OPACITY`

node/edge alpha — hairline wireframe carries far less ink than a
filled surface, so glyphs and edges run near-full alpha or they
ghost out on light glass; on dark slate they stay neon anyway.

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
