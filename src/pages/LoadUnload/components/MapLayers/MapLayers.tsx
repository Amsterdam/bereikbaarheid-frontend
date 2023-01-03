import { BaseLayer } from '@amsterdam/arm-core'

import { AddressMarker } from '../../../../shared/components/MapLayers/AddressMarker'
import { HighlightedFeatureLayer } from '../../../../shared/components/HighlightedFeatureLayer'
import { topoBlackWhite } from '../../../../shared/map/mapLayers'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { useLoadUnloadPageContext } from '../../contexts/PageContext'

import { LoadUnloadRoadSectionsLoadUnloadLayer } from './RoadSectionsLoadUnloadLayer'
import { LoadUnloadLoadUnloadSpacesLayer } from './LoadUnloadSpacesLayer'

export const LoadUnloadMapLayers = () => {
  const { detailFeature } = useLoadUnloadMapContext()
  const { address } = useLoadUnloadPageContext()

  return (
    <>
      <AddressMarker address={address} />

      {detailFeature.feature && (
        <HighlightedFeatureLayer
          detailFeature={{
            id: detailFeature.feature.id,
            geometry: detailFeature.feature.data.geometry,
          }}
        />
      )}

      <LoadUnloadRoadSectionsLoadUnloadLayer />

      <LoadUnloadLoadUnloadSpacesLayer />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}
