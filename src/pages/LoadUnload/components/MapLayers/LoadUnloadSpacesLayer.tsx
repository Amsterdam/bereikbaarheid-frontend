import { useMapInstance } from '@amsterdam/arm-core'
import { NonTiledLayer } from '@amsterdam/arm-nontiled'
import { LeafletMouseEvent } from 'leaflet'
import { useCallback, useEffect } from 'react'

import { loadUnloadSpaces } from '../../../../shared/map/mapLayers'

import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'
import { useLoadUnloadMapContext } from '../../contexts/MapContext'

export const LoadUnloadLoadUnloadSpacesLayer = () => {
  const mapInstance = useMapInstance()
  const { activeMapLayers, setDetailFeature } = useLoadUnloadMapContext()
  const onClick = useCallback(
    (e: LeafletMouseEvent) => {
      if (mapInstance.getZoom() >= loadUnloadSpaces.options.minZoom!) {
        setDetailFeature({
          type: DetailFeatureActionType.SET_LOCATION,
          location: [e.latlng.lat, e.latlng.lng],
        })
      }
    },
    [mapInstance, setDetailFeature]
  )

  useEffect(() => {
    if (activeMapLayers[loadUnloadSpaces.id]) {
      mapInstance.on('click', onClick)
    } else {
      mapInstance.off('click', onClick)
    }
  }, [activeMapLayers, mapInstance, setDetailFeature, onClick])

  if (!activeMapLayers[loadUnloadSpaces.id]) return null

  return (
    <NonTiledLayer
      url={loadUnloadSpaces.url}
      options={loadUnloadSpaces.options}
    ></NonTiledLayer>
  )
}
