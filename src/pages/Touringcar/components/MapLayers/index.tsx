import { useEffect } from 'react'

import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoBlackWhite } from 'shared/map/mapLayers'

import { useTouringcarPageContext } from '../../contexts/PageContext'

import { ParkingSpacesLayer } from './ParkingSpacesLayer'
import { RoutesMandatoryLayer } from './RoutesMandatoryLayer'
import { RoutesRecommendedLayer } from './RoutesRecommendedLayer'
import { StopsLayer } from './StopsLayer'

const TouringcarMapLayers = () => {
  const { address } = useTouringcarPageContext()

  const { updateActiveMapLayersWithSearchParams } = useTouringcarMapContext()
  useEffect(updateActiveMapLayersWithSearchParams, [
    updateActiveMapLayersWithSearchParams,
  ])

  return (
    <>
      <AddressMarker address={address} />

      <ParkingSpacesLayer />
      <StopsLayer />
      <RoutesRecommendedLayer />
      <RoutesMandatoryLayer />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}

export default TouringcarMapLayers
