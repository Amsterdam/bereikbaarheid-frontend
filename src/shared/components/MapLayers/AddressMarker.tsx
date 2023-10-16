import { useEffect } from 'react'

import { Marker, useMapInstance } from '@amsterdam/arm-core'
import { Address } from 'types/address'

import { defaultMapOptions } from '../../map/mapDefaults'

interface AddressMarkerProps {
  address: Address
}

export const AddressMarker = ({ address }: AddressMarkerProps) => {
  const mapInstance = useMapInstance()

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
