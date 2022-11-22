import { useMapInstance } from '@amsterdam/arm-core'
import { NonTiledLayer } from '@amsterdam/arm-nontiled'
import { useEffect } from 'react'

import { loadUnloadSpaces } from '../../../../shared/map/mapLayers'

import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'
import { useLoadUnloadMapContext } from '../../contexts/MapContext'

export const LoadUnloadLoadUnloadSpacesLayer = () => {
  const mapInstance = useMapInstance()
  const { activeMapLayers, setDetailFeature } = useLoadUnloadMapContext()

  useEffect(() => {
    mapInstance.on('click', e => {
      if (mapInstance.getZoom() >= loadUnloadSpaces.options.minZoom!) {
        setDetailFeature({
          type: DetailFeatureActionType.SET_LOCATION,
          location: [e.latlng.lat, e.latlng.lng],
        })
      }
    })
  }, [mapInstance, setDetailFeature])

  if (!activeMapLayers[loadUnloadSpaces.id]) return null

  return (
    <NonTiledLayer
      url={loadUnloadSpaces.url}
      options={loadUnloadSpaces.options}
    ></NonTiledLayer>
  )
}
