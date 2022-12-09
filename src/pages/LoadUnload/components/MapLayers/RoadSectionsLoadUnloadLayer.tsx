import { GeoJSON } from '@amsterdam/arm-core'
import { DomEvent, PathOptions } from 'leaflet'
import type L from 'leaflet'
import { useQuery } from 'react-query'
import { useTheme } from 'styled-components'

import { getRoadSectionsLoadUnload } from '../../../../api/bereikbaarheid/road-sections/load-unload'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { roadSectionsLoadUnloadLayerId } from '../../contexts/mapLayersReducer'
import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'

export const LoadUnloadRoadSectionsLoadUnloadLayer = () => {
  const { activeMapLayers, setDetailFeature } = useLoadUnloadMapContext()
  const theme = useTheme()
  const roadSectionsLoadUnload = useQuery({
    queryKey: ['road-sections', 'load-unload'],
    queryFn: ({ signal }) => getRoadSectionsLoadUnload(signal),
    staleTime: 1000 * 60 * 15,
  })

  if (
    roadSectionsLoadUnload.isError &&
    roadSectionsLoadUnload.error instanceof Error
  ) {
    console.error(roadSectionsLoadUnload.error.message)
  }

  if (roadSectionsLoadUnload.isLoading || !roadSectionsLoadUnload.data) {
    return null
  }

  if (!activeMapLayers[roadSectionsLoadUnloadLayerId]) return null

  return (
    <GeoJSON
      args={[roadSectionsLoadUnload.data]}
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
        style: (): PathOptions => {
          return {
            color: theme.colors.primary?.main,
            weight: 5,
          }
        },
      }}
    />
  )
}
