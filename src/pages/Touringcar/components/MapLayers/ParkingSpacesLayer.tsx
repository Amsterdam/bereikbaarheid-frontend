import { useEffect, useState } from 'react'

import { GeoJSON } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarParkingSpaces from 'api/touringcar/parking-spaces'
import { DomEvent } from 'leaflet'
import { useTheme } from 'styled-components'

export const ParkingSpacesLayer = () => {
  const theme = useTheme()

  const [touringcarParkingSpacesLayer, setTouringcarParkingSpacesLayer] =
    useState<L.GeoJSON | null>(null)

  const touringcarParkingSpaces = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () =>
      getTouringcarParkingSpaces({
        _format: 'geojson',
      }),
  })

  console.log(touringcarParkingSpaces.data)

  useEffect(() => {
    if (touringcarParkingSpacesLayer) {
      touringcarParkingSpacesLayer.setStyle(feature => {
        return {
          color: theme.colors.primary?.main,
          weight: 5,
        }
      })
    }
  }, [theme.colors.primary?.main, touringcarParkingSpacesLayer])

  if (
    touringcarParkingSpaces.isError &&
    touringcarParkingSpaces.error instanceof Error
  ) {
    console.error(touringcarParkingSpaces.error.message)
  }

  if (touringcarParkingSpaces.isLoading || !touringcarParkingSpaces.data) {
    return null
  }

  return (
    <GeoJSON
      args={[touringcarParkingSpaces.data]}
      setInstance={setTouringcarParkingSpacesLayer}
      options={{
        onEachFeature: (feature, layer: L.GeoJSON) => {
          layer.on('click', e => {
            DomEvent.stopPropagation(e)
          })
        },
      }}
    />
  )
}
