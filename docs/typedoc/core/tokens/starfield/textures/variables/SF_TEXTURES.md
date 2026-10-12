[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/textures](../README.md) / SF\_TEXTURES

```ts
const SF_TEXTURES: Readonly<{
  SKYBOX: '/experiments/star-field/textures/8k_stars_milky_way.jpg'
  SUN: '/experiments/star-field/textures/8k_sun.jpg'
  MERCURY: '/experiments/star-field/textures/8k_mercury.jpg'
  VENUS_SURFACE: '/experiments/star-field/textures/8k_venus_surface.jpg'
  VENUS_ATMOS: '/experiments/star-field/textures/4k_venus_atmosphere.jpg'
  EARTH_DAY: '/experiments/star-field/textures/8k_earth_daymap.jpg'
  EARTH_NIGHT: '/experiments/star-field/textures/8k_earth_nightmap.jpg'
  EARTH_SPEC: '/experiments/star-field/textures/2k_earth_specular_map.jpg'
  EARTH_NORMAL: '/experiments/star-field/textures/4k_earth_normal.jpg'
  EARTH_CLOUDS: '/experiments/star-field/textures/8k_earth_clouds.jpg'
  EARTH_ELEVATION: '/experiments/star-field/textures/earth_elevation.png'
  MOON: '/experiments/star-field/textures/8k_moon.jpg'
  MARS: '/experiments/star-field/textures/8k_mars.jpg'
  JUPITER: '/experiments/star-field/textures/8k_jupiter.jpg'
  SATURN: '/experiments/star-field/textures/8k_saturn.jpg'
  SATURN_RING: '/experiments/star-field/textures/2k_saturn_ring_alpha.png'
  URANUS: '/experiments/star-field/textures/2k_uranus.jpg'
  NEPTUNE: '/experiments/star-field/textures/2k_neptune.jpg'
  IO: '/experiments/star-field/textures/4k_io.jpg'
  EUROPA: '/experiments/star-field/textures/4k_europa.jpg'
  GANYMEDE: '/experiments/star-field/textures/4k_ganymede.jpg'
  CALLISTO: '/experiments/star-field/textures/4k_callisto.jpg'
  PHOBOS: '/experiments/star-field/textures/4k_phobos.jpg'
  DEIMOS: '/experiments/star-field/textures/4k_deimos.jpg'
  MIMAS: '/experiments/star-field/textures/4k_mimas.jpg'
  ENCELADUS: '/experiments/star-field/textures/4k_enceladus.jpg'
  DIONE: '/experiments/star-field/textures/4k_dione.jpg'
  RHEA: '/experiments/star-field/textures/4k_rhea.jpg'
  TITAN: '/experiments/star-field/textures/4k_titan.jpg'
  IAPETUS: '/experiments/star-field/textures/4k_iapetus.jpg'
  TRITON: '/experiments/star-field/textures/4k_triton.jpg'
  PLUTO: '/experiments/star-field/textures/4k_pluto.jpg'
  CERES: '/experiments/star-field/textures/4k_ceres.jpg'
  VESTA: '/experiments/star-field/textures/4k_vesta.jpg'
  RYUGU: '/experiments/star-field/textures/2k_ryugu.jpg'
  BENNU: '/experiments/star-field/textures/8k_bennu.jpg'
  NEBULA_CARINA: '/experiments/star-field/textures/nebula-carina.png'
  NEBULA_ORION: '/experiments/star-field/textures/nebula-orion.jpg'
  NEBULA_EAGLE: '/experiments/star-field/textures/nebula-eagle.jpg'
  NEBULA_CRAB: '/experiments/star-field/textures/nebula-crab.jpg'
  NEBULA_HELIX: '/experiments/star-field/textures/nebula-helix.jpg'
  NEBULA_RING: '/experiments/star-field/textures/nebula-ring.jpg'
  NEBULA_HORSEHEAD: '/experiments/star-field/textures/nebula-horsehead.jpg'
  NEBULA_LAGOON: '/experiments/star-field/textures/nebula-lagoon.jpg'
  NEBULA_TARANTULA: '/experiments/star-field/textures/nebula-tarantula.jpg'
  CLUSTER_PLEIADES: '/experiments/star-field/textures/cluster-pleiades.jpg'
  CLUSTER_OMEGA: '/experiments/star-field/textures/cluster-omega.jpg'
  GALAXY_MILKYWAY: '/experiments/star-field/textures/galaxy-milkyway.jpg'
  GALAXY_ANDROMEDA: '/experiments/star-field/textures/galaxy-andromeda.jpg'
  GALAXY_TRIANGULUM: '/experiments/star-field/textures/galaxy-triangulum.jpg'
  GALAXY_LMC: '/experiments/star-field/textures/galaxy-lmc.jpg'
  GALAXY_SMC: '/experiments/star-field/textures/galaxy-smc.jpg'
}>
```

Defined in: core/tokens/starfield/textures.ts:14

## File

tokens/starfield/textures.js

## Description

Public-URL paths for the Star Field experiment texture set
(served from `experiments/star-field/public/textures/`). Solar-system
maps are the Solar System Scope CC-BY 8k set; moons/dwarfs are NASA
global mosaics (NASA-3D-Resources, USGS, JPL/Dawn HAMO, Askaniy albedo
maps) — every catalog body carries real imagery, no procedural flats.
The milky-way skybox is the 8k equirect panorama; exoplanet/system
bodies stay procedural (no real imagery exists). Sole declaration
site — consumers import members from this frozen map rather than
re-declaring the literals (zero-hardcoding rule).
