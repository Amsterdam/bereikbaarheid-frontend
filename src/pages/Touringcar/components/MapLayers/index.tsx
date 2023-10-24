import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoColorLight } from 'shared/map/mapLayers'

import { ParkingSpacesLayer } from './ParkingSpacesLayer'

import { useTouringcarPageContext } from '../../contexts/PageContext'

const TouringcarMapLayers = () => {
  const { address } = useTouringcarPageContext()

  return (
    <>
      <AddressMarker address={address} />

      <ParkingSpacesLayer />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={topoColorLight.url}
        options={topoColorLight.options}
      />
    </>
  )
}

export default TouringcarMapLayers
