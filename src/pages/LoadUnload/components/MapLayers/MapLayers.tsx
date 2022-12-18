import { BaseLayer } from '@amsterdam/arm-core'

import { AddressMarker } from '../../../../shared/components/MapLayers/AddressMarker'
import { topoBlackWhite } from '../../../../shared/map/mapLayers'

import { useLoadUnloadPageContext } from '../../contexts/PageContext'

import { LoadUnloadHighlightedFeatureLayer } from './HighlightedFeatureLayer'
import { LoadUnloadLoadUnloadSpacesLayer } from './LoadUnloadSpacesLayer'

export const LoadUnloadMapLayers = () => {
  const { address } = useLoadUnloadPageContext()

  return (
    <>
      <AddressMarker address={address} />

      <LoadUnloadHighlightedFeatureLayer />

      <LoadUnloadLoadUnloadSpacesLayer />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}
