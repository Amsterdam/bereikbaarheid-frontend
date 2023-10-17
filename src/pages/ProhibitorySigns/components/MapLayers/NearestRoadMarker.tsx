import { useEffect, useState } from 'react'

import { Marker, useMapInstance } from '@amsterdam/arm-core'
import L from 'leaflet'
import DistanceToDestinationIconImage from 'shared/icons/bootstrap-icon-flag-fill.svg'

import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'

let flagIcon = L.icon({
  iconUrl: DistanceToDestinationIconImage,
  iconSize: [22, 27],
  iconAnchor: [0, 27],
  tooltipAnchor: [5, -14],
})

const ProhibitorySignsNearestRoadMarker = () => {
  const mapInstance = useMapInstance()
  const permitsByLocation = usePermitsByLocation()
  const [markerInstance, setMarkerInstance] = useState<L.Marker | undefined>(
    undefined
  )

  useEffect(() => {
    if (mapInstance && markerInstance) {
      markerInstance.bindTooltip(
        'Getoonde ontheffingen aan de linkerkant <br> gelden voor deze locatie.',
        {
          direction: 'left',
        }
      )
    }
  }, [mapInstance, markerInstance])

  return (
    <>
      {permitsByLocation.data && permitsByLocation.data.data && (
        <Marker
          latLng={{
            lat: permitsByLocation.data.data.attributes.geom.coordinates[1],
            lng: permitsByLocation.data.data.attributes.geom.coordinates[0],
          }}
          options={{ icon: flagIcon, zIndexOffset: 100 }}
          setInstance={setMarkerInstance}
        />
      )}
    </>
  )
}

export default ProhibitorySignsNearestRoadMarker
