# `experiments\star-field\tests\coverage\starfield\star\star-music-tails.test.js`

Coverage tails for star/music.ts — the persistent &lt;audio&gt;

|                |                                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\star\star-music-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                             |

## Members

### `makeHost`

Music-host stub — only the fields the player helpers read (_music* + $).

### `mountableHost`

Host + real music-card element — $() returns the card so DOM mutations are observable.
