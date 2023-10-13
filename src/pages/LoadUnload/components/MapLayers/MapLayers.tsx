import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'

import { LoadUnloadLoadUnloadSpacesLayer } from './LoadUnloadSpacesLayer'
import { LoadUnloadRoadSectionsLoadUnloadLayer } from './RoadSectionsLoadUnloadLayer'

import { HighlightedFeatureLayer } from '../../../../shared/components/HighlightedFeatureLayer'
import { AddressMarker } from '../../../../shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoBlackWhite } from '../../../../shared/map/mapLayers'
import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { useLoadUnloadPageContext } from '../../contexts/PageContext'

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

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={topoBlackWhite.url}
        options={topoBlackWhite.options}
      />
    </>
  )
}
