import { Marker, useMapInstance } from '@amsterdam/arm-core'
import { useEffect } from 'react'

import { defaultMapOptions } from '../../../../shared/map/mapDefaults'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

const ProhibitorySignsAddressMarker = () => {
  const mapInstance = useMapInstance()
  const { address } = useProhibitorySignsPageContext()

  // Center and zoom map to address
  useEffect(() => {
    if (address.lat && address.lon) {
      mapInstance.flyTo([address.lat, address.lon], 15)
    } else {
      mapInstance.flyTo(defaultMapOptions.center!, defaultMapOptions.zoom)
    }
  }, [mapInstance, address.lat, address.lon])

  return (
    <>
      {address.lat && address.lon && (
        <Marker
          latLng={{ lat: address.lat, lng: address.lon }}
          options={{ interactive: false }}
        />
      )}
    </>
  )
}

export default ProhibitorySignsAddressMarker
