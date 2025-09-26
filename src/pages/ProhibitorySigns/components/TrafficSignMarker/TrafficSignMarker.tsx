import { icons } from '@amsterdam/arm-core'
import { TrafficSign } from '../../../../api/bereikbaarheid/traffic-signs'
import L from 'leaflet'
import endsWith from 'lodash/endsWith'

import { trafficSignBackgrounds } from './backgrounds'

const TrafficSignIcon = (item: TrafficSign) => {
  const signType = item.properties.type.toLowerCase()
  const isZonalSign = endsWith(signType, 'zb')
  const signCategory = item.properties.category

  if (!trafficSignBackgrounds[signType] || !trafficSignBackgrounds[signType][signCategory]) {
    console.warn(`Image for ${signType} ${signCategory} is missing`)
    return icons.defaultIcon
  }

  return L.icon({
    iconUrl: trafficSignBackgrounds[signType][signCategory]!,
    iconSize: !isZonalSign ? [24, 24] : [22, 28],
  })
}

export const TrafficSignMarker = (item: TrafficSign) => {
  const marker = L.marker(new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {
    icon: TrafficSignIcon(item),
  })

  return marker
}
