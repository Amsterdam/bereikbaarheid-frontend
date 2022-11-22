import { BaseLayer } from '@amsterdam/arm-core'

import { topoBlackWhite } from '../../../../shared/map/mapLayers'

import { LoadUnloadHighlightedFeatureLayer } from './HighlightedFeatureLayer'
import { LoadUnloadLoadUnloadSpacesLayer } from './LoadUnloadSpacesLayer'

export const LoadUnloadMapLayers = () => {
  return (
    <>
      <LoadUnloadHighlightedFeatureLayer />

      <LoadUnloadLoadUnloadSpacesLayer />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}
