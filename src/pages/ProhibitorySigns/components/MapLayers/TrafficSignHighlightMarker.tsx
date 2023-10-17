import { Marker } from '@amsterdam/arm-core'
import L from 'leaflet'
import highlightIconImage from 'shared/icons/highlight.png'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'

let highlightIcon = L.icon({
  iconUrl: highlightIconImage,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
})

const ProhibitorySignsTrafficSignHighlightMarker = () => {
  const { currentTrafficSign } = useProhibitorySignsMapContext()

  if (!currentTrafficSign) return null

  return (
    <Marker
      latLng={{
        lat: currentTrafficSign.geometry.coordinates[1],
        lng: currentTrafficSign.geometry.coordinates[0],
      }}
      options={{ icon: highlightIcon, interactive: false }}
    />
  )
}

export default ProhibitorySignsTrafficSignHighlightMarker
