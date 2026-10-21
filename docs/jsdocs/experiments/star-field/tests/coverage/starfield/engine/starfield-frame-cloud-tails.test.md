# `experiments\star-field\tests\coverage\starfield\engine\starfield-frame-cloud-tails.test.js`

Coverage tails for the per-frame update layer and the

| | |
|---|---|
| **Source** | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-frame-cloud-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeBin`

Packs a valid deep-field binary: uint32 count + count×6 f32
(x,y,z,mag,ci,kind). One record per kind plus a 100-kpc sentinel
star so the drop arm runs, plus a far-edge star for the fade band.
