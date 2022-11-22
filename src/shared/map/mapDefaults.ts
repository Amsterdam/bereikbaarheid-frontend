//
// Map
//
import { AMSTERDAM_MAPS_OPTIONS } from '@amsterdam/arm-core'
import { CRS } from 'leaflet'
import type L from 'leaflet'

export const defaultMapOptions = {
  ...AMSTERDAM_MAPS_OPTIONS,
  crs: CRS.EPSG3857, // default arm-core map is in RD
  minZoom: 12, // tile layers are viewable from this zoomlevel
  maxZoom: 18,
  zoom: 13,
}

/**
 * set map defaults
 * @param {L.Map} map Leaflet map instance
 * @returns the Leaflet map instance
 */
export function setMapDefaults(map: L.Map) {
  map = setDefaultAttribution(map)

  return map
}

function setDefaultAttribution(map: L.Map) {
  // https://github.com/Leaflet/Leaflet/pull/8109
  map.attributionControl.setPrefix(
    `<a
        href="https://leafletjs.com"
        title="A JavaScript library for interactive maps"
        target="_blank"
    >Leaflet</a>`
  )

  return map
}
