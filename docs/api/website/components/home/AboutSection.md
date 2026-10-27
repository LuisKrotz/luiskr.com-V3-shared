# `website\components\home\AboutSection.tsx`

&lt;about-section&gt; — the home page's bio block: Gravatar profile

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\AboutSection.tsx`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `AboutSection`

The AboutSection — section class.

### `_glitch`

Active TV-glitch session on the portrait — see about/glitch.ts.

### (module scope)

Binds the portrait glitch handlers once the shadow root exists.

### (module scope)

Stops any running glitch loop when the element leaves the DOM.

### (module scope)

Re-binds the bio's continuous type-in description — the two-column
paragraph cascade is ONE coordinated animation (col2 starts as col1
ends), so the text container carries the ABOUT_TEXT record on top
of each <draw-text>'s own TEXT_DRAW binding.

### `aboutTranslations`

Setter/getter — the about-page translation node pushed by the parent view.

### `profilePicture`

Setter/getter — raw Gravatar URL for the profile photo.

### `optimizedProfilePicture`

CDN-resized Gravatar URL for the profile img.

### `profilePictureSrcset`

Responsive srcset candidates for the profile photo.

### `aboutDrawData`

Draw-timing plan for the two bio columns. Both columns share ONE
1500ms animation budget: charDelay = 1500ms ÷ totalChars (both
columns), and each paragraph's offset = cumulative chars before it
× delay — so col2's first paragraph starts exactly when col1's last
ends. The bio reads as a single continuous type-in flowing down the
left column then continuing down the right.

### (module scope)

JSX template for the component's shadow DOM.
