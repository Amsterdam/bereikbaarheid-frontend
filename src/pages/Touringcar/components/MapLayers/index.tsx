import { useEffect } from 'react'

import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoColorLight } from 'shared/map/mapLayers'

import { useTouringcarPageContext } from '../../contexts/PageContext'

import { ParkingSpacesLayer } from './ParkingSpacesLayer'
import { RoutesMandatoryLayer } from './RoutesMandatoryLayer'

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
      <RoutesMandatoryLayer />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={topoColorLight.url}
        options={topoColorLight.options}
      />
    </>
  )
}

export default TouringcarMapLayers
