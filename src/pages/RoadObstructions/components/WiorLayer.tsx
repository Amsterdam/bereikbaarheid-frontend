import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  GeoJSON,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  useMapInstance,
} from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import {
  DomEvent,
  GeoJSON as GeoJSONLayer,
  LatLngBounds,
  Map,
  PathOptions,
} from 'leaflet'
import { useTheme } from 'styled-components'

import { getWiorData } from '../../../api/wfs/wior'
import { useRoadObstructionsMapContext } from '../contexts/MapContext'
import { wiorLayerId } from '../contexts/mapLayersReducer'
import { DetailFeature } from '../types/detailFeature'
import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'

interface ZoomLevel {
  min?: number
  max?: number
}

const isVisible = (mapInstance: Map, zoomLevel: ZoomLevel) => {
  const { min, max } = zoomLevel
  const zoom = mapInstance.getZoom()
  return zoom <= (min || MIN_ZOOM_LEVEL) && zoom >= (max || MAX_ZOOM_LEVEL)
}

interface WiorLayerProps {
  setDetailFeature: Dispatch<SetStateAction<DetailFeature | undefined>>
  mapFilters: RoadObstructionMapFilters
}

const RoadObstructionsWiorLayer = ({
  setDetailFeature,
  mapFilters,
}: WiorLayerProps) => {
  const { activeMapLayers } = useRoadObstructionsMapContext()
  const mapInstance = useMapInstance()
  const [layerInstance, setLayerInstance] = useState<GeoJSONLayer>()
  const [bounds, setBounds] = useState<LatLngBounds>()
  const theme = useTheme()
  const zoomLevel: ZoomLevel = { max: 15 }

  // prettier-ignore
  // disable prettier to retain indented formatting of cqlFilter
  const cqlFilter =
    '<Filter><And>' +
      '<BBOX>' +
        '<gml:Envelope srsName="EPSG:4326">' +
          `<gml:lowerCorner>${bounds?.getWest()} ${bounds?.getSouth()}</gml:lowerCorner>` +
          `<gml:upperCorner>${bounds?.getEast()} ${bounds?.getNorth()}</gml:upperCorner>` +
        '</gml:Envelope>' +
      '</BBOX>' +
      '<PropertyIsNotEqualTo>' +
        '<ValueReference>hoofdstatus</ValueReference>' +
        '<Literal>Projectaanpak</Literal>' +
      '</PropertyIsNotEqualTo>' +
      '<PropertyIsLessThanOrEqualTo>' +
        '<ValueReference>datum_start_uitvoering</ValueReference>' +
        `<Literal>${mapFilters.date}</Literal>` +
      '</PropertyIsLessThanOrEqualTo>' +
      '<PropertyIsGreaterThanOrEqualTo>' +
        '<ValueReference>datum_einde_uitvoering</ValueReference>' +
        `<Literal>${mapFilters.date}</Literal>` +
      '</PropertyIsGreaterThanOrEqualTo>' +
    '</And></Filter>'

  const wiorData = useQuery({
    enabled: isVisible(mapInstance, zoomLevel) && activeMapLayers[wiorLayerId],
    queryFn: ({ signal }) => getWiorData(cqlFilter, signal),
    queryKey: ['wior', bounds, mapFilters.date],
  })

  useEffect(() => {
    function onMoveEnd() {
      setBounds(mapInstance.getBounds())
    }

    mapInstance.on('moveend', onMoveEnd)
    onMoveEnd() // initialize bounds on map load

    return () => {
      mapInstance.off('moveend', onMoveEnd)
    }
  }, [mapInstance])

  useEffect(() => {
    if (layerInstance) {
      layerInstance.bringToBack()
    }
  }, [layerInstance])

  if (wiorData.isError && wiorData.error instanceof Error)
    console.error(wiorData.error.message)

  if (wiorData.isLoading || !wiorData.data) return null

  if (!activeMapLayers[wiorLayerId]) return null

  return (
    <GeoJSON
      args={[wiorData.data]}
      setInstance={setLayerInstance}
      options={{
        onEachFeature: (feature, layer) => {
          layer.on('click', e => {
            DomEvent.stopPropagation(e)
            setDetailFeature({
              data: feature,
              type: 'wior',
            })
          })
        },
        style: (): PathOptions => {
          return {
            color: theme.colors.supplement?.orange,
          }
        },
      }}
    />
  )
}

export default RoadObstructionsWiorLayer
