# `website\components\home\AboutSection.tsx`

&lt;about-section&gt; — the home page's opening bio block: title,

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\AboutSection.tsx`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `AboutSection`

The AboutSection — section class.

### `_glitch`

Active TV-glitch session on the portrait — see about/glitch.ts.

### `_hud`

Active location-HUD session on the portrait — see about/hud.ts.

### `_mesh`

Active light-field mesh session on the portrait — see about/mesh.ts.

### `_titleFit`

Active portrait-to-title fit session — see about/titlefit.ts.

### (module scope)

Binds the portrait glitch handlers once the shadow root exists, then
subscribes to the store and ensures the components dictionary (which
carries contact.line1 for the links row) is loaded — same ensure-fetch
<contact-section> performs; whichever section mounts first fires it.

### (module scope)

Stops any running glitch loop when the element leaves the DOM.

### (module scope)

Re-binds the bio's continuous type-in description — the intro +
paragraph cascade is ONE coordinated animation (each paragraph starts
as the previous ends), so the text container carries the ABOUT_TEXT
record on top of each <draw-text>'s own TEXT_DRAW binding.

### `aboutTranslations`

Setter/getter — the about-page translation node pushed by the parent view.

### `profilePicture`

Setter/getter — raw Gravatar URL for the profile photo.

### `optimizedProfilePicture`

CDN-resized Gravatar URL for the profile img.

### `profilePictureSrcset`

Responsive srcset candidates for the profile photo.

### `aboutLocations`

The `locations` array of the about node — drives the orbiting HUD.

### `aboutSubtitle`

The `subtitle` tagline node — falls back to the bundled snapshot.

### `aboutDrawData`

Draw-timing plan for the intro + bio column. The `frame` node is the
hero statement (falling back to col1's lead paragraph); every remaining
paragraph follows in one column. All items share ONE 1500ms animation
budget: charDelay = 1500ms ÷ totalChars, and each paragraph's offset =
cumulative chars before it × delay — the bio reads as a single
continuous type-in flowing from the intro down the column.

### (module scope)

JSX template for the component's shadow DOM.
