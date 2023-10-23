import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoBlackWhite } from 'shared/map/mapLayers'

import { ParkingSpacesLayer } from './ParkingSpacesLayer'

import { useLoadUnloadPageContext } from '../../contexts/PageContext'

export const LoadUnloadMapLayers = () => {
  const { address } = useLoadUnloadPageContext()

  return (
    <>
      <AddressMarker address={address} />

      <ParkingSpacesLayer />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}
