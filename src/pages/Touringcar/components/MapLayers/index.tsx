import { useLayoutEffect, useState } from 'react'

import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoBlackWhite } from 'shared/map/mapLayers'

import { useTouringcarPageContext } from '../../contexts/PageContext'

import { EnvironmentalZoneLayer } from './EnvironmentalZoneLayer'
import { MessagesLayer } from './MessagesLayer'
import { ParkingSpacesLayer } from './ParkingSpacesLayer'
import { RoutesDestinationTrafficLayer } from './RoutesDestinationTrafficLayer'
import { RoutesMandatoryLayer } from './RoutesMandatoryLayer'
import { RoutesRecommendedLayer } from './RoutesRecommendedLayer'
import { StopsLayer } from './StopsLayer'
import { VehicleHeightsLayer } from './VehicleHeightsLayer'

const TouringcarMapLayers = () => {
  const { address } = useTouringcarPageContext()

  const { updateActiveMapLayersWithSearchParams } = useTouringcarMapContext()
  const [show, setShow] = useState(false)
  useLayoutEffect(() => {
    updateActiveMapLayersWithSearchParams()

    // Hacky workaround for apparent bug (?) in Amsterdam React Maps:
    // GeoJSON's are loaded when going back with the browser's history even if they shouldn't be.
    setTimeout(() => setShow(true), 100)
  }, [updateActiveMapLayersWithSearchParams])

  return (
    <>
      <BaseLayer baseLayer={topoBlackWhite.url} options={topoBlackWhite.options} />
      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <MessagesLayer />
      <StopsLayer />
      <ParkingSpacesLayer />
      <VehicleHeightsLayer />
      {show && (
        <>
          <RoutesDestinationTrafficLayer />
          <RoutesRecommendedLayer />
          <RoutesMandatoryLayer />
          <EnvironmentalZoneLayer />
        </>
      )}
      <AddressMarker address={address} />
    </>
  )
}

export default TouringcarMapLayers
