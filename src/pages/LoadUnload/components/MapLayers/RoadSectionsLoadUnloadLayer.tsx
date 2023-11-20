import { useCallback, useEffect, useState } from 'react'

import { GeoJSON } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import { getRoadSectionsLoadUnload, RoadSectionLoadUnload } from 'api/bereikbaarheid/road-sections/load-unload'
import { DomEvent, PathOptions } from 'leaflet'
import type L from 'leaflet'
import { getDayOfTheWeekInDutch } from 'shared/utils/dateTime'
import { useTheme } from 'styled-components'

import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'
import useLoadUnloadMapContext, { MapLayerId } from '../../contexts/MapContext'
import { useLoadUnloadPageContext } from '../../contexts/PageContext'

export const LoadUnloadRoadSectionsLoadUnloadLayer = () => {
  const { activeMapLayers, setDetailFeature } = useLoadUnloadMapContext()
  const { dateTime } = useLoadUnloadPageContext()
  const requestedDayOfTheWeek = getDayOfTheWeekInDutch(dateTime.date)
  const theme = useTheme()
  const [roadSectionsLayer, setRoadSectionsLayer] = useState<L.GeoJSON | null>(null)

  const roadSectionsLoadUnload = useQuery({
    queryKey: ['road-sections', 'load-unload'],
    queryFn: ({ signal }) => getRoadSectionsLoadUnload(signal),
    staleTime: 1000 * 60 * 15,
  })

  const categorizeSection = useCallback(
    (feature: RoadSectionLoadUnload): PathOptions => {
      let sectionColor = theme.colors.primary?.main

      const fullyAvailableRegimes = feature?.properties.load_unload.filter(
        item =>
          item.start_time &&
          item.end_time &&
          item.days &&
          item.days.includes(requestedDayOfTheWeek) &&
          item.start_time <= `${dateTime.timeFrom}:00` &&
          item.end_time >= `${dateTime.timeTo}:00`
      )

      const partiallyAvailableRegimes = feature?.properties.load_unload.filter(
        item =>
          item.start_time &&
          item.end_time &&
          item.days &&
          item.days.includes(requestedDayOfTheWeek) &&
          ((item.start_time >= `${dateTime.timeFrom}:00` && item.start_time <= `${dateTime.timeTo}:00`) ||
            (item.end_time >= `${dateTime.timeFrom}:00` && item.end_time <= `${dateTime.timeTo}:00`))
      )

      if (fullyAvailableRegimes.length > 0) {
        sectionColor = theme.colors.supplement?.darkgreen
      } else if (partiallyAvailableRegimes.length > 0) {
        sectionColor = theme.colors.supplement?.lightblue
      }

      return {
        color: sectionColor,
        weight: 5,
      }
    },
    [dateTime, requestedDayOfTheWeek, theme.colors]
  )

  useEffect(() => {
    if (roadSectionsLayer) {
      roadSectionsLayer.setStyle(feature => categorizeSection(feature as RoadSectionLoadUnload))
    }
  }, [roadSectionsLayer, categorizeSection])

  if (roadSectionsLoadUnload.isError && roadSectionsLoadUnload.error instanceof Error) {
    console.error(roadSectionsLoadUnload.error.message)
  }

  if (roadSectionsLoadUnload.isLoading || !roadSectionsLoadUnload.data) {
    return null
  }

  if (!activeMapLayers[MapLayerId.roadSectionsLoadUnloadLayerId]) return null

  return (
    <GeoJSON
      args={[roadSectionsLoadUnload.data]}
      setInstance={setRoadSectionsLayer}
      options={{
        onEachFeature: (feature, layer: L.GeoJSON) => {
          layer.on('click', e => {
            DomEvent.stopPropagation(e)

            setDetailFeature({
              type: DetailFeatureActionType.SET_FEATURE,
              feature: {
                id: String(feature.properties.id),
                data: feature,
                type: 'roadSectionLoadUnload',
              },
            })
          })
        },
      }}
    />
  )
}
