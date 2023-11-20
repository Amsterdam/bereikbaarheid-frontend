import { useEffect } from 'react'

import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer, useMapInstance } from '@amsterdam/react-maps'
import { HighlightedFeatureLayer } from 'shared/components/HighlightedFeatureLayer'
import { AddressMarker } from 'shared/components/MapLayers/AddressMarker'
import { oneWayArrows, topoBlackWhite } from 'shared/map/mapLayers'

import useLoadUnloadMapContext, { MapLayerId } from '../../contexts/MapContext'
import { useLoadUnloadPageContext } from '../../contexts/PageContext'

import BollardsLayer, { BOLLARDS_ZOOM_LEVEL } from './BollardsLayer'
import { LoadUnloadLoadUnloadSpacesLayer } from './LoadUnloadSpacesLayer'
import { LoadUnloadRoadSectionsLoadUnloadLayer } from './RoadSectionsLoadUnloadLayer'

export const LoadUnloadMapLayers = () => {
  const { detailFeature, updateActiveMapLayers } = useLoadUnloadMapContext()
  const { address } = useLoadUnloadPageContext()

  const mapInstance = useMapInstance()
  useEffect(() => {
    mapInstance.on('zoomend', event => {
      const zoomlvl = mapInstance.getZoom()
      if (zoomlvl >= BOLLARDS_ZOOM_LEVEL) {
        updateActiveMapLayers({ type: 'ON', layerId: MapLayerId.bollardsLayerId })
        // updateActiveMapLayers({ type: 'ON', layerId: MapLayerId.loadUnloadLayerId })
      } else {
        updateActiveMapLayers({ type: 'OFF', layerId: MapLayerId.bollardsLayerId })
        // updateActiveMapLayers({ type: 'OFF', layerId: MapLayerId.loadUnloadLayerId })
      }
    })
  }, [mapInstance, updateActiveMapLayers])

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

      <LoadUnloadLoadUnloadSpacesLayer />
      <LoadUnloadRoadSectionsLoadUnloadLayer />
      <BollardsLayer />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer baseLayer={topoBlackWhite.url} options={topoBlackWhite.options} />
    </>
  )
}
