import {
  GeoJSON,
  mapPanelConstants,
  MapPanelContext,
  usePanToLatLng,
} from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import { LatLngBounds, LatLngBoundsLiteral, PathOptions } from 'leaflet'
import type L from 'leaflet'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { useTheme } from 'styled-components'

import { getRoadObstructions } from '../../../api/bereikbaarheid/road-obstructions'

import { useRoadObstructionsMapContext } from '../contexts/MapContext'
import { roadObstructionsLayerId } from '../contexts/mapLayersReducer'
import { DetailFeature } from '../types/detailFeature'
import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'

interface LayerProps {
  detailFeature: DetailFeature | undefined
  setDetailFeature: Dispatch<SetStateAction<DetailFeature | undefined>>
  mapFilters: RoadObstructionMapFilters
}

const RoadObstructionsLayer = ({
  detailFeature,
  setDetailFeature,
  mapFilters,
}: LayerProps) => {
  const { drawerPosition, matchPositionWithSnapPoint, variant } =
    useContext(MapPanelContext)
  const { activeMapLayers } = useRoadObstructionsMapContext()
  const { pan } = usePanToLatLng()
  const theme = useTheme()
  const { data, error, isError, isLoading } = useQuery(
    [
      'roadObstructions',
      mapFilters.date,
      mapFilters.timeFrom,
      mapFilters.timeTo,
    ],
    ({ signal }) => getRoadObstructions(mapFilters, signal)
  )

  // Automatically pan the map to the center of the road section when
  // the drawer is positioned in the middle
  // @todo move this to HighlightedFeature component after WIOR feature is complete?
  useEffect(() => {
    if (
      matchPositionWithSnapPoint(mapPanelConstants.SnapPoint.Halfway) &&
      detailFeature &&
      detailFeature.type === 'roadSectionObstructions' &&
      (detailFeature.data.geometry.type === 'LineString' ||
        detailFeature.data.geometry.type === 'MultiLineString')
    ) {
      let roadSectionCenter = new LatLngBounds(
        detailFeature.data.geometry.coordinates as LatLngBoundsLiteral
      ).getCenter()

      // switch lat & lng, because the 'pan' return function switches these around
      // https://github.com/Amsterdam/amsterdam-react-maps/blob/master/packages/arm-core/src/utils/usePanToLatLng.ts#L44
      pan(
        { lat: roadSectionCenter.lng, lng: roadSectionCenter.lat },
        variant === 'drawer' ? 'vertical' : 'horizontal',
        15
      )
    }
  }, [detailFeature, drawerPosition, matchPositionWithSnapPoint, pan, variant])

  if (isError && error instanceof Error) console.error(error.message)

  if (isLoading || !data) return null

  if (!activeMapLayers[roadObstructionsLayerId]) return null

  return (
    <GeoJSON
      args={[data]}
      options={{
        onEachFeature: (feature, layer: L.GeoJSON) => {
          layer.on('click', () => {
            setDetailFeature({
              data: feature,
              type: 'roadSectionObstructions',
            })
          })
        },
        style: (feature): PathOptions => {
          let indirectlyUnreachable =
            feature?.properties.road_element_accessibility_code === 222

          return {
            color: indirectlyUnreachable
              ? theme.colors.supplement?.lightblue
              : theme.colors.primary?.main,
            weight: 5,
          }
        },
      }}
    />
  )
}

export default RoadObstructionsLayer
