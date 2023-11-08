/**
 * Map layers used on various pages
 */
import { TileLayerOptions, WMSOptions } from 'leaflet'
// for an explanation of TileLayerOptions type usage see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15313#issuecomment-441331339

const optionsShared = {
  keepBuffer: 10,
}

export const aerialImages = {
  id: 'aerialImages',
  label: 'Luchtfoto',
  options: {
    bounds: [
      [48.04050187217583, -1.657291602308058],
      [56.1105896454882, 12.431727265021497],
    ],
    minZoom: 11,
    maxZoom: 18,
    subdomains: ['t1', 't2', 't3', 't4'],
  } as TileLayerOptions,
  url: 'https://{s}.data.amsterdam.nl/lufo2021_WM/{z}/{x}/{y}.jpeg',
}

export const linkIds = {
  id: 'linkIds',
  label: 'Linknummers',
  options: {
    attribution: 'VMA 4.00 2021-06-22 Link IDs',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 17,
    maxZoom: 18,
    pane: 'overlayPane',
    zIndex: 275,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/id/{z}/{x}/{y}.png',
}

export const loadUnloadSpaces = {
  id: 'loadUnloadSpaces',
  label: 'Laad- en losplekken',
  options: {
    ...optionsShared,
    layers: 'parkeervakken_reservering',
    categorie: 'laden_lossen',
    format: 'image/png',
    minZoom: 16, // this WMS only provides output from zoom level 16 onwards
    maxZoom: 21,
    transparent: true,
    zIndex: 25,
  } as WMSOptions,
  url: 'https://map.data.amsterdam.nl/maps/parkeervakken',
}

export const oneWayArrows = {
  id: 'oneWayArrows',
  label: 'Eenrichtingsverkeer',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-03 Arrow',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 16,
    maxZoom: 18,
    pane: 'overlayPane',
    zIndex: 250, // the z-index should be > 200 to let it appear on top of SVG layers.
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/pijlen/{z}/{x}/{y}.png',
}

export const roadNetworkNoRestrictions = {
  id: 'roadNetworkNoRestrictions',
  label: 'VMA Algemeen',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-09-06 Algemeen',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 50,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/normaal/{z}/{x}/{y}.png',
}

export const roadNetworkHeavyGoodsVehicleZone = {
  id: 'roadNetworkHeavyGoodsVehicleZone',
  label: 'Zone zwaar verkeer',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-09-06 Zone zwaar verkeer',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 50,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/zzv/{z}/{x}/{y}.png',
}

export const roadNetworkLowEmissionZone = {
  id: 'roadNetworkLowEmissionZone',
  label: 'Milieuzone',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-09-06 Milieuzone',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 50,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/milieu/{z}/{x}/{y}.png',
}

export const roadNetworkHeavyGoodsVehicleAndLowEmissionZone = {
  id: 'roadNetworkHeavyGoodsVehicleAndLowEmissionZone',
  label: 'Milieuzone & zone zwaar verkeer',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-09-06 Milieuzone & zone zwaar verkeer',
    bounds: [
      [52.2602, 5.085],
      [52.4496, 4.7205],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 50,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/zzv_en_milieu/{z}/{x}/{y}.png',
}

export const topoBlackWhite = {
  id: 'topoBlackWhite',
  label: 'Topografie zwart/wit',
  options: {
    ...optionsShared,
    bounds: [
      [48.04050187217583, -1.657291602308058],
      [56.1105896454882, 12.431727265021497],
    ],
    minZoom: 11,
    maxZoom: 21,
    subdomains: ['t1', 't2', 't3', 't4'],
  } as TileLayerOptions,
  url: 'https://{s}.data.amsterdam.nl/topo_wm_zw/{z}/{x}/{y}.png',
}

export const topoColorLight = {
  id: 'topoColorLight',
  label: 'Topografie kleur',
  options: {
    ...optionsShared,
    bounds: [
      [48.04050187217583, -1.657291602308058],
      [56.1105896454882, 12.431727265021497],
    ],
    minZoom: 11,
    maxZoom: 18,
  } as TileLayerOptions,
  url: 'https://t1.data.amsterdam.nl/topo_wm_light/{z}/{x}/{y}.png',
}

export const wideRoads = {
  id: 'wideRoads',
  label: 'Breed opgezette wegen',
  options: {
    ...optionsShared,
    attribution: 'VMA 4.00 2021-09-06 Breed opgezette wegen',
    bounds: [
      [52.3553, 4.874106995285647],
      [52.39161114725358, 4.934163233278995],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 40,
  } as TileLayerOptions,
  url: 'https://verkeeramsterdam.nl/tiles/vma_latest/breed_opgezette_wegen/{z}/{x}/{y}.png',
}
